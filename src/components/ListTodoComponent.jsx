import React, { useEffect, useState } from "react";
import { getAllTodos } from "../services/TodoService";
import { useNavigate } from "react-router-dom";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error));
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">📋 List of Todos</h3>
          <button className="btn btn-warning fw-bold" onClick={addNewTodo}>
            <i className="bi bi-plus-circle me-2"></i> Add Todo
          </button>
        </div>
        <div className="card-body p-4 table-responsive">
          <table className="table table-bordered table-hover table-striped align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Todo Title</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
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
