import React, { useState, useEffect } from 'react';
import { FaSearch, FaUsers } from 'react-icons/fa';
import './HR.css';

const EmployeeList = ({ onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError('');
        
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found. Please login again.');
        }

        const response = await fetch('http://localhost:5000/api/hr/employees', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please login again.');
          }
          throw new Error(`Failed to fetch employees: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.operation === 'success' && Array.isArray(data.data)) {
          setEmployees(data.data);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError(err.message);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Map API field names to component field names
  const mappedEmployees = employees.map(employee => ({
    empId: employee.EmpID,
    status: employee.Status,
    name: employee.Name,
    reportTo: employee.ReportTo,
    division: employee.Division,
    department: employee.Department,
    designation: employee.Designation,
    grade: employee.Grade,
    zone: employee.Zone,
    branch: employee.Branch,
    mobile: employee.Mobile,
    email: employee['E-Mail']
  }));

  const filteredEmployees = mappedEmployees.filter(employee => 
    employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate active users
  const activeUsers = mappedEmployees.filter(emp => emp.status === 'Active').length;

  const totalEntries = filteredEmployees.length;
  const entriesToShow = entriesPerPage ? parseInt(entriesPerPage) : totalEntries;
  const totalPages = Math.ceil(totalEntries / entriesToShow);
  
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleSearchClick = (employee) => {
    onViewProfile(employee);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <div className="list-stats">
          <div className="stat-item">
            <FaUsers className="stat-icon" />
            <span>Total Employees: {mappedEmployees.length}</span>
          </div>
          <div className="stat-item">
            <span className="active-indicator">Active: {activeUsers}</span>
          </div>
        </div>
      </div>

      <div className="search-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search employees by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(e.target.value);
              setCurrentPage(1);
            }}
            className="entries-filter"
          >
            <option value="">Show all</option>
            <option value="10">10 entries</option>
            <option value="25">25 entries</option>
            <option value="50">50 entries</option>
            <option value="100">100 entries</option>
          </select>
        </div>
      </div>

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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={employee.empId || index}>
                  <td>{employee.empId || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${employee.status ? employee.status.toLowerCase() : 'unknown'}`}>
                      {employee.status || 'Unknown'}
                    </span>
                  </td>
                  <td>{employee.name || 'N/A'}</td>
                  <td>{employee.reportTo || 'N/A'}</td>
                  <td>{employee.division || 'N/A'}</td>
                  <td>{employee.department || 'N/A'}</td>
                  <td>{employee.designation || 'N/A'}</td>
                  <td>{employee.grade || 'N/A'}</td>
                  <td>{employee.zone || 'N/A'}</td>
                  <td>{employee.branch || 'N/A'}</td>
                  <td>{employee.mobile || 'N/A'}</td>
                  <td>{employee.email || 'N/A'}</td>
                  <td className="action-cell">
                    <button 
                      className="view-profile-btn"
                      onClick={() => handleSearchClick(employee)}
                      title="View Profile"
                    >
                      <FaSearch />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data-row">
                <td colSpan="13">
                  {mappedEmployees.length === 0 ? 'No employees found' : 'No employees match your search'}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            <span className="pagination-info">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;