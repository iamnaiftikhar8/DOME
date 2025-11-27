import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './EmployeeProfile.css';

const EmployeeProfile = ({ employee, onBack }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [detailedEmployee, setDetailedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetailedProfile = async () => {
      if (!employee || !employee.empId) return;
      
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`http://localhost:5000/api/hr/profile-detailed/${employee.empId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }

        const data = await response.json();
        
        if (data.operation === 'success') {
          setDetailedEmployee(data.data);
        } else {
          throw new Error(data.message || 'Failed to load employee details');
        }
      } catch (err) {
        console.error('Error fetching detailed profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedProfile();
  }, [employee]);

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

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-message">Loading employee details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <h2>Error Loading Profile</h2>
          <p>{error}</p>
          <button onClick={onBack} className="back-btn">
            <FaArrowLeft className="back-icon" />
            Back to Employee Search
          </button>
        </div>
      </div>
    );
  }

  // Use detailedEmployee data when available, fallback to basic employee data
  const empData = detailedEmployee || employee;

  const renderPersonalInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Basic Information</h4>
          <div className="detail-row">
            <label>Employee ID:</label>
            <span>{empData.EmpID || employee.empId}</span>
          </div>
          <div className="detail-row">
            <label>Full Name:</label>
            <span>{empData.FirstName || employee.name}</span>
          </div>
          <div className="detail-row">
            <label>Father Name:</label>
            <span>{empData.FatherName || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Date of Birth:</label>
            <span>{empData.DOB || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Birth Day:</label>
            <span>{empData['Birth Day'] || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Gender:</label>
            <span>{empData.GenderID || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Blood Group:</label>
            <span>{empData.BloodGroupID || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Martial Status:</label>
            <span>{empData.MartialStatusID || 'N/A'}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Contact Information</h4>
          <div className="detail-row">
            <label>Office Email:</label>
            <span>{empData.OfficeEmail || employee.email}</span>
          </div>
          <div className="detail-row">
            <label>Personal Email:</label>
            <span>{empData.PersonalEmail || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Office Mobile:</label>
            <span>{empData.OfficeMobile || employee.mobile}</span>
          </div>
          <div className="detail-row">
            <label>Home Phone:</label>
            <span>{empData.HomePhone || 'N/A'}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Address</h4>
          <div className="detail-row">
            <label>Street:</label>
            <span>{empData.HAStreet || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Street No:</label>
            <span>{empData.HAStreetNo || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Block:</label>
            <span>{empData.HABlock || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>City:</label>
            <span>{empData.HACity || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmploymentInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Service Information</h4>
          <div className="detail-row">
            <label>Served:</label>
            <span>{empData.SinceDate || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Joining Date:</label>
            <span>{empData.JoiningDate || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Confirmation Date:</label>
            <span>{empData.ConfirmationDate || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Resignation Date:</label>
            <span>{empData.ResignDate || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Contract Type:</label>
            <span>{empData.EmployeeContractType || 'N/A'}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Position Information</h4>
          <div className="detail-row">
            <label>Designation:</label>
            <span>{empData.DesignationName || employee.designation}</span>
          </div>
          <div className="detail-row">
            <label>Position:</label>
            <span>{empData.PositionName || employee.grade}</span>
          </div>
          <div className="detail-row">
            <label>Department:</label>
            <span>{empData.DepartmentName || employee.department}</span>
          </div>
          <div className="detail-row">
            <label>Location:</label>
            <span>{empData.LocationName || employee.zone}</span>
          </div>
          <div className="detail-row">
            <label>Branch:</label>
            <span>{empData.BranchName || employee.branch}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Reporting Structure</h4>
          <div className="detail-row">
            <label>Report To:</label>
            <span>{empData.ReportToID || employee.reportTo}</span>
          </div>
          <div className="detail-row">
            <label>Manager:</label>
            <span>{empData.Manager || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Salary Information</h4>
          <div className="detail-row">
            <label>Basic Salary:</label>
            <span>{empData.BasicSalary || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Gross Salary:</label>
            <span>{empData.GrossSalary || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Fixed Salary:</label>
            <span>{empData.FixedSalary || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Allowed Advance:</label>
            <span>{empData.AllowedAdvance || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Payment Mode:</label>
            <span>{empData.PaymentMode || 'N/A'}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Bank Information</h4>
          <div className="detail-row">
            <label>Bank Name:</label>
            <span>{empData.BankName || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Account Title:</label>
            <span>{empData.AccountTitle || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Account Type:</label>
            <span>{empData.AccountType || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Account Number:</label>
            <span>{empData.AccountNo || 'N/A'}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Additional Codes</h4>
          <div className="detail-row">
            <label>Payroll Name:</label>
            <span>{empData.PayrollName || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>SBO Emp Code:</label>
            <span>{empData.SBOEmpCode || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>User Code:</label>
            <span>{empData.UserCode || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Identification Documents</h4>
          <div className="detail-row">
            <label>ID Number:</label>
            <span>{empData.IDNo || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Passport Number:</label>
            <span>{empData.PassportNo || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Passport Expiry:</label>
            <span>{empData.PassportExpiryDate || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Income Tax No:</label>
            <span>{empData.IncomeTaxNo || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>EOBI Number:</label>
            <span>{empData.EOBINo || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <label>Iqama Professional:</label>
            <span>{empData.IqamaProfessional || 'N/A'}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Additional Information</h4>
          <div className="detail-row">
            <label>Org Hierarchy ID:</label>
            <span>{empData.OrgHierarchyId || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button onClick={onBack} className="back-btn">
          <FaArrowLeft className="back-icon" />
          Back to Search
        </button>
        <h1 className="profile-title">EMPLOYEE PROFILE [{empData.FirstName || employee.name}]</h1>
        <div className="profile-status">
          <span className={`status-badge ${empData.Status ? empData.Status.toLowerCase() : employee.status?.toLowerCase()}`}>
            {empData.Status || employee.status}
          </span>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          {/* Header Section */}
          <div className="profile-header-info">
            <div className="profile-image-container">
              {empData.ImgPath ? (
                <img 
                  src={empData.ImgPath} 
                  alt={`${empData.FirstName || employee.name}`}
                  className="profile-picture"
                />
              ) : (
                <div className="profile-avatar">
                  {(empData.FirstName || employee.name) ? (empData.FirstName || employee.name).charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </div>
            <div className="profile-basic-info">
              <h2>{empData.FirstName || employee.name}</h2>
              <p className="employee-designation">{empData.DesignationName || employee.designation}</p>
              <p className="employee-department">{empData.DepartmentName || employee.department} • {empData.PayrollName || employee.division}</p>
              <p className="employee-since">SERVED [{empData.SinceDate || 'Year - Month - Days: '}]</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="profile-tabs">
            <button 
              className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal Information
            </button>
            <button 
              className={`tab-button ${activeTab === 'employment' ? 'active' : ''}`}
              onClick={() => setActiveTab('employment')}
            >
              Employment Details
            </button>
            <button 
              className={`tab-button ${activeTab === 'financial' ? 'active' : ''}`}
              onClick={() => setActiveTab('financial')}
            >
              Financial Information
            </button>
            <button 
              className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents & IDs
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-container">
            {activeTab === 'personal' && renderPersonalInfo()}
            {activeTab === 'employment' && renderEmploymentInfo()}
            {activeTab === 'financial' && renderFinancialInfo()}
            {activeTab === 'documents' && renderDocumentsInfo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;