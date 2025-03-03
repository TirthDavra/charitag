// "use client";
// import React, { useState } from "react";
// import CustomInputField from "../../custom/CustomInputField";
// import axios from "axios";
// // import { isValidEmail } from "../validations/validations";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [btnText, setBtnText] = useState("Get Code");
//   const [showCodeField, setShowCodeField] = useState(false);
//   const [showPasswordFields, setShowPasswordFields] = useState(false);

//   const [errors, setErrors] = useState([]);

//   const getCode = async () => {
//     const formData = {
//       email,
//     };

//     const isEmailValid = isValidEmail(formData.email);
//     if (!isEmailValid) {
//       setErrors({ email: "Invalid email" });
//       return null;
//     }

//     try {
//       const response = await axios.post(
//         "http://charitag.faai5200.com/public/api/forget",
//         formData,
//       );
//       return response;
//     } catch (err) {
//       // setErrors({ email: 'An error occurred!' });
//       // setErrors(err.response.data.errors);
//       return { data: { message: "Account with this email was not found!" } };
//     }
//   };

//   const verifyCode = async () => {
//     const formData = {
//       email,
//       code,
//     };
//     try {
//       const response = await axios.post(
//         "http://charitag.faai5200.com/public/api/codeVerify",
//         formData,
//       );
//       return response;
//     } catch (err) {}
//   };

//   const updatePassword = async () => {
//     const formData = {
//       email,
//       code,
//       password,
//     };

//     try {
//       const response = await axios.post(
//         "http://charitag.faai5200.com/public/api/setNewPassword",
//         formData,
//       );
//       return response;
//     } catch (err) {}
//   };

//   const handleSubmit = async () => {
//     switch (btnText) {
//       case "Get Code":
//         getCode().then((response) => {
//           if (response) {
//             if (response.data.status) {
//               setBtnText("Submit");
//               setShowCodeField(true);
//             } else {
//               setErrors({ email: response.data.message });
//             }
//           }
//         });
//         break;
//       case "Submit":
//         verifyCode().then((response) => {
//           if (response.data.status) {
//             setShowPasswordFields(true);
//             setBtnText("Update Password");
//           } else {
//             setErrors({ code: response.data.message });
//           }
//         });
//         break;
//       case "Update Password":
//         updatePassword().then((response) => {
//           if (response.data.status) {
//             window.location.href = "/";
//           } else {
//             setErrors({ password: response.data.message });
//           }
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <main className="my-8 flex w-full max-w-[700px] flex-col gap-5 rounded-xl bg-white px-5 py-10 shadow-equally_distributed_bluish lg:my-20 lg:w-[75%] lg:px-28">
//       <h1 className="mb-5 text-center text-[45px] font-bold text-gray-800">
//         {!showCodeField && <span>Reset Password</span>}
//         {showCodeField && !showPasswordFields && <span>Verify Email</span>}
//         {showPasswordFields && <span>Set New Password</span>}
//       </h1>
//       <form action="" method="post" className="flex flex-col gap-5">
//         {!showCodeField && (
//           <CustomInputField
//             isDisabled={showCodeField}
//             label={"Email address"}
//             onChange={setEmail}
//             backendError={errors.email}
//           />
//         )}
//         {showCodeField && !showPasswordFields && (
//           <CustomInputField
//             isDisabled={showPasswordFields}
//             label={"Enter verification code"}
//             onChange={setCode}
//             backendError={errors.code}
//           />
//         )}
//         {showPasswordFields && (
//           <div className="flex flex-col gap-5">
//             <CustomInputField
//               label={"Enter new password"}
//               onChange={setPassword}
//             />
//             <CustomInputField
//               label={"Confirm password"}
//               onChange={setConfirmPassword}
//               backendError={errors.password}
//             />
//           </div>
//         )}

//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             handleSubmit();
//           }}
//           className="rounded-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 px-4 py-4 font-bold text-white shadow-md shadow-gradient_color_1"
//         >
//           {btnText}
//         </button>
//       </form>
//     </main>
//   );
// };

// export default ForgotPassword;
