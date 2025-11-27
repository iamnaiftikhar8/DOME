import React from 'react';
import { 
  FaHome, 
  FaRegUser, 
  FaShippingFast,
  FaRegCompass,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './AsideNavbar.css';

const SideNavbar = ({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const navItems = [
    { key: 'home', label: 'Home', icon: <FaHome className="nav-icon" /> },
    { key: 'human-resource', label: 'Human Resource', icon: <FaRegUser className="nav-icon" /> },
    { key: 'supply-chain', label: 'Supply Chain', icon: <FaShippingFast className="nav-icon" /> },
    { key: 'logistics', label: 'Logistics', icon: <FaRegCompass className="nav-icon" /> },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className={`sidenav ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidenav-header">
        {!isCollapsed && (
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-placeholder">D</div>
              <div className="logo-text">
                <div className="logo-title">DOME</div>
                <div className="logo-subtitle">Digital Office Management</div>
              </div>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="logo-collapsed">
            <div className="logo-placeholder">D</div>
          </div>
        )}
        <button className="collapse-btn" onClick={onToggleCollapse}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="sidenav-content">
        <nav className="sidenav-nav">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => onTabChange(item.key)}
              title={isCollapsed ? item.label : ''}
            >
              {item.icon}
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
              {activeTab === item.key && !isCollapsed && (
                <div className="active-indicator"></div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer with Logout */}
      <div className="sidenav-footer">
        <div 
          className="logout-item"
          onClick={handleLogout}
          title={isCollapsed ? 'Logout' : ''}
        >
          <FaSignOutAlt className="nav-icon" />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </div>
        
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-avatar">
              <span>U</span>
            </div>
            <div className="user-details">
              <div className="user-name"></div>
              <div className="user-role"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;