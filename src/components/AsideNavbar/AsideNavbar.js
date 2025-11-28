import React from 'react';
import { 
  FaHome, FaRegUser, FaShippingFast, FaRegCompass, 
  FaSignOutAlt, FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';
import domelogo from '../../assets/images/dome-logo-wht.png';
import './AsideNavbar.css';

const SideNavbar = ({ activeTab, onTabChange, onLogout, isCollapsed, onToggleCollapse }) => {
  const navItems = [
    { key: 'home', label: 'Home', icon: <FaHome /> },
    { key: 'human-resource', label: 'Human Resource', icon: <FaRegUser /> },
    { key: 'supply-chain', label: 'Supply Chain', icon: <FaShippingFast /> },
    { key: 'logistics', label: 'Logistics', icon: <FaRegCompass /> },
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
        {!isCollapsed ? (
          <div className="header-content">
            <div className="logo-section">
              <img src={domelogo} alt="DOME Logo" className="logo-image" />
            </div>
          </div>
        ) : (
          <div className="logo-collapsed">
            <div className="logo-placeholder">D</div>
          </div>
        )}

        <button className="collapse-btn" onClick={onToggleCollapse}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <div className="sidenav-content">
        {navItems.map((item) => (
          <div
            key={item.key}
            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => onTabChange(item.key)}
            title={isCollapsed ? item.label : ''}
          >
            {item.icon}
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidenav-footer">
        <div className="logout-item" onClick={handleLogout} title={isCollapsed ? 'Logout' : ''}>
          <FaSignOutAlt />
          {!isCollapsed && <span className="nav-label">Logout</span>}
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-avatar">U</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
