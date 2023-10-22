import React from "react";
import { Form, Input,message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
const navigate = useNavigate();
  const registerHandle=async(values)=>{
    try{
      console.log(values)
     await axios.post('http://127.0.0.1:3000/users/registerUser',values);
     
      message.success("Registration Successfully");
      navigate('/login');

    }catch(err){
      console.log(err.response.data.error);
      message.error(err.response.data.error);
    }
    
  }
  return (
    <div className="register-page">
      <Form layout="vertical" onFinish={registerHandle}>
        <h2>Register Form</h2>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your name" }]}
         
         >
          <Input maxLength={30} placeholder="Please enter your name"/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="email" placeholder="Please enter your email" />
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please enter your mobile number" },
          ]}
        >
          <Input type="number" maxLength={10} placeholder="Please enter your mobile number" />
        </Form.Item>

        <Form.Item label="Password" name="password"  rules={[
            { required: true, message: "Please enter your password" },
          ]}>
          <Input type="password" placeholder="Please enter your password"/>
        </Form.Item>

        <div className="d-flex justify-content-between">
          <Link to="/login">Already Register? Click here to login</Link>
          <button className="btn btn-primary">Register</button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
