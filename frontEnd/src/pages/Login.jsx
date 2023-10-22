import React from "react";
import { Form, Input,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {

  const navigate=useNavigate();
  const loginHandle=async(values)=>{
    
  try{  
    
    const {data}=await axios.post('http://127.0.0.1:3000/users/loginUser',values);
    message.success("Login successful");
    localStorage.setItem('user',JSON.stringify({...data,password:''}));
    navigate('/');

    
    console.log(values)
  }
  catch(err){
    console.log(err);
    message.error("Something went wrong");
  }
  
  }



  return (
    <div className="register-page">
      <Form layout="vertical" onFinish={loginHandle}>
        <h2>Login Page</h2>
        <Form.Item label="Email" name="email" rules={[{required:true,message:"Please enter your email"}]}>
          <Input type="email" placeholder="Please enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{required:true,message:"Please enter your password"}]}>
          <Input type="password" placeholder="Please enter your password" />
        </Form.Item>
        <div className="d-flex justify-content-between">
          <Link to="/register">Not a user ? Click here to register</Link>
          <button className="btn btn-primary">Login</button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
