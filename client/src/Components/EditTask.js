import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTask } from "../Features/TaskSlice"; // Action to update a task
import { fetchTasks } from "../Features/TaskSlice"; // Action to fetch tasks
import { Button, Container, Row, Col } from "reactstrap";

const EditTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state.tasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    } else {
      const task = tasks.find((t) => t._id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
      }
    }
  }, [tasks, taskId, dispatch]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const updatedTask = { _id: taskId, title, description, dueDate };
    dispatch(updateTask(updatedTask)); // Dispatch the action to update the task
    navigate("/tasks"); // Redirect to the tasks page
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Edit Task</h2>
          <form onSubmit={handleUpdateTask}>
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
              Update Task
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTask;
