import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";


const Products = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        } else {
          navigate("/ready-product");
        }
      }, [navigate]);
  return (
    <>
    <Sidebar/>
    Products
    </>
  )
}

export default Products