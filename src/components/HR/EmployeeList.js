import React, { useState, useEffect, useMemo } from 'react';
import { FaSearch, FaUsers } from 'react-icons/fa';
import './HR.css';

const EmployeeList = ({ onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'empId', direction: 'desc' });
  const [statusFilter, setStatusFilter] = useState('active'); // all / active / inactive

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found. Please login again.');

        const response = await fetch('http://localhost:5000/api/hr/employees', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`Failed to fetch employees: ${response.status}`);
        const data = await response.json();

        if (data.operation === 'success' && Array.isArray(data.data)) setEmployees(data.data);
        else throw new Error('Unexpected API response format');
      } catch (err) {
        setError(err.message);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Map API fields
  const mappedEmployees = useMemo(
    () =>
      employees.map(emp => ({
        empId: emp.EmpID,
        status: emp.Status,
        name: emp.Name,
        reportTo: emp.ReportTo,
        division: emp.Division,
        department: emp.Department,
        designation: emp.Designation,
        grade: emp.Grade,
        zone: emp.Zone,
        branch: emp.Branch,
        mobile: emp.Mobile,
        email: emp['E-Mail'],
      })),
    [employees]
  );

  // Filter by search and status
  const filteredEmployees = useMemo(() => {
    return mappedEmployees.filter(emp => {
      const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && emp.status?.toLowerCase() === 'active') ||
        (statusFilter === 'inactive' && emp.status?.toLowerCase() === 'inactive');
      return matchesSearch && matchesStatus;
    });
  }, [mappedEmployees, searchTerm, statusFilter]);

  // Sort filtered employees
  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      const valA = a[sortConfig.key] || '';
      const valB = b[sortConfig.key] || '';
      if (typeof valA === 'string') return valA.localeCompare(valB);
      return valA - valB;
    });
    if (sortConfig.direction === 'desc') sorted.reverse();
    return sorted;
  }, [filteredEmployees, sortConfig]);

  // Pagination
  const totalEntries = sortedEmployees.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEmployees = sortedEmployees.slice(startIndex, startIndex + entriesPerPage);

  const handleViewProfile = employee => onViewProfile(employee);
  const handlePageChange = page => setCurrentPage(page);

  if (loading) return <div className="loading-message">Loading employees...</div>;
  if (error) return <div className="profile-error">Error: {error}</div>;

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <div className="list-stats">
          <div className="stat-item">
            <FaUsers className="stat-icon" />
            <span>Total Employees: {mappedEmployees.length}</span>
          </div>
          <div className="stat-item">
            <span className="active-indicator">
              Active: {mappedEmployees.filter(emp => emp.status === 'Active').length}
            </span>
          </div>
        </div>
      </div>

      
      {/* Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <select
          value={entriesPerPage}
          onChange={e => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="entries-filter"
        >
          <option value={10}>10 entries</option>
          <option value={25}>25 entries</option>
          <option value={50}>50 entries</option>
          <option value={100}>100 entries</option>
        </select>

        <select
          value={sortConfig.key}
          onChange={e => setSortConfig(prev => ({ ...prev, key: e.target.value }))}
          className="entries-filter"
        >
          <option value="empId">Sort by EmpID</option>
          <option value="name">Sort by Name</option>
        </select>

        <select
          value={sortConfig.direction}
          onChange={e => setSortConfig(prev => ({ ...prev, direction: e.target.value }))}
          className="entries-filter"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="entries-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Employee Table */}
      <div className="table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>EmpID</th>
              <th>Status</th>
              <th>Name</th>
              <th>Report To</th>
              <th>Division</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Grade</th>
              <th>Zone</th>
              <th>Branch</th>
              <th>Mobile</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((emp, index) => (
                <tr
                  key={emp.empId || index}
                  onClick={() => handleViewProfile(emp)}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f0f8ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td>{emp.empId || 'N/A'}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        emp.status ? emp.status.toLowerCase() : 'unknown'
                      }`}
                    >
                      {emp.status || 'Unknown'}
                    </span>
                  </td>
                  <td>{emp.name || 'N/A'}</td>
                  <td>{emp.reportTo || 'N/A'}</td>
                  <td>{emp.division || 'N/A'}</td>
                  <td>{emp.department || 'N/A'}</td>
                  <td>{emp.designation || 'N/A'}</td>
                  <td>{emp.grade || 'N/A'}</td>
                  <td>{emp.zone || 'N/A'}</td>
                  <td>{emp.branch || 'N/A'}</td>
                  <td>{emp.mobile || 'N/A'}</td>
                  <td>{emp.email || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr className="no-data-row">
                <td colSpan={12}>No employees found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
         {totalPages > 1 && ( 
        <div className="pagination-controls"> 
        <button onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="pagination-btn" > Previous 
        </button> 
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="pagination-btn" > Next </button> 
        </div> )} 
        </div> 
      </div>
  );
};

export default EmployeeList;
