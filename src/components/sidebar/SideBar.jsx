import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(null); // To manage which menu item is expanded
  const [collapsed, setCollapsed] = useState(false); // To manage the sidebar collapse/expand state

  const sidebarItems = [
    { name: "Statistike", path: "/home", icon: "📊", subItems: [] },
    { name: "Ombor", path: "/categories", icon: "📦", subItems: [] },
    { name: "Magazinlar", path: "/shops", icon: "🏪", subItems: [] },
    { name: "Hodimlar", path: "/employees", icon: "👥", subItems: [] },
    { name: "Tayyor Mahsulot", path: "/ready-product", icon: "🍽️", subItems: [] },
  ];

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle expanded menu item
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle sidebar collapse state
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {collapsed ? '>' : '<'} {/* Toggle button to collapse/expand the sidebar */}
      </button>
      <div className="sidebar_logo"></div>
      <ul className="sidebar_list">
        {sidebarItems.map((item, index) => (
          <li
            key={item.path}
            className={`sidebar_item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <div className="menu-item-header" onClick={() => handleToggle(index)}>
              <span className="menu-icon">{item.icon}</span> {/* Always show icon */}
              {!collapsed && (
                <Link to={item.path} className="menu-text">
                  {item.name}
                </Link>
              )}
              {item.subItems.length > 0 && (
                <span>{expanded === index ? '-' : '+'}</span> 
              )}
            </div>
            {expanded === index && item.subItems.length > 0 && (
              <ul className="sub-menu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.path}>{subItem.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
