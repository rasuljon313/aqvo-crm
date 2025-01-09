import { useEffect, useState } from "react";
import useStore from "../../zustand";

import { useNavigate } from "react-router-dom";
import Nav from "../nav/Nav";
import Bar from "../sidebar/Sidebar";


const Header = () => {
  const [data, setData] = useState(null);
  const [dataConserve, setDataConserve] = useState(null);
  const [names, setNames] = useState([]);
  const { token, refreshToken } = useStore();
  const navigate = useNavigate();
  const [type, setType] = useState(null); 
  useEffect(() => {
    if (token) {
      const intervalId = setInterval(() => {
        refreshToken(navigate);  
        navigate("/");  
      }, 60000);

      return () => clearInterval(intervalId); 
    }
  }, [token, navigate, refreshToken]);
useEffect(() => {
    if (!token) {
      refreshToken(navigate);
    } else {
      fetch("https://aqvo.limsa.uz/api/analytics", {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => {
          console.error("Error fetching analytics data:", error);
        });
    }
  }, [token, navigate, refreshToken]);

  useEffect(() => {
    fetch("https://aqvo.limsa.uz/api/conserve-type", {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((elem) => setDataConserve(elem.data))
      .catch((error) => {
        console.error("Error fetching conserve-type data:", error);
      });
  }, [token]);

  const select = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = dataConserve.find((option) => option.conserveType === selectedValue);
    if (selectedOption && selectedOption.productConsumptions) {
      const selectedId = selectedOption.id; 
      console.log("Selected ID: ", selectedId);
      
      setType(selectedId); 

      const newNames = selectedOption.productConsumptions.map((item) => item.product.productName);
      setNames(newNames);
      
    }
  };

  useEffect(() => {
    if (type) { 
      fetch(`https://aqvo.limsa.uz/api/analytics/type?typeId=${type}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error("Error fetching analytics data:", error);
        });
    }
  }, [type]); 

  return (
    <>
      <header>
        <div className="header_header">
          <Bar />
          <div className="header_box">
<Nav/>
            <div className="header_card">
              <h1>Analitika bolimi</h1>
              <div className="header_card_child">
                <ul className="header_wrapper">
                  <li className="header_wrapper_item">
                    📈 Umumiy miqdor {data?.totalProduced}
                  </li>
                  <li className="header_wrapper_item">
                    🛒 Umumiy tushum {data?.totalProfit}
                  </li>
                  <li className="header_wrapper_item">
                    💰 Umumiy sotilgan {data?.totalSold}
                  </li>
                </ul>
                <div className="header_card_resurse">
                  <h3 className="header_card_resurse_title">Resurs Hisoboti</h3>

                  <select name="" id=""
                   onChange={select}
                   >
                    <option value="" selected disabled>
                      Mahsulotni tanlang
                    </option>
                    {dataConserve &&
                      dataConserve.map((option, index) => (
                        <option key={index} value={option.conserveType}>
                          {option.conserveType}
                        </option>
                      ))}
                  </select>
                  <input type="number" placeholder="number" />
                </div>
                <div className="header_card_accounting">
                  <h3 className="header_card_accounting_title">
                    Sarflangan resurslar jadvali
                  </h3>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginTop: "20px",
                    }}
                    border="1"
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ padding: "10px" }}>Resurslar nomi</th>
                        <th style={{ padding: "10px" }}>
                          Resurslar miqdori (kg)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {names.map((row, index) => (
                        <tr key={index}>
                          <td style={{ padding: "10px" }}>{row}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
