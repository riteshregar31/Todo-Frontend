import React, { useEffect, useState } from "react";
import { getTodo, saveTodo, updateTodo} from "../services/TodoService";
import { useNavigate, useParams } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";

const TodoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const isAdmin = isAdminUser();

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCompleted(res.data.completed);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  
  const saveOrUpdateTodo = (e) => {
    e.preventDefault();
    const newTodo = { title, description, completed };

    if (id) {
      updateTodo(id, newTodo)
        .then(() => navigate("/todos"))
        .catch((err) => console.error(err));
    } else {
      saveTodo(newTodo)
        .then(() => navigate("/todos"))
        .catch((err) => console.error(err));
    }
  };

  const handleCompletedChange = (e) => {
    const newValue = e.target.checked;
    setCompleted(newValue);

    if (!id) return; 

    updateTodoCompletion(id, newValue)
      .then(() => console.log("Todo completion updated"))
      .catch((err) => console.error(err));
  };

  const pageTitle = () => (id ? <h2>Update Todo</h2> : <h2>Add Todo</h2>);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg rounded-3">
        <div className="card-header bg-dark text-white text-center">{pageTitle()}</div>
        <div className="card-body">
          <form onSubmit={saveOrUpdateTodo}>
            <div className="mb-3">
              <label className="form-label fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter todo description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="completed"
                checked={completed}
                onChange={handleCompletedChange}
              />
              <label className="form-check-label" htmlFor="completed">
                Completed
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-warning fw-bold">
                <i className="bi bi-plus-circle me-2"></i> {id ? "Update Todo" : "Add Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
