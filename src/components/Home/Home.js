import React, { useState } from 'react';
import './Home.css';

const Home = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

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
        return (
          <div className="content-area">
            <h2>Human Resources</h2>
            <div className="module-text">Human Resources Management System</div>
          </div>
        );
      case 'supply-chain':
        return (
          <div className="content-area">
            <h2>Supply Chain</h2>
            <div className="module-text">Supply Chain Management</div>
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
          <h1 className="logo">DOME</h1>
        </div>
        
        <div className="sidebar-content">
          <div 
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </div>
          <div 
            className={`nav-item ${activeTab === 'human-resource' ? 'active' : ''}`}
            onClick={() => setActiveTab('human-resource')}
          >
            Human Resource
          </div>
          <div 
            className={`nav-item ${activeTab === 'supply-chain' ? 'active' : ''}`}
            onClick={() => setActiveTab('supply-chain')}
          >
            Supply Chain
          </div>
          <div 
            className={`nav-item ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            Logistics
          </div>
        </div>
        
        <div className="user-section">
          <div className="user-name">Emily Derek</div>
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