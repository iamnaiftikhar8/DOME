import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './EmployeeProfile.css';

const EmployeeProfile = ({ employee, onBack }) => {
  if (!employee) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Employee Not Found</h2>
          <button onClick={onBack} className="back-btn">
            <FaArrowLeft className="back-icon" />
            Back to Employee Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={onBack} className="back-btn">
          <FaArrowLeft className="back-icon" />
        </button>
        <h1 className="profile-title">Employee Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header-info">
            <div className="profile-image-container">
              {employee.profilePicture ? (
                <img 
                  src={employee.profilePicture} 
                  alt={`${employee.name}`}
                  className="profile-picture"
                  onError={(e) => {
                    // If image fails to load, show avatar fallback
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="profile-avatar" style={{ display: employee.profilePicture ? 'none' : 'flex' }}>
                {employee.name ? employee.name.charAt(0).toUpperCase() : '?'}
              </div>
            </div>
            <div className="profile-basic-info">
              <h2>{employee.name}</h2>
              <p className="employee-designation">{employee.designation}</p>
              <p className="employee-department">{employee.department} • {employee.division}</p>
            </div>
            <div className="profile-status">
              <span className={`status-badge ${employee.status ? employee.status.toLowerCase() : ''}`}>
                {employee.status}
              </span>
            </div>
          </div>

          <div className="profile-details">
            <div className="details-section">
              <h3>Personal Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Employee ID</label>
                  <span>{employee.empId}</span>
                </div>
                <div className="detail-item">
                  <label>Name</label>
                  <span>{employee.name}</span>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <span>{employee.email}</span>
                </div>
                <div className="detail-item">
                  <label>Mobile</label>
                  <span>{employee.mobile}</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Work Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Report To</label>
                  <span>{employee.reportTo}</span>
                </div>
                <div className="detail-item">
                  <label>Department</label>
                  <span>{employee.department}</span>
                </div>
                <div className="detail-item">
                  <label>Division</label>
                  <span>{employee.division}</span>
                </div>
                <div className="detail-item">
                  <label>Designation</label>
                  <span>{employee.designation}</span>
                </div>
                <div className="detail-item">
                  <label>Grade</label>
                  <span>{employee.grade}</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h3>Location Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Zone</label>
                  <span>{employee.zone}</span>
                </div>
                <div className="detail-item">
                  <label>Branch</label>
                  <span>{employee.branch}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;