import React, { useState } from 'react';
import SideNavbar from '../AsideNavbar/AsideNavbar';
import HR from '../HR/HR';
import EmployeeProfile from '../EmployeeProfile/EmployeeProfile';
import './Home.css';

const Home = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab('employee-profile');
  };

  const handleBackToHR = () => {
    setSelectedEmployee(null);
    setActiveTab('human-resource');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedEmployee(null);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="content-wrapper fade-in">
            <div className="page-header">
              <h2>Dashboard Overview</h2>
              <p className="subtitle">Welcome to DOME - Digital Office Management Engisasasne</p>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Employees</h3>
                <div className="stat-number">150</div>
              </div>

              <div className="stat-card">
                <h3>Active Users</h3>
                <div className="stat-number">142</div>
              </div>

              <div className="stat-card">
                <h3>Departments</h3>
                <div className="stat-number">12</div>
              </div>
            </div>
          </div>
        );

      case 'human-resource':
        return <HR onViewProfile={handleViewProfile} />;

      case 'employee-profile':
        return <EmployeeProfile employee={selectedEmployee} onBack={handleBackToHR} />;

      case 'supply-chain':
        return (
          <div className="content-wrapper fade-in">
            <div className="page-header">
              <h2>Supply Chain Management</h2>
            </div>
            <p className="module-description">
              Supply chain modules and features will be displayed here.
            </p>
          </div>
        );

      case 'logistics':
        return (
          <div className="content-wrapper fade-in">
            <div className="page-header">
              <h2>Logistics Management</h2>
            </div>
            <p className="module-description">
              Logistics and transportation modules will be displayed here.
            </p>
          </div>
        );

      default:
        return (
          <div className="content-wrapper fade-in">
            <div className="page-header">
              <h2>Dashboard</h2>
            </div>
            <p className="module-description">Select a module from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="home-container">
      <SideNavbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={onLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
