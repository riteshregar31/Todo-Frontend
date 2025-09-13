import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../services/TodoService";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    listTodos();
  }, []);

  const listTodos = () => {
    getAllTodos()
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error));
  };

  const addNewTodo = () => navigate("/add-todo");
  const updateTodo = (id) => navigate(`/update-todo/${id}`);

  const removeTodo = (id) => {
    deleteTodo(id)
      .then(() => listTodos())
      .catch((error) => console.error(error));
  };

  const markCompleteTodo = (id) => {
    completeTodo(id)
      .then(() => listTodos())
      .catch((error) => console.error(error));
  };
  const markIncompleteTodo = (id) => {
    inCompleteTodo(id)
      .then(() => listTodos())
      .catch((error) => console.error(error));
  };
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">📋 List of Todos</h3>
          {isAdmin && (
            <button className="btn btn-warning fw-bold" onClick={addNewTodo}>
              <i className="bi bi-plus-circle me-2"></i> Add Todo
            </button>
          )}
        </div>
        <div className="card-body p-4 table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Todo Title</th>
                <th>Description</th>
                <th>Status</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 ? (
                todos.map((todo, index) => (
                  <tr key={todo.id}>
                    <td className="fw-bold">{index + 1}</td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>
                      {todo.completed ? (
                        <span className="badge bg-success">Completed</span>
                      ) : (
                        <span className="badge bg-danger">Pending</span>
                      )}
                    </td>
                    <td>
                      {isAdmin && (
                        <button
                          className="btn btn-sm btn-info rounded-pill d-flex align-items-center"
                          onClick={() => updateTodo(todo.id)}
                        >
                          <i className="bi bi-pencil-square me-1"></i> Update
                        </button>
                      )}
                    </td>
                    <td>
                      {isAdmin && (
                        <button
                          className="btn btn-sm btn-danger rounded-pill d-flex align-items-center"
                          onClick={() => removeTodo(todo.id)}
                        >
                          <i className="bi bi-trash-fill me-1"></i> Delete
                        </button>
                      )}
                    </td>
                    <td>
                      {todo.completed ? (
                        <button
                          className="btn btn-sm btn-warning rounded-pill d-flex align-items-center"
                          onClick={() => markIncompleteTodo(todo.id)}
                          title="Mark as Incomplete"
                        >
                          <i className="bi bi-x-lg me-1"></i> Incomplete
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-success rounded-pill d-flex align-items-center"
                          onClick={() => markCompleteTodo(todo.id)}
                          title="Mark as Complete"
                        >
                          <i className="bi bi-check-lg me-1"></i> Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No Todos Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTodoComponent;
