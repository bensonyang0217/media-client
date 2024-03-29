import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles.css";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginUrl =
    "https://media-api-v2-f4hfj5ldpa-de.a.run.app/api/user/token";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(loginUrl, {
        username,
        password,
      });
      var token = response.data.token;
      if (token === "Invalid username/password") {
        const errorMessage = "Login failed!";
        setError(errorMessage);
        setIsLoading(false);
        return;
      }
      //   console.log(response.data.token);
      localStorage.setItem("token", response.data.token); // 儲存接收到的 token
      navigate("/media");
      // 導航到應用的受保護區域
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Login failed!";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <p className="signup-link">
          <Link to="/register">Sign up</Link>
        </p>
        <button type="submit">Login</button>
        {error && <div className="error-message">{error}</div>}{" "}
        {/* 显示错误信息 */}
      </form>
    </div>
  );
};

export default LoginForm;
