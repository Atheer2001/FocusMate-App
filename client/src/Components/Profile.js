import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Features/UserSlice"; // Action to update user information
import { Row, Col, Button } from "reactstrap"; // Importing Reactstrap components

const Profile = () => {
  const { user } = useSelector((state) => state.users); // Get user from Redux store
  const dispatch = useDispatch();
  
  const [name, setName] = useState(user?.name || ""); // Set initial value from Redux state
  const [email, setEmail] = useState(user?.email || "");

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { name, email };
    dispatch(updateUser(updatedUser)); // Dispatch action to update user in Redux
  };

  return (
    <div className="profile-container">
      <Row>
        <Col md={6}>
          <h2>Profile</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <Button type="submit" color="primary">Update</Button>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
