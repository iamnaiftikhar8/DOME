import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPlus, FaHistory, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import './LeavesManagement.css';

const LeavesManagement = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [leaveSummary, setLeaveSummary] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Fetch leave data
  useEffect(() => {
    if (currentUser && currentUser.userId) {
      fetchLeaveSummary();
      fetchLeaveTypes();
      fetchLeaveApplications();
    }
  }, [currentUser]);

  const fetchLeaveSummary = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/hr/employee/${currentUser.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.operation === 'success') {
        setLeaveSummary(data.data);
      }
    } catch (err) {
      setError('Failed to load leave summary');
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hr/types', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.operation === 'success') {
        setLeaveTypes(data.data);
      }
    } catch (err) {
      console.error('Failed to load leave types');
    }
  };

  const fetchLeaveApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/hr/applications/${currentUser.userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.operation === 'success') {
        setLeaveApplications(data.data);
      }
    } catch (err) {
      console.error('Failed to load leave applications');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/hr/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          empId: currentUser.userId,
          ...leaveForm
        })
      });

      const data = await response.json();
      if (data.operation === 'success') {
        alert('Leave application submitted successfully!');
        setLeaveForm({ leaveType: '', startDate: '', endDate: '', reason: '' });
        fetchLeaveApplications(); // Refresh applications list
        setActiveTab('history');
      } else {
        setError(data.message || 'Failed to submit leave application');
      }
    } catch (err) {
      setError('Failed to submit leave application');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalDays = () => {
    if (leaveForm.startDate && leaveForm.endDate) {
      const start = new Date(leaveForm.startDate);
      const end = new Date(leaveForm.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const renderLeaveSummary = () => (
    <div className="leave-summary">
      <h3>Leave Balance Summary</h3>
      {leaveSummary.length > 0 ? (
        <div className="summary-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Leave Type</th>
                <th>Total</th>
                <th>Availed</th>
                <th>Balance</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
            </thead>
            <tbody>
              {leaveSummary.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.Year}</td>
                  <td>{leave.LeaveName}</td>
                  <td>{leave.Total}</td>
                  <td>{leave.Availed}</td>
                  <td className={leave.Balance < 0 ? 'negative-balance' : 'positive-balance'}>
                    {leave.Balance}
                  </td>
                  <td>{leave.JAN}</td>
                  <td>{leave.FEB}</td>
                  <td>{leave.MAR}</td>
                  <td>{leave.APR}</td>
                  <td>{leave.MAY}</td>
                  <td>{leave.JUN}</td>
                  <td>{leave.JUL}</td>
                  <td>{leave.AUG}</td>
                  <td>{leave.SEP}</td>
                  <td>{leave.OCT}</td>
                  <td>{leave.NOV}</td>
                  <td>{leave.DEC}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No leave data available</p>
      )}
    </div>
  );

  const renderApplyLeave = () => (
    <div className="apply-leave">
      <h3>Apply for Leave</h3>
      <form onSubmit={handleFormSubmit} className="leave-form">
        <div className="form-group">
          <label>Leave Type *</label>
          <select
            name="leaveType"
            value={leaveForm.leaveType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Leave Type</option>
            {leaveTypes.map(type => (
              <option key={type.LeaveId} value={type.LeaveName}>
                {type.LeaveName} ({type.TotalLeaves} days)
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={leaveForm.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={leaveForm.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Total Days</label>
            <input
              type="text"
              value={calculateTotalDays()}
              disabled
              className="total-days"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea
            name="reason"
            value={leaveForm.reason}
            onChange={handleInputChange}
            rows="4"
            placeholder="Enter reason for leave..."
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Submit Leave Application'}
        </button>
      </form>
    </div>
  );

  const renderLeaveHistory = () => (
    <div className="leave-history">
      <h3>Leave Application History</h3>
      {leaveApplications.length > 0 ? (
        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map(app => (
                <tr key={app.ApplicationID}>
                  <td>{app.ApplicationID}</td>
                  <td>{app.LeaveType}</td>
                  <td>{new Date(app.StartDate).toLocaleDateString()}</td>
                  <td>{new Date(app.EndDate).toLocaleDateString()}</td>
                  <td>{app.TotalDays}</td>
                  <td>{app.Reason}</td>
                  <td>
                    <span className={`status-badge status-${app.Status.toLowerCase()}`}>
                      {app.Status}
                    </span>
                  </td>
                  <td>{new Date(app.AppliedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No leave applications found</p>
      )}
    </div>
  );

  return (
    <div className="leaves-management">
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <div className="leaves-tabs">
        <button
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <FaChartBar className="tab-icon" />
          Leave Summary
        </button>
        <button
          className={`tab-btn ${activeTab === 'apply' ? 'active' : ''}`}
          onClick={() => setActiveTab('apply')}
        >
          <FaPlus className="tab-icon" />
          Apply for Leave
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory className="tab-icon" />
          Application History
        </button>
      </div>

      <div className="leaves-content">
        {activeTab === 'summary' && renderLeaveSummary()}
        {activeTab === 'apply' && renderApplyLeave()}
        {activeTab === 'history' && renderLeaveHistory()}
      </div>
    </div>
  );
};

export default LeavesManagement;