import React, { useState } from "react";
import {
  loginAPICall,
  savedLoggedInUser,
  storeToken,
} from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  async function handleLoginForm(e) {
    e.preventDefault();
    const login = { username, password };
    await loginAPICall(username, password)
      .then((response) => {
        console.log(response.data);
        //  const token='Basic ' + window.btoa(username + ":" + password);
        const token = "Bearer " + response.data.accessToken;
        const role=response.data.role;

        storeToken(token);
        savedLoggedInUser(username,role);
        navigator("/todos");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(login);
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Login</h3>
              <form onSubmit={(e) => handleLoginForm(e)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username or email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center mt-3 text-muted">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
