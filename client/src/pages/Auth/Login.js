import axios from "axios";
import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { useAuth } from "../../context/auth";
import "../../styles/AuthStyles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before each submit

    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email: email,
        password
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        setError(res.data.message); // Set the error message if response is not successful
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong"); // Set a generic error message in case of any error
    }
  };

  return (
    <Layout title="Login - Printify">
      <div className='form-container'>
        <h1>Login Form</h1>
        {error && <div className="error-message">{error}</div>} {/* Display error if present */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control" 
              id="exampleInputEmail" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control" 
              id="exampleInputPassword1" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>
              Forgot Password
            </button>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login;
