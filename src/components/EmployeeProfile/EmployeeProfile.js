import React, { useState, useEffect } from 'react';
import { 
  FaArrowLeft, FaUser, FaClipboardList, FaBook, FaMoneyCheckAlt, FaMoneyBillWave,
  FaPlane, FaFileAlt, FaSchool, FaCertificate, FaClock, FaBriefcase, FaFileInvoice
} from 'react-icons/fa';
import './EmployeeProfile.css';

const EmployeeProfile = ({ employee, onBack }) => {
  const [activeOuterTab, setActiveOuterTab] = useState('user-profile'); // outer tabs
  const [activeInnerTab, setActiveInnerTab] = useState('personal');     // inner tabs only for User Profile
  const [detailedEmployee, setDetailedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [loanData, setLoanData] = useState([
    {
      type: "Personal",
      loanId: "LN-001",
      date: "2024-10-10",
      maturity: "2026-10-10",
      loan: 50000,
      adjustment: 0,
      afterAdjustment: 50000,
      installment: 5000,
      recovered: 20000,
      balance: 30000,
      status: "Active",
      docStatus: "Complete",
      tempHold: "No"
    }
  ]);

  const [editingLoan, setEditingLoan] = useState(null);

  const openEditModal = (loan) => {
    setEditingLoan({ ...loan,
    status: loan.status || "active",
    tempStop: loan.tempStop || "inactive", });
  };

  const closeModal = () => {
    setEditingLoan(null);
  };

  const updateLoan = () => {
    setLoanData(prev =>
      prev.map(l => l.loanId === editingLoan.loanId ? editingLoan : l)
    );
    closeModal();
  };


  const tabs = [
    { key: 'user-profile', label: 'User Profile', icon: <FaUser /> },
    { key: 'scope', label: 'Scope of Work', icon: <FaClipboardList /> },
    { key: 'reference', label: 'Reference', icon: <FaBook /> },
    { key: 'salary', label: 'Salary', icon: <FaMoneyCheckAlt /> },
    { key: 'loan', label: 'Loan', icon: <FaMoneyCheckAlt /> },
    { key: 'leave', label: 'Leave', icon: <FaClock /> },
    { key: 'eobi', label: 'EOBI', icon: <FaFileInvoice /> },
    { key: 'eb-fund', label: 'E.B.Fund', icon: <FaMoneyBillWave /> },
    { key: 'training', label: 'Training', icon: <FaSchool /> },
    { key: 'certificate', label: 'Certificate', icon: <FaCertificate /> },
    { key: 'education', label: 'Education', icon: <FaSchool /> },
    { key: 'iso', label: 'ISO', icon: <FaFileAlt /> },
    { key: 'timeline', label: 'TimeLine', icon: <FaClock /> },
    { key: 'traveling', label: 'Traveling', icon: <FaPlane /> },
    { key: 'hr-file', label: 'HR File', icon: <FaFileAlt /> },
  ];

  useEffect(() => {
    const fetchDetailedProfile = async () => {
      if (!employee || !employee.empId) return;
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`http://localhost:5000/api/hr/profile-detailed/${employee.empId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch employee details');

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

  const empData = detailedEmployee || employee;

  const renderLeaveInfo = () => {
    


  }

  const renderLoanInfo = () => {
  // Dummy data; replace with actual employee loan data
  const loans = [
    {
      loanType: 'Personal',
      loanId: 'LN001',
      date: '2025-01-10',
      maturity: '2026-01-10',
      loan: 50000,
      adjustment: 5000,
      afterAdjustment: 45000,
      installment: 5000,
      recovered: 10000,
      balance: 35000,
      loanStatus: 'Active',
      docStatus: 'Verified',
      tempHold: 'No',
      option: 'Edit',
    },
    {
      loanType: 'Housing',
      loanId: 'LN002',
      date: '2024-03-15',
      maturity: '2027-03-15',
      loan: 200000,
      adjustment: 20000,
      afterAdjustment: 180000,
      installment: 15000,
      recovered: 60000,
      balance: 120000,
      loanStatus: 'Active',
      docStatus: 'Pending',
      tempHold: 'Yes',
      option: 'Edit',
    },
  ];

  return (
    <div className="tab-content">
      <h4>Employee Loans</h4>
      <div className="loan-table-wrapper">
        <table className="loan-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Loan ID</th>
              <th>Date</th>
              <th>Maturity</th>
              <th>Loan</th>
              <th>Adjustment</th>
              <th>After Adjustment</th>
              <th>Installment</th>
              <th>Recovered</th>
              <th>Balance</th>
              <th>Loan Status</th>
              <th>Doc Status</th>
              <th>Temp Hold</th>
              <th>Option</th>
            </tr>
          </thead>

          <tbody>
            {loanData.map((loan, index) => (
              <tr key={index}>
                <td>{loan.type}</td>
                <td>{loan.loanId}</td>
                <td>{loan.date}</td>
                <td>{loan.maturity}</td>
                <td>{loan.loan}</td>
                <td>{loan.adjustment}</td>
                <td>{loan.afterAdjustment}</td>
                <td>{loan.installment}</td>
                <td>{loan.recovered}</td>
                <td>{loan.balance}</td>
                <td><span className={`loan-status ${loan.status.toLowerCase()}`}>{loan.status}</span></td>
                <td><span className="doc-status">{loan.docStatus}</span></td>
                <td>{loan.tempHold}</td>

                {/* EDIT BUTTON */}
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => openEditModal(loan)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingLoan && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="modal-title">Edit Loan Entry</h3>

              <div className="modal-body">

                {/* Loan */}
                <label>Loan</label>
                <input
                  type="number"
                  value={editingLoan.loan || ""}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, loan: e.target.value })
                  }
                />

                {/* After Adjustment */}
                <label>After Adjustment</label>
                <input
                  type="number"
                  value={editingLoan.afterAdjustment}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, afterAdjustment: e.target.value })
                  }
                />

                {/* Maturity Date */}
                <label>Maturity Date</label>
                <input
                  type="date"
                  value={editingLoan.maturityDate}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, maturityDate: e.target.value })
                  }
                />

                {/* Approved Installment */}
                <label>Approved Installment</label>
                <input
                  type="number"
                  value={editingLoan.approvedInstallment}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, approvedInstallment: e.target.value })
                  }
                />

                {/* Recovered Amount */}
                <label>Recovered Amount</label>
                <input
                  type="number"
                  value={editingLoan.recovered}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, recovered: e.target.value })
                  }
                />

                {/* Status Radio Buttons */}
                <label>Status</label>
                <div className="radio-group">
                  <optionrad>
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={editingLoan.status === "active"}
                      onChange={() =>
                        setEditingLoan({ ...editingLoan, status: "active" })
                      }
                    />
                    Active
                  </optionrad>

                  <optionrad>
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={editingLoan.status === "inactive"}
                      onChange={() =>
                        setEditingLoan({ ...editingLoan, status: "inactive" })
                      }
                    />
                    Inactive
                  </optionrad>
                </div>

                {/* Temp Stop Radio Buttons */}
                <label>Temp Stop</label>
                <div className="radio-group">
                  <optionrad>
                    <input
                      type="radio"
                      name="tempStop"
                      value="active"
                      checked={editingLoan.tempStop === "active"}
                      onChange={() =>
                        setEditingLoan({ ...editingLoan, tempStop: "active" })
                      }
                    />
                    Active
                  </optionrad>

                  <optionrad>
                    <input
                      type="radio"
                      name="tempStop"
                      value="inactive"
                      checked={editingLoan.tempStop === "inactive"}
                      onChange={() =>
                        setEditingLoan({ ...editingLoan, tempStop: "inactive" })
                      }
                    />
                    Inactive
                  </optionrad>
                </div>

              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={updateLoan}>Update</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}


      </div>

    </div>
  );
};



  // ===== Render Functions =====
  const renderPersonalInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Basic Information</h4>
          <div className="detail-row"><label>Employee ID:</label><span>{empData.EmpID || employee.empId}</span></div>
          <div className="detail-row"><label>Full Name:</label><span>{empData.FirstName || employee.name}</span></div>
          <div className="detail-row"><label>Father Name:</label><span>{empData.FatherName || 'N/A'}</span></div>
          <div className="detail-row"><label>Date of Birth:</label><span>{empData.DOB || 'N/A'}</span></div>
          <div className="detail-row"><label>Birth Day:</label><span>{empData['Birth Day'] || 'N/A'}</span></div>
          <div className="detail-row"><label>Gender:</label><span>{empData.GenderID || 'N/A'}</span></div>
          <div className="detail-row"><label>Blood Group:</label><span>{empData.BloodGroupID || 'N/A'}</span></div>
          <div className="detail-row"><label>Martial Status:</label><span>{empData.MartialStatusID || 'N/A'}</span></div>
        </div>

        <div className="info-section">
          <h4>Contact Information</h4>
          <div className="detail-row"><label>Office Email:</label><span>{empData.OfficeEmail || employee.email}</span></div>
          <div className="detail-row"><label>Personal Email:</label><span>{empData.PersonalEmail || 'N/A'}</span></div>
          <div className="detail-row"><label>Office Mobile:</label><span>{empData.OfficeMobile || employee.mobile}</span></div>
          <div className="detail-row"><label>Home Phone:</label><span>{empData.HomePhone || 'N/A'}</span></div>
        </div>

        <div className="info-section">
          <h4>Address</h4>
          <div className="detail-row"><label>Street:</label><span>{empData.HAStreet || 'N/A'}</span></div>
          <div className="detail-row"><label>Street No:</label><span>{empData.HAStreetNo || 'N/A'}</span></div>
          <div className="detail-row"><label>Block:</label><span>{empData.HABlock || 'N/A'}</span></div>
          <div className="detail-row"><label>City:</label><span>{empData.HACity || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  );

  const renderEmploymentInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Service Information</h4>
          <div className="detail-row"><label>Served:</label><span>{empData.SinceDate || 'N/A'}</span></div>
          <div className="detail-row"><label>Joining Date:</label><span>{empData.JoiningDate || 'N/A'}</span></div>
          <div className="detail-row"><label>Confirmation Date:</label><span>{empData.ConfirmationDate || 'N/A'}</span></div>
          <div className="detail-row"><label>Resignation Date:</label><span>{empData.ResignDate || 'N/A'}</span></div>
          <div className="detail-row"><label>Contract Type:</label><span>{empData.EmployeeContractType || 'N/A'}</span></div>
        </div>

        <div className="info-section">
          <h4>Position Information</h4>
          <div className="detail-row"><label>Designation:</label><span>{empData.DesignationName || employee.designation}</span></div>
          <div className="detail-row"><label>Position:</label><span>{empData.PositionName || employee.grade}</span></div>
          <div className="detail-row"><label>Department:</label><span>{empData.DepartmentName || employee.department}</span></div>
          <div className="detail-row"><label>Location:</label><span>{empData.LocationName || employee.zone}</span></div>
          <div className="detail-row"><label>Branch:</label><span>{empData.BranchName || employee.branch}</span></div>
        </div>

        <div className="info-section">
          <h4>Reporting Structure</h4>
          <div className="detail-row"><label>Report To:</label><span>{empData.ReportToID || employee.reportTo}</span></div>
          <div className="detail-row"><label>Manager:</label><span>{empData.Manager || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  );

  const renderFinancialInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Salary Information</h4>
          <div className="detail-row"><label>Basic Salary:</label><span>{empData.BasicSalary || 'N/A'}</span></div>
          <div className="detail-row"><label>Gross Salary:</label><span>{empData.GrossSalary || 'N/A'}</span></div>
          <div className="detail-row"><label>Mobile Limit:</label><span>{empData.AllowedAdvance || 'N/A'}</span></div>
          <div className="detail-row"><label>Payment Mode:</label><span>{empData.PaymentMode || 'N/A'}</span></div>
        </div>

        <div className="info-section">
          <h4>Bank Information</h4>
          <div className="detail-row"><label>Bank Name:</label><span>{empData.BankName || 'N/A'}</span></div>
          <div className="detail-row"><label>Account Title:</label><span>{empData.AccountTitle || 'N/A'}</span></div>
          <div className="detail-row"><label>Account Type:</label><span>{empData.AccountType || 'N/A'}</span></div>
          <div className="detail-row"><label>Account Number:</label><span>{empData.AccountNo || 'N/A'}</span></div>
        </div>

        <div className="info-section">
          <h4>Additional Codes</h4>
          <div className="detail-row"><label>Payroll Name:</label><span>{empData.PayrollName || 'N/A'}</span></div>
          <div className="detail-row"><label>SBO Emp Code:</label><span>{empData.SBOEmpCode || 'N/A'}</span></div>
          <div className="detail-row"><label>User Code:</label><span>{empData.UserCode || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsInfo = () => (
    <div className="tab-content">
      <div className="info-grid">
        <div className="info-section">
          <h4>Identification Documents</h4>
          <div className="detail-row"><label>ID Number:</label><span>{empData.IDNo || 'N/A'}</span></div>
          <div className="detail-row"><label>Passport Number:</label><span>{empData.PassportNo || 'N/A'}</span></div>
          <div className="detail-row"><label>Passport Expiry:</label><span>{empData.PassportExpiryDate || 'N/A'}</span></div>
          <div className="detail-row"><label>Income Tax No:</label><span>{empData.IncomeTaxNo || 'N/A'}</span></div>
          <div className="detail-row"><label>EOBI Number:</label><span>{empData.EOBINo || 'N/A'}</span></div>
          <div className="detail-row"><label>Iqama Professional:</label><span>{empData.IqamaProfessional || 'N/A'}</span></div>
        </div>

        <div className="info-section">
          <h4>Additional Information</h4>
          <div className="detail-row"><label>Org Hierarchy ID:</label><span>{empData.OrgHierarchyId || 'N/A'}</span></div>
        </div>
      </div>
    </div>
  );

  // ===== Return JSX =====
  return (
    <div className="profile-container">
      {/* Header */}
      <div
        className="profile-header-top"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}
      >
        <h2 className="page-title">Employee Profile</h2>
        <button onClick={onBack} className="back-button">
          <FaArrowLeft className="back-icon" />
          Return
        </button>
      </div>

      {/* Outer Tabs */}
      <div className="profile-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-button ${activeOuterTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveOuterTab(tab.key)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeOuterTab === 'user-profile' && (
          <div className="profile-card">
            {/* Profile Header */}
            <div className="profile-header-info">
              <div className="profile-image-container">
                {empData.ImgPath ? (
                  <img src={empData.ImgPath} alt={`${empData.FirstName || employee.name}`} className="profile-picture" />
                ) : (
                  <div className="profile-avatar">
                    {(empData.FirstName || employee.name)
                      ? (empData.FirstName || employee.name).charAt(0).toUpperCase()
                      : '?'}
                  </div>
                )}
              </div>
              <div className="profile-basic-info">
                <div className="employee-header">
                  <h2>{empData.FirstName || employee.name}</h2>
                  <span
                    className={`status-badge ${
                      empData.Status ? empData.Status.toLowerCase() : employee.status?.toLowerCase()
                    }`}
                  >
                    {empData.Status || employee.status}
                  </span>
                </div>
                <p className="employee-designation">{empData.DesignationName || employee.designation}</p>
                <p className="employee-department">
                  {empData.DepartmentName || employee.department} • {empData.PayrollName || employee.division}
                </p>
                <p className="employee-since">SERVED [{empData.SinceDate || 'Year - Month - Days:'}]</p>
              </div>
            </div>

            {/* Inner Tabs */}
            <div className="eprofile-tabs">
              <button
                className={`etab-button ${activeInnerTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveInnerTab('personal')}
              >
                Personal Information
              </button>
              <button
                className={`etab-button ${activeInnerTab === 'employment' ? 'active' : ''}`}
                onClick={() => setActiveInnerTab('employment')}
              >
                Employment Details
              </button>
              <button
                className={`etab-button ${activeInnerTab === 'financial' ? 'active' : ''}`}
                onClick={() => setActiveInnerTab('financial')}
              >
                Financial Information
              </button>
              <button
                className={`etab-button ${activeInnerTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveInnerTab('documents')}
              >
                Documents & IDs
              </button>
            </div>

            {/* Inner Tab Content */}
            <div className="tab-container">
              {activeInnerTab === 'personal' && renderPersonalInfo()}
              {activeInnerTab === 'employment' && renderEmploymentInfo()}
              {activeInnerTab === 'financial' && renderFinancialInfo()}
              {activeInnerTab === 'documents' && renderDocumentsInfo()}
            </div>
          </div>
        )}
        
        {activeOuterTab === 'loan' && renderLoanInfo()}
        {activeOuterTab === 'scope' && renderLoanInfo()}
        {activeOuterTab === 'reference' && renderLoanInfo()}
        {activeOuterTab === 'salary' && renderLoanInfo()}
        {activeOuterTab === 'leave' && renderLeaveInfo()}
        {activeOuterTab === 'EOBI' && renderLoanInfo()}
        {activeOuterTab === 'EBFund' && renderLoanInfo()}
        {activeOuterTab === 'training' && renderLoanInfo()}
        {activeOuterTab === 'certificate' && renderLoanInfo()}
        {activeOuterTab === 'education' && renderLoanInfo()}
        {activeOuterTab === 'iso' && renderLoanInfo()}
        {activeOuterTab === 'timeline' && renderLoanInfo()}
        {activeOuterTab === 'travelling' && renderLoanInfo()}
        {activeOuterTab === 'hrfile' && renderLoanInfo()}
        
        
      </div>
    </div>
  );
};

export default EmployeeProfile;
