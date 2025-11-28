import React, { useState } from 'react';
import Login from './components/Login/Login';
import SideNavbar from './components/AsideNavbar/AsideNavbar';
import HR from './components/HR/HR';
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
    setSelectedEmployee(null);
  };

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

  const toggleSidebar = () =>
    setIsSidebarCollapsed(!isSidebarCollapsed);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="content-wrapper">
            <h2 className="page-title">Home</h2>

            <div className="welcome-card">
              <p className="welcome-text">
                Welcome to <span className="brand-blue">DOME</span> — Digital Office Management Engine
              </p>
            </div>

            <div className="stats-grid">
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
          <div className="content-wrapper">
            <h2 className="page-title">Supply Chain Management</h2>
            <p className="module-text">Supply chain modules and features will be displayed here.</p>
          </div>
        );

      case 'logistics':
        return (
          <div className="content-wrapper">
            <h2 className="page-title">Logistics Management</h2>
            <p className="module-text">Logistics and transportation modules will be displayed here.</p>
          </div>
        );

      default:
        return (
          <div className="content-wrapper">
            <h2 className="page-title">Dashboard</h2>
            <p className="module-text">Select a module from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="app-container">
          <SideNavbar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onLogout={handleLogout}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />

          <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            {renderContent()}
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
