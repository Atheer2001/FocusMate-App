import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Features/TaskSlice"; // Action to fetch tasks
import { Button, Row, Col } from "reactstrap"; // Reactstrap components
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading, isError, msg } = useSelector((state) => state.tasks); // Redux state for tasks

  // Fetch tasks when component loads
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  if (isError) {
    return <p>Error: {msg}</p>;
  }

  return (
    <div className="tasks-container">
      <Row>
        <Col>
          <h2>Your Tasks</h2>
          <Button
            color="primary"
            onClick={() => navigate("/task-details/new")}
            className="mb-3"
          >
            Add New Task
          </Button>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task._id}
                className="task-card p-3 mb-3 border rounded"
                onClick={() => navigate(`/task-details/${task._id}`)}
              >
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <small>
                  <strong>Due:</strong> {task.dueDate}
                </small>
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Tasks;
