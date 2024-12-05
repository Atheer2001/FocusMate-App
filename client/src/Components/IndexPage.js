import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../Images/FocusMate-logo.jpg"; // Ensure the logo path is correct

const IndexPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack elements vertically
        justifyContent: "space-between", // Space between header, content, and footer
        height: "100vh", // Full viewport height
        padding: "0px 20px", // Adjust padding for responsiveness
        backgroundColor: "#ffffff", // White background for the page
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
            height: "60px", // Reduced logo size
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

      {/* Main Content */}
      <div
        style={{
          textAlign: "center", // Center text horizontally
          width: "100%", // Full width for the content area
          maxWidth: "500px", // Maximum width for the content box
          margin: "20px auto", // Center the content box with reduced margin
        }}
      >
        {/* Description Text */}
        <p
          style={{
            fontSize: "1.4rem", // Adjusted font size for description
            color: "#4a4a4a", // Dark text color for description
            marginBottom: "20px", // Reduced space below the description
          }}
        >
          Your companion for effective study sessions. Join now and enhance your productivity!
        </p>

        {/* Button */}
        <Link to="/login">
          <Button
            color="success" // Green color for the button
            size="sm" // Smaller size for the button
            style={{
              color: 'white',
              backgroundColor: "#28a745", // Green button color
              borderColor: "#28a745",
              fontSize: "1.2rem", // Slightly smaller font for the button
              padding: "10px 30px", // Padding around the button
              borderRadius: "8px", // Rounded button corners
              marginTop: "15px", // Space above the button
            }}
          >
            Get Started
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#777",
          marginTop: "10px", // Reduced space between content and footer
        }}
      >
        © 2024 FocusMate. All rights reserved.
      </footer>
    </div>
  );
};

export default IndexPage;
