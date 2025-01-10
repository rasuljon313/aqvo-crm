import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Modal from "./Modal";
import Sidebar from "../bar/Side_bar";  
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const navigate = useNavigate();

    
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchEmployees(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchEmployees = async (token) => {
    try {
      const response = await axios.get("https://aqvo.limsa.uz/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) fetchEmployees(newToken);
      } else {
        console.error("Error fetching employees:", error);
      }
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        navigate("/");
        return null;
      }

      const response = await axios.post("https://aqvo.limsa.uz/api/auth/refresh", {
        refreshToken,
      });
      
      const newToken = response.data?.data?.access_token;

      if (newToken) {
        localStorage.setItem("token", newToken);
        return newToken;
      } else {
        navigate("/");
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      navigate("/");
      return null;
    }
  };

  const deleteEmployee = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!isConfirmed) return;
  
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`https://aqvo.limsa.uz/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      toast.success("Employee deleted successfully!");
      fetchEmployees(token);
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) deleteEmployee(id); // Retry with new token
      } else {
        toast.error("Error deleting employee!");
        console.error("Error deleting employee:", error);
      }
    }
  };
  

  return (
    <div className="crm-panel">
      <ToastContainer />
      <div className="grid">
        <div className="">
         <Sidebar/>
        </div>
        <div className="main-content">
          <h1>Hodimlar</h1>
          <div className="modal_flex">
            <Modal 
              fetchEmployees={fetchEmployees} 
              editingEmployee={editingEmployee} 
              setEditingEmployee={setEditingEmployee} 
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Ismi</th>
                <th>Familiyasi</th>
                <th>Lavozimi</th>
                <th>Maosh</th>
                <th>Telefon</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.position || "Amaliyotchi"}</td>
                  <td>{employee.salary ? `${employee.salary} USD` : "Amaliyotchi"}</td>
                  <td>{employee.phoneNumber}</td>
                  <td className="btn_flex">
                    <button
                      className="edit"
                      onClick={() => setEditingEmployee(employee)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="edit"
                      onClick={() => deleteEmployee(employee.id)}
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
