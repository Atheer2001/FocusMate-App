import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Features/UserSlice"; // Action to log in the user
import { useNavigate } from "react-router-dom"; // To navigate after login
import { Button } from "reactstrap"; // Reactstrap components
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from "../Validations/LoginValidation"; // Validation schema for login
import { Link } from "react-router-dom"; // For navigation to sign-up page
import logo from "../Images/FocusMate-logo.jpg"; // Ensure the logo path is correct

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form setup for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation), // Add validation schema here
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const onSubmit = (data) => {
    const userData = { email: data.email, password: data.password };
    dispatch(login(userData)); // Dispatch login action
    navigate("/home"); // Navigate to the Home page after login
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        justifyContent: "center", // Center the content vertically
        alignItems: "center", // Center the content horizontally
        height: "100vh", // Full viewport height
        backgroundColor: "#ffffff", // White background for the page
        padding: "0px 20px", // Adjust padding for responsiveness
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#28a745", // Green background for the header
          display: "flex",
          justifyContent: "center", // Center the content horizontally in the header
          alignItems: "center", // Center logo and title vertically
          width: "100%", // Full width for the header
          padding: "10px 0", // Padding inside the header
        }}
      >
        <img
          src={logo}
          alt="FocusMate Logo"
          style={{
            height: "60px", // Adjust logo size
            marginRight: "15px", // Space between logo and title
          }}
        />
        <h1
          style={{
            fontSize: "2rem", // Smaller title size for balance
            fontWeight: "bold",
            color: "white", // White color for title
            margin: 0,
          }}
        >
          FocusMate
        </h1>
      </header>

      {/* Login Form */}
      <div
        style={{
          textAlign: "center", // Center text horizontally
          width: "100%", // Full width for the content area
          maxWidth: "400px", // Maximum width for the content box
          marginTop: "20px", // Space between header and form
          padding: "40px 30px", // Padding around the content
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow around the content box
          borderRadius: "15px", // Rounded corners for content box
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              {...register("email", { onChange: (e) => setEmail(e.target.value) })}
            />
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.email?.message}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              {...register("password", { onChange: (e) => setPassword(e.target.value) })}
            />
            <p style={{ color: "red", fontSize: "0.9rem" }}>{errors.password?.message}</p>
          </div>

          {/* Button */}
          <Button
            type="submit"
            color="success"
            style={{
              color: 'white',
              backgroundColor: "#28a745", // Green button color
              borderColor: "#28a745",
              fontSize: "1.2rem", // Slightly smaller font for button
              padding: "12px 35px", // Padding around the button
              borderRadius: "8px", // Rounded button corners
              marginTop: "20px", // Space above the button
            }}
          >
            Login
          </Button>
        </form>

        {/* Sign up link */}
        <p style={{ marginTop: "20px", fontSize: "1rem", color: "#333" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#28a745", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#777",
          marginTop: "20px", // Space between content and footer
        }}
      >
        © 2024 FocusMate. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
