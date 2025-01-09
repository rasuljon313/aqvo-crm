import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Side_bar from "../bar/Side_bar";
// import Sidebar from "../sidebar/Sidebar";

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
<Side_bar/>
    Products
    </>
  )
}

export default Products