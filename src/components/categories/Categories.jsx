import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const Categories = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        } else {
          navigate("/categories");
        }
      }, [navigate]);
  return (
   <>
<Sidebar/>

    <div>omborho</div>
   </>
  )
}

export default Categories