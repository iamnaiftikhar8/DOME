import React, { useState, useEffect } from 'react';
import { FaUser, FaUsers, FaCalendarAlt, FaChartBar, FaArrowLeft } from 'react-icons/fa';
import EmployeeProfile from '../EmployeeProfile/EmployeeProfile';
import EmployeeList from './EmployeeList';
import LeavesManagement from './Leaves/LeavesManagement';
import './HR.css';

const HR = ({ onViewProfile }) => {
  const [activeSubCategory, setActiveSubCategory] = useState('');
  const [myProfileData, setMyProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const hrCategories = [
    {
      key: 'my-profile',
      label: 'My Profile',
      icon: <FaUser className="category-icon" />,
      description: 'View and manage your personal profile information'
    },
    {
      key: 'employee-management',
      label: 'Employee Management',
      icon: <FaUsers className="category-icon" />,
      description: 'Manage employee records, view profiles, and update information'
    },
    {
      key: 'leaves-management',
      label: 'Leaves Management',
      icon: <FaCalendarAlt className="category-icon" />,
      description: 'Handle leave requests, approvals, and track employee leaves'
    },
    {
      key: 'hr-reports',
      label: 'HR Reports',
      icon: <FaChartBar className="category-icon" />,
      description: 'Generate and view HR analytics and reports'
    },
    {
      key: 'attendance',
      label: 'Attendance',
      icon: <FaChartBar className="category-icon" />,
      description: 'Track and manage employee attendance records'
    },
    {
      key: 'payroll',
      label: 'Payroll',
      icon: <FaChartBar className="category-icon" />,
      description: 'Process payroll and manage salary information'
    }
  ];

  // Fetch current user's profile data
  const fetchMyProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!token || !user) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(`http://localhost:5000/api/hr/profile-detailed/${user.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      
      if (data.operation === 'success') {
        // Map API data to employee format
        const profileData = {
          empId: data.data.EmpID,
          name: data.data.FirstName,
          designation: data.data.DesignationName,
          department: data.data.DepartmentName,
          division: data.data.PayrollName,
          status: data.data.Status,
          email: data.data.OfficeEmail,
          mobile: data.data.OfficeMobile,
          reportTo: data.data.ReportToID,
          grade: data.data.PositionName,
          zone: data.data.LocationName,
          branch: data.data.BranchName,
          // Include all detailed data for the profile component
          ...data.data
        };
        setMyProfileData(profileData);
      }
    } catch (error) {
      console.error('Error fetching my profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryKey) => {
    setActiveSubCategory(categoryKey);
    
    // If My Profile is clicked, fetch the data
    if (categoryKey === 'my-profile') {
      fetchMyProfile();
    }
  };

  const handleBackToCategories = () => {
    setActiveSubCategory('');
    setMyProfileData(null);
  };

  const handleEmployeeClick = (employee) => {
    onViewProfile(employee);
  };

  const renderSubCategoryContent = () => {
    switch (activeSubCategory) {
      case 'my-profile':
        if (loading) {
          return (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading your profile...</p>
            </div>
          );
        }
        return myProfileData ? (
          <div className="subcategory-content">
            <div className="subcategory-header">
              <button onClick={handleBackToCategories} className="back-button">
                <FaArrowLeft className="back-icon" />
                Back to HR Categories
              </button>
              <h2>My Profile</h2>
            </div>
            <EmployeeProfile employee={myProfileData} onBack={handleBackToCategories} />
          </div>
        ) : (
          <div className="error-message">
            <p>Unable to load profile data.</p>
            <button onClick={fetchMyProfile} className="retry-button">
              Try Again
            </button>
          </div>
        );

      case 'employee-management':
        return (
          <div className="subcategory-content">
            <div className="subcategory-header">
              <button onClick={handleBackToCategories} className="back-button">
                <FaArrowLeft className="back-icon" />
                Back to HR Categories
              </button>
              <h2>Employee Management</h2>
            </div>
            <EmployeeList onViewProfile={handleEmployeeClick} />
          </div>
        );

      case 'leaves-management':
  return (
    <div className="subcategory-content">
      <div className="subcategory-header">
        <button onClick={handleBackToCategories} className="back-button">
          <FaArrowLeft className="back-icon" />
          Back to HR Categories
        </button>
        <h2>Leaves Management</h2>
      </div>
      <LeavesManagement />
    </div>
  );

      case 'hr-reports':
        return (
          <div className="subcategory-content">
            <div className="subcategory-header">
              <button onClick={handleBackToCategories} className="back-button">
                <FaArrowLeft className="back-icon" />
                Back to HR Categories
              </button>
              <h2>HR Reports</h2>
            </div>
            <div className="module-placeholder">
              <FaChartBar className="placeholder-icon" />
              <h3>HR Analytics & Reports</h3>
              <p>This module is under development. You'll be able to generate:</p>
              <ul>
                <li>Employee demographic reports</li>
                <li>Attendance summaries</li>
                <li>Turnover analysis</li>
                <li>Performance metrics</li>
                <li>Department-wise reports</li>
              </ul>
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="subcategory-content">
            <div className="subcategory-header">
              <button onClick={handleBackToCategories} className="back-button">
                <FaArrowLeft className="back-icon" />
                Back to HR Categories
              </button>
              <h2>Attendance Management</h2>
            </div>
            <div className="module-placeholder">
              <FaChartBar className="placeholder-icon" />
              <h3>Attendance Tracking System</h3>
              <p>This module is under development.</p>
            </div>
          </div>
        );

      case 'payroll':
        return (
          <div className="subcategory-content">
            <div className="subcategory-header">
              <button onClick={handleBackToCategories} className="back-button">
                <FaArrowLeft className="back-icon" />
                Back to HR Categories
              </button>
              <h2>Payroll Management</h2>
            </div>
            <div className="module-placeholder">
              <FaChartBar className="placeholder-icon" />
              <h3>Payroll Processing System</h3>
              <p>This module is under development.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (activeSubCategory) {
    return renderSubCategoryContent();
  }

  return (
    <div className="hr-container">
      <div className="hr-header">
        <h1>Human Resource Management</h1>
        <p>Select a category to manage HR operations</p>
      </div>

      <div className="hr-categories-grid">
        {hrCategories.map((category) => (
          <div
            key={category.key}
            className="hr-category-card"
            onClick={() => handleCategoryClick(category.key)}
          >
            <div className="category-icon-container">
              {category.icon}
            </div>
            <h3 className="category-title">{category.label}</h3>
            <p className="category-description">{category.description}</p>
            <div className="category-action">
              <span className="action-text">Click to open</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HR;