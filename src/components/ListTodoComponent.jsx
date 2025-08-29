import React, { useState } from 'react'

const ListTodoComponent = () => {
  const dummyData = [
    { "id": 1, "title": "learn java", "description": "learn core java", "completed": false },
    { "id": 2, "title": "learn javascript", "description": "study ES6+ features and async programming", "completed": false },
    { "id": 3, "title": "read a book", "description": "finish 50 pages of a programming book", "completed": true },
    { "id": 4, "title": "workout", "description": "30 minutes of cardio and strength training", "completed": false },
    { "id": 5, "title": "build project", "description": "create a todo app using React", "completed": false },
    { "id": 6, "title": "write blog", "description": "publish an article on Medium about JavaScript", "completed": true },
    { "id": 7, "title": "learn sql", "description": "practice queries on joins and subqueries", "completed": false },
    { "id": 8, "title": "grocery shopping", "description": "buy milk, fruits, and vegetables", "completed": true },
    { "id": 9, "title": "watch tutorial", "description": "watch a YouTube tutorial on Node.js", "completed": false },
    { "id": 10, "title": "daily journal", "description": "write down today’s reflections", "completed": true }
  ];

  const [todos, setTodos] = useState(dummyData);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-3">
        <div className="card-header bg-primary text-white text-center">
          <h3 className="mb-0">📋 List of Todos</h3>
        </div>
        <div className="card-body p-4">
          <table className="table table-bordered table-hover table-striped align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Todo Title</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id}>
                  <td className="text-center fw-bold">{index + 1}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td className="text-center">
                    {todo.completed ? (
                      <span className="badge bg-success">Completed</span>
                    ) : (
                      <span className="badge bg-danger">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListTodoComponent
