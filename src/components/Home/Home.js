import React, { useState } from 'react';
import { 
  FaHome, 
  FaRegUser, 
  FaShippingFast,
  FaRegCompass,
} from 'react-icons/fa';
import './Home.css';
// Import the logo image
import domeLogo from '../../assets/images/Logo.png';

const Home = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <div className="content-area">
            <h2>Home</h2>
          </div>
        );
      case 'human-resource':
        return (
          <div className="content-area">
            <h2>Human Resources</h2>
          </div>
        );
      case 'supply-chain':
        return (
          <div className="content-area">
            <h2>Supply Chain</h2>
          </div>
        );
      case 'logistics':
        return (
          <div className="content-area">
            <h2>Logistics</h2>
          </div>
        );
      default:
        return (
          <div className="content-area">
            <h2>Home</h2>
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
            alt="DOME - Digital Office Management Engine" 
            className="sidebar-logo"
          />
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
            < FaShippingFast className="nav-icon" />
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
        
       
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;