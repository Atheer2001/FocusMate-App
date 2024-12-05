import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Features/TaskSlice";
import { Row, Col } from "reactstrap";

const Home = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="home-container">
      <Row>
        <Col md={12}>
          <h2>Your Tasks</h2>
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="task">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
              </div>
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
