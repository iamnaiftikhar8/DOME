import React, { useState } from 'react';
import { 
  FaHome, 
  FaRegUser, 
  FaShippingFast,
  FaRegCompass,
  FaSignOutAlt
} from 'react-icons/fa';
import HR from '../HR/HR';
import EmployeeProfile from '../EmployeeProfile/EmployeeProfile';
import './Home.css';
import domeLogo from '../../assets/images/Logo.png';

const Home = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab('employee-profile');
  };

  const handleBackToHR = () => {
    setSelectedEmployee(null);
    setActiveTab('human-resource');
  };

  const handleLogout = () => {
    // You can add confirmation dialog here if needed
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="content-area">
            <h2>Home</h2>
            <div className="module-text">Welcome to DOME Dashboard</div>
          </div>
        );
      case 'human-resource':
        return <HR onViewProfile={handleViewProfile} />;
      case 'employee-profile':
        return <EmployeeProfile employee={selectedEmployee} onBack={handleBackToHR} />;
      case 'supply-chain':
        return (
          <div className="content-area">
            <h2>Supply Chain</h2>
            <div className="module-text">Supply Chain Management System</div>
          </div>
        );
      case 'logistics':
        return (
          <div className="content-area">
            <h2>Logistics</h2>
            <div className="module-text">Logistics Management System</div>
          </div>
        );
      default:
        return (
          <div className="content-area">
            <h2>Home</h2>
            <div className="module-text">Welcome to DOME Dashboard</div>
          </div>
        );
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img 
            src={domeLogo} 
            alt="DOME" 
            className="sidebar-logo"
          />
          <div className="header-text">
            <div className="dome-title">DOME</div>
            <div className="dome-subtitle">Digital Office Management Engine</div>
          </div>
        </div>
        
        <div className="sidebar-content">
          <div 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <FaHome className="nav-icon" />
            <span>Home</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'human-resource' ? 'active' : ''}`}
            onClick={() => setActiveTab('human-resource')}
          >
            <FaRegUser className="nav-icon" />
            <span>Human Resource</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'supply-chain' ? 'active' : ''}`}
            onClick={() => setActiveTab('supply-chain')}
          >
            <FaShippingFast className="nav-icon" />
            <span>Supply Chain</span>
          </div>
          <div 
            className={`nav-item ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            <FaRegCompass className="nav-icon" />
            <span>Logistics</span>
          </div>
        </div>
        
        <div className="user-section">
          <div className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;