import React, { useEffect, useState } from 'react'
import { getAllTodos } from '../services/TodoService';

const ListTodoComponent = () => {
 

  const [todos, setTodos] = useState([]);

  useEffect(()=>{
listTodos()
  },[])

function listTodos(){
  getAllTodos().then((res)=>{
    setTodos(res.data);
  }).catch(error=>{
     console.error(error);
  })
}

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
