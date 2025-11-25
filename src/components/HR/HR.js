import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './HR.css';

const HR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const employees = [];

  // Filter employees by search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalEntries = filteredEmployees.length;
  const entriesToShow = entriesPerPage ? parseInt(entriesPerPage) : totalEntries;
  const totalPages = Math.ceil(totalEntries / entriesToShow);
  
  // Get current page data
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleSearchClick = (employee) => {
    // Add your search/view logic here
    console.log('View details for:', employee.name);
    alert(`Viewing details for: ${employee.name}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="hr-container">
      {/* Header Section */}
      <div className="hr-header">
        <div className="header-main">
          <h1 className="main-title">Employee Search</h1>
          <div className="header-controls">
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
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
              setCurrentPage(1); // Reset to first page when changing entries per page
            }}
            className="entries-filter"
          >
            <option value="">Show all</option>
            <option value="10">10 entries</option>
            <option value="20">20 entries</option>
            <option value="30">30 entries</option>
            <option value="50">50 entries</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
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
                <tr key={index}>
                  <td className="text-black">{employee.empId}</td>
                  <td>
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="text-black">{employee.name}</td>
                  <td className="text-black">{employee.reportTo}</td>
                  <td className="text-black">{employee.division}</td>
                  <td className="text-black">{employee.department}</td>
                  <td className="text-black">{employee.designation}</td>
                  <td className="text-black">{employee.grade}</td>
                  <td className="text-black">{employee.zone}</td>
                  <td className="text-black">{employee.branch}</td>
                  <td className="text-black">{employee.mobile}</td>
                  <td className="text-black">{employee.email}</td>
                  <td className="display-cell">
                    <button 
                      className="search-icon-btn"
                      onClick={() => handleSearchClick(employee)}
                      title="View Details"
                    >
                      <FaSearch />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-data-row">
                <td colSpan="13" className="text-black">No employee data found</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            
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