import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../Features/TaskSlice"; // Action to add a new task
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate };
    dispatch(createTask(newTask)); // Dispatch the action to add the task
    navigate("/tasks"); // Redirect to the tasks page
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Add New Task</h2>
          <form onSubmit={handleAddTask}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
            <Button type="submit" color="primary" className="btn-block">
              Add Task
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTask;
