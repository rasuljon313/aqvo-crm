import { useLocation, Link } from 'react-router-dom'; // Use Link instead of <a>

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { name: "Statistike", path: "/home" },
    { name: "Ombor", path: "/categories" },
    { name: "Magazinlar", path: "/shops" },
    { name: "Hodimlar", path: "/employees" },
    { name: "Tayyor Mahsulot", path: "/ready-product" },
  ];

  return (
    <div className="sidebar">
        <div className="sidebar_logo"></div>
      <ul className="sidebar_list">
        {sidebarItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar_item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path}>{item.name}</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;