import { useNavigate } from "react-router-dom";
import useStore from "../../zustand";

const Nav = () => {
  const navigate = useNavigate();
  const { setToken } = useStore();  
  const token = localStorage.getItem("token");  

  const logout = () => {
    if (token) {
      localStorage.removeItem("token");  
      setToken(null);  
      navigate("/");  
    }
  };

  return (
    <nav className="nav">
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Nav;
