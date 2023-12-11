// import { useState } from "react";
// import { INewUser } from "../components/SignupPage";

// export const useValidateForm = ({ name, value, newUser }) => {
//   const [validationErrors, setValidationErrors] = useState<INewUser>({
//     name: '',
//     email: '',
//     psw: '',
//     confirmPsw: ''
// })
//     if (name === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const isValidEmail = emailRegex.test(value);
//       setValidationErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: isValidEmail ? "" : "Please, write a correct email address",
//       }));
//     }
  
//     if (name === "psw") {
//       const passwordLength = [...value].length;
  
//       if (passwordLength < 6 || passwordLength > 20) {
//         setValidationErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: passwordLength < 6
//             ? "Password should have at least 6 characters"
//             : "Password should have maximum 20 characters",
//         }));
//       } else {
//         setValidationErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     }
  
//     if (name === "confirmPsw") {
//       if (value !== newUser?.psw) {
//         setValidationErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "Passwords don't match. Please, try again.",
//         }));
//       } else {
//         setValidationErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     }
  
//     if (name === "name") {
//       const nameRegex = /^[a-zA-Z]+$/;
//       const isValidName = nameRegex.test(value);
//       setValidationErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: isValidName ? "" : "Name should contain only letters",
//       }));
//     }
//     return validationErrors
//   }