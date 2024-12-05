import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Features/TaskSlice";
import { Button, Row, Col } from "reactstrap";

const TaskDetails = () => {
  const { taskId } = useParams(); // Get taskId from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  const [task, setTask] = useState(null);

  // Fetch tasks and find the current task
  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    } else {
      const foundTask = tasks.find((t) => t._id === taskId);
      setTask(foundTask);
    }
  }, [tasks, taskId, dispatch]);

  if (isLoading || !task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="task-details-container">
      <Row>
        <Col md={8} className="mx-auto">
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>
            <strong>Due Date:</strong> {task.dueDate}
          </p>
          <div className="button-group">
            <Button color="primary" onClick={() => navigate(`/tasks`)}>
              Back to Tasks
            </Button>
            <Button color="secondary" onClick={() => navigate(`/edit-task/${taskId}`)}>
              Edit Task
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TaskDetails;
