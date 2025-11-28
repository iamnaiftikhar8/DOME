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

  const [loanData, setLoanData] = useState([null]);

  const [editingLoan, setEditingLoan] = useState(null);

  const openEditModal = (loan) => {
  setEditingLoan({ 
    ...loan,
    Status: loan.Status || "Yes", // Default to "Yes" (Active)
    Doc: loan.Doc || "Pending",
    Stage: loan.Stage || "Applied"
  });
};

  const closeModal = () => {
    setEditingLoan(null);
  };

  const updateLoan = () => {
  // Calculate new balance
  const updatedLoan = {
    ...editingLoan,
    Balance: (editingLoan.Approved || 0) - (editingLoan.Recovered || 0)
  };

  setLoanData(prev =>
    prev.map(l => 
      l.ID === updatedLoan.ID || 
      (l.LoanType === updatedLoan.LoanType && l.EmpID === updatedLoan.EmpID) 
        ? updatedLoan 
        : l
    )
  );
  closeModal();
  
  // Show success message
  alert('Loan details updated successfully!');
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

  useEffect(() => {
  const fetchEmployeeLoans = async () => {
    if (!employee || !employee.empId) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      // CORRECTED: Using port 3000 and correct endpoint
      const response = await fetch(`http://localhost:5000/api/hr/employee-loans/${employee.empId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch employee loans');

      const data = await response.json();
      console.log('Loan API Response:', data); // Debug log
      
      if (data.operation === 'success') {
        setLoanData(data.data || []); // Update loanData state with real data
      } else {
        throw new Error(data.message || 'Failed to load employee loans');
      }
    } catch (err) {
      console.error('Error fetching employee loans:', err);
      setLoanData([]); 
    }
  };

  fetchEmployeeLoans();
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
  if (!loanData || loanData.length === 0) {
    return (
      <div className="tab-content">
        <h4>Employee Loans</h4>
        <p>No loan data available for this employee.</p>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <h4>Employee Loans</h4>
      <div className="loan-table-wrapper">
        <table className="loan-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Emp ID</th>
              <th>Required Date</th>
              <th>Maturity Date</th>
              <th>Requested Amount</th>
              <th>Approved Amount</th>
              <th>Installment</th>
              <th>Recovered Amount</th>
              <th>Balance</th>
              <th>Document Status</th>
              <th>Approval Stage</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>
            {loanData.map((loan, index) => (
              <tr key={index}>
                <td>{loan.LoanType || 'N/A'}</td>
                <td>{loan.EmpID || 'N/A'}</td>
                <td>{loan.Required || 'N/A'}</td>
                <td>{loan.Maturity || 'N/A'}</td>
                <td>{loan.Request ? `${loan.Request.toLocaleString()}` : '0'}</td>
                <td>{loan.Approved ? `${loan.Approved.toLocaleString()}` : '0'}</td>
                <td>{loan.Installment ? `${loan.Installment.toLocaleString()}` : '0'}</td>
                <td>{loan.Recovered ? `${loan.Recovered.toLocaleString()}` : '0'}</td>
                <td className={loan.Balance > 0 ? 'positive-balance' : 'zero-balance'}>
                  {loan.Balance ? `${loan.Balance.toLocaleString()}` : '0'}
                </td>
                <td>
                  <span className={`doc-status ${loan.Doc ? loan.Doc.toLowerCase() : ''}`}>
                    {loan.Doc || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className={`stage-status ${loan.Stage ? loan.Stage.toLowerCase() : ''}`}>
                    {loan.Stage || 'N/A'}
                  </span>
                </td>
                <td>
                  <span className={`loan-status ${loan.Status === 'Yes' ? 'active' : 'inactive'}`}>
                    {loan.Status === 'Yes' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(loan)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Modal */}
        {editingLoan && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3 className="modal-title">Edit Loan Details</h3>

              <div className="modal-body">
                {/* Loan Type (Read-only) */}
                <label>Loan Type</label>
                <input
                  type="text"
                  value={editingLoan.LoanType || ''}
                  disabled
                  className="readonly-input"
                />

                {/* Approved Amount */}
                <label>Approved Amount (PKR)</label>
                <input
                  type="number"
                  value={editingLoan.Approved || 0}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, Approved: parseInt(e.target.value) || 0 })
                  }
                />

                {/* Installment Amount */}
                <label>Installment Amount (PKR)</label>
                <input
                  type="number"
                  value={editingLoan.Installment || 0}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, Installment: parseInt(e.target.value) || 0 })
                  }
                />

                {/* Recovered Amount */}
                <label>Recovered Amount (PKR)</label>
                <input
                  type="number"
                  value={editingLoan.Recovered || 0}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, Recovered: parseInt(e.target.value) || 0 })
                  }
                />

                {/* Maturity Date */}
                <label>Maturity Date</label>
                <input
                  type="date"
                  value={editingLoan.Maturity ? editingLoan.Maturity.split('-').reverse().join('-') : ''}
                  onChange={(e) =>
                    setEditingLoan({ 
                      ...editingLoan, 
                      Maturity: e.target.value.split('-').reverse().join('-') 
                    })
                  }
                />

                {/* Status */}
                <label>Loan Status</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="Yes"
                      checked={editingLoan.Status === "Yes"}
                      onChange={() =>
                        setEditingLoan({ ...editingLoan, Status: "Yes" })
                      }
                    />
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="No"
                      checked={editingLoan.Status === "No"}
                      onChange={() =>
                        setEditingLoan({ ...editingLoan, Status: "No" })
                      }
                    />
                    Inactive
                  </label>
                </div>

                {/* Document Status */}
                <label>Document Status</label>
                <select
                  value={editingLoan.Doc || ''}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, Doc: e.target.value })
                  }
                >
                  <option value="Complete">Complete</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Rejected">Rejected</option>
                </select>

                {/* Approval Stage */}
                <label>Approval Stage</label>
                <select
                  value={editingLoan.Stage || ''}
                  onChange={(e) =>
                    setEditingLoan({ ...editingLoan, Stage: e.target.value })
                  }
                >
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Disbursed">Disbursed</option>
                  <option value="Rejected">Rejected</option>
                </select>

                {/* Calculated Balance (Read-only) */}
                <label>Calculated Balance (PKR)</label>
                <input
                  type="text"
                  value={`PKR${((editingLoan.Approved || 0) - (editingLoan.Recovered || 0)).toLocaleString()}`}
                  disabled
                  className="readonly-input"
                />
              </div>

              <div className="modal-actions">
                <button className="save-btn" onClick={updateLoan}>Update Loan</button>
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
