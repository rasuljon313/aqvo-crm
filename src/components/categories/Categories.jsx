import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Side_bar from "../bar/Side_bar";


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
<Side_bar/>

    <div>omborho</div>
   </>
  )
}

export default Categories