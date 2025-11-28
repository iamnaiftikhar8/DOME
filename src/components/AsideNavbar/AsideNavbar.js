import React from 'react';
import { 
  FaHome, FaRegUser, FaShippingFast, FaRegCompass, 
  FaSignOutAlt, FaChevronLeft, FaChevronRight,
  FaStethoscope, FaClinicMedical, FaCog, FaMoneyBillWave,
  FaCreditCard, FaTruck, FaChartLine,
  FaShieldAlt, FaLightbulb, FaShoppingCart, FaFlask,
  FaTools, FaFileContract, FaClipboardCheck, FaChartBar,
  FaSyncAlt, FaAward, FaCertificate
} from 'react-icons/fa';
import domelogo from '../../assets/images/dome-logo-wht.png';
import './AsideNavbar.css';

const SideNavbar = ({ activeTab, onTabChange, onLogout, isCollapsed, onToggleCollapse }) => {
  const navItems = [
    { key: 'home', label: 'Home', icon: <FaHome /> },
    { key: 'human-resource', label: 'Human Resource', icon: <FaRegUser /> },
    { key: 'supply-chain', label: 'Supply Chain', icon: <FaShippingFast /> },
    { key: 'logistics', label: 'Logistics', icon: <FaRegCompass /> },

    // Medical modules
    { key: 'medical-division', label: 'Medical Division', icon: <FaStethoscope /> },
    { key: 'medical-solutions', label: 'Medical Solutions', icon: <FaClinicMedical /> },

    // Business modules
    { key: 'admin-module', label: 'Admin Module', icon: <FaCog /> },
    { key: 'banking-finance', label: 'Banking and Finance', icon: <FaMoneyBillWave /> },
    { key: 'credit-manager', label: 'Credit Manager', icon: <FaCreditCard /> },
    { key: 'dispatch-manager', label: 'Dispatch Manager', icon: <FaTruck /> },
    { key: 'forecast-manager', label: 'Forecast Manager', icon: <FaChartLine /> },
    { key: 'internal-audit', label: 'Internal Audit', icon: <FaShieldAlt /> },
    { key: 'opportunity-module', label: 'Opportunity Module', icon: <FaLightbulb /> },
    { key: 'procurement', label: 'Procurement', icon: <FaShoppingCart /> },
    { key: 'reagent-rental', label: 'Reagent Rental', icon: <FaFlask /> },
    { key: 'service-portal', label: 'Service Portal', icon: <FaTools /> },

    // Quality section
    { key: 'drap', label: 'DRAP', icon: <FaFileContract /> },
    { key: 'gdpm', label: 'GDPMD', icon: <FaClipboardCheck /> },
    { key: 'gmp-lds', label: 'GMP-LDS', icon: <FaAward /> },
    { key: 'iso-13485-lds', label: 'ISO 13485:2016-LDS', icon: <FaCertificate /> },
    { key: 'iso-9001', label: 'ISO 9001:2015', icon: <FaCertificate /> },
    { key: 'qms-reports', label: 'QMS Reports', icon: <FaChartBar /> },
    { key: 'change-report', label: 'Change Report', icon: <FaSyncAlt /> },
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

      {/* Scrollable Navigation */}
      <div className="sidenav-scrollable">
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