import axios from "axios";
import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import "../../styles/AuthStyles.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', {
        name: name,
      email: email,
      password,
      phone: phone,
      address: address}); 
        
        if (res.data.success){
            toast.success(res.data.message)
            navigate("/login");
        }else{
            toast.error(res.data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Printify">
    <div className='form-container'>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className= "form-control" id="exampleInputName" placeholder="Enter your name" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter your email" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Enter your password" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputName" placeholder="Enter Phone no." required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputName" className="form-label">Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputName" placeholder="Enter your Address" required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </div>
    </Layout>
  )
}

export default Register