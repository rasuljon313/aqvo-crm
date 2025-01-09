import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../sidebar/Sidebar";


const Market = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        } else {
          navigate("/shops");
        }
      }, [navigate]);
  return (
    <>
<Bar/>
        ergverthv
    </>
  )
}

export default Market