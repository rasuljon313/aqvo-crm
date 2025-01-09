import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Side_bar from "../bar/Side_bar";


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
    <Side_bar/>
        ergverthv
    </>
  )
}

export default Market