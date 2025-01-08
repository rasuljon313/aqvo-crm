// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Forin = () => {
//   const [number, setNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [token, setToken] = useState(localStorage.getItem("token")); // tokenni kuzatish uchun state
//   const navigate = useNavigate();

//   const login = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     fetch("https://aqvo.limsa.uz/api/auth/sign-in", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         phoneNumber: number,
//         password: password,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const accessToken = data?.data?.tokens?.access_token;

//         if (accessToken) {
//           localStorage.setItem("token", accessToken);
//           setToken(accessToken); // tokenni state'ga o'rnatish
//           setSuccessMessage("Login successful!");
//         } else {
//           setErrorMessage(data.message || "Login failed");
//         }
//       })
//       .catch((err) => {
//         setErrorMessage("Error during login: " + err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       navigate("/home");
//     }
//   }, [token, navigate]); 

//   return (
//     <div>
//       <div className="forin">
//         <div className="container">
//           <div className="forin_box">
//             <form className="forin_card" onSubmit={login}>
//               <input
//                 className="forin_input"
//                 type="tel"
//                 placeholder="Phone Number"
//                 required
//                 onChange={(e) => setNumber(e.target.value)}
//                 value={number}
//               />
//               <input
//                 className="forin_input"
//                 type="password"
//                 placeholder="Password"
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//               <button className="forin_btn" type="submit" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//               {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//               {successMessage && (
//                 <p style={{ color: "green" }}>{successMessage}</p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Forin;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand";  // Import the useStore hook

const Forin = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setToken, token } = useStore(); // Use the store's token state and functions
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    fetch("https://aqvo.limsa.uz/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: number,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const accessToken = data?.data?.tokens?.access_token;

        if (accessToken) {
          localStorage.setItem("token", accessToken);
          setToken(accessToken); // store token in state
          setSuccessMessage("Login successful!");
          navigate("/home"); // Redirect to /home upon successful login
        } else {
          setErrorMessage(data.message || "Login failed");
        }
      })
      .catch((err) => {
        setErrorMessage("Error during login: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Check if the token exists on load and navigate accordingly
  useEffect(() => {
    if (token) {
      navigate("/home");  // If token exists, navigate to /home
    } else {
      navigate("/");  // If no token, navigate to login page
    }
  }, [token, navigate]); // Trigger the effect whenever `token` state changes

  return (
    <div>
      <div className="forin">
        <div className="container">
          <div className="forin_box">
            <form className="forin_card" onSubmit={login}>
              <input
                className="forin_input"
                type="tel"
                placeholder="Phone Number"
                required
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
              <input
                className="forin_input"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button className="forin_btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forin;
