import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="nav">
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Nav;