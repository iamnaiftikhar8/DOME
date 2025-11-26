import React, { useState, useEffect } from 'react';
import { FaSearch, FaUsers } from 'react-icons/fa';
import './HR.css';

const HR = ({ onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
   
  // ============ API INTEGRATION ============
  const [employees, setEmployees] = useState([]); 

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // API endpoint
        const response = await fetch('http://localhost:3001/employees', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();
        
        // Handle different API response structures
        if (Array.isArray(data)) {
          setEmployees(data);
        } else if (data.data && Array.isArray(data.data)) {
          setEmployees(data.data);
        } else if (data.employees && Array.isArray(data.employees)) {
          setEmployees(data.employees);
        } else {
          setEmployees([]); // Fallback to empty array
        }
      } catch (err) {
        console.error('Error fetching employees:', err);
        setEmployees([]); // Fallback to empty array on error
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array = run once on mount

  const filteredEmployees = employees.filter(employee => 
    employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate active users
  const activeUsers = employees.filter(emp => emp.status === 'Active').length;

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

  return (
    <div className="hr-container">
      <div className="hr-header">
        <div className="header-main">
          <h1 className="main-title">Employee Search</h1>
        </div>
        <div className="user-stats">
          <div className="active-users">
            <div className="active-header">
              <FaUsers className="users-icon" />
              <span className="active-label">Active Users</span>
            </div>
            <span className="active-count">{activeUsers}</span>
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
            <option value="5">5 entries</option>
            <option value="10">10 entries</option>
            <option value="20">20 entries</option>
            <option value="50">50 entries</option>
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
              <th>Display</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={employee.empId || index}>
                  <td className="text-black">{employee.empId || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${employee.status ? employee.status.toLowerCase() : 'unknown'}`}>
                      {employee.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="text-black">{employee.name || 'N/A'}</td>
                  <td className="text-black">{employee.reportTo || 'N/A'}</td>
                  <td className="text-black">{employee.division || 'N/A'}</td>
                  <td className="text-black">{employee.department || 'N/A'}</td>
                  <td className="text-black">{employee.designation || 'N/A'}</td>
                  <td className="text-black">{employee.grade || 'N/A'}</td>
                  <td className="text-black">{employee.zone || 'N/A'}</td>
                  <td className="text-black">{employee.branch || 'N/A'}</td>
                  <td className="text-black">{employee.mobile || 'N/A'}</td>
                  <td className="text-black">{employee.email || 'N/A'}</td>
                  <td className="display-cell">
                    <button 
                      className="search-icon-btn"
                      onClick={() => handleSearchClick(employee)}
                      title="View Profile"
                    >
                      <FaSearch />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data-row">
                <td colSpan="13" className="text-black">
                  {employees.length === 0 ? 'No employees found' : 'No employees match your search'}
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

export default HR;