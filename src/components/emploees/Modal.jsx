import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Modal = ({ fetchEmployees, editingEmployee, setEditingEmployee }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    position: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployeeData({
        firstName: editingEmployee.firstName || "",
        lastName: editingEmployee.lastName || "",
        phoneNumber: editingEmployee.phoneNumber || "",
        position: editingEmployee.position || "",
        salary: editingEmployee.salary || "",
      });
      setIsOpen(true);
    } else {
      setEmployeeData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        position: "",
        salary: "",
      });
      setIsOpen(false);
    }
  }, [editingEmployee]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setEmployeeData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      position: "",
      salary: "",
    });
    setEditingEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Faqat harflar va bo'sh joylarga ruxsat berish
    if (["firstName", "lastName", "position"].includes(name)) {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    }

    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleEmployee = async (e, method) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Foydalanuvchi tokeni topilmadi!");
      return;
    }

    const formattedPhoneNumber = employeeData.phoneNumber.slice(0, 15);
    const employeePayload = {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      phoneNumber: formattedPhoneNumber,
      position: employeeData.position,
      salary: parseInt(employeeData.salary) || 0,
      startedWorkingAt: employeeData.startedWorkingAt || "2024-11-25",
    };

    try {
      if (method === "add") {
        await axios.post(
          "https://aqvo.limsa.uz/api/auth/employee/sign-up",
          employeePayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Yangi hodim muvaffaqiyatli qo'shildi!");
      } else if (method === "update" && editingEmployee?.id) {
        await axios.put(
          `https://aqvo.limsa.uz/api/users/${editingEmployee.id}`,
          employeePayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Hodim muvaffaqiyatli yangilandi!");
      } else {
        toast.error("Hodim ID topilmadi!");
      }
      fetchEmployees();
      setIsOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error response:", error.response);
      const status = error.response?.status;

      if (status === 401) {
        toast.error("Token eskirgan yoki noto‘g‘ri!");
      } else if (status === 400) {
        toast.error("Yuborilgan ma'lumotlarda xato bor!");
      } else {
        toast.error("Xatolik yuz berdi!");
      }
    }
  };

  return (
    <div className="Modal">
      <button onClick={toggleModal}>
        {editingEmployee ? "Hodimni Yangilash" : "Ma'lumot Qo'shish"}
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingEmployee ? "Hodimni Yangilash" : "Yangi Hodim Qo'shish"}</h2>
            <form onSubmit={(e) => handleEmployee(e, editingEmployee ? "update" : "add")}>
              <input
                type="text"
                name="firstName"
                placeholder="Ismi"
                value={employeeData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Familiyasi"
                value={employeeData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Telefon"
                value={employeeData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="position"
                placeholder="Lavozimi"
                value={employeeData.position}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="salary"
                placeholder="Maosh"
                value={employeeData.salary}
                onChange={handleInputChange}
              />
              <div className="modal-buttons">
                <button type="submit">
                  {editingEmployee ? "Yangilash" : "Qo'shish"}
                </button>
                <button type="button" onClick={toggleModal}>
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
