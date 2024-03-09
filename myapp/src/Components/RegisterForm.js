import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
// import 'antd/dist/antd.css'; 
import { Link } from "react-router-dom";
// import axios from "axios";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };

  const error = (msg) => {
    messageApi.open({
      type: 'error',
      content: msg,
    });
  };

  const onFinish = async (values) => {
    console.log('Success:', values);

    // Add your form submission logic here

    const res = await fetch('http://localhost:3001/register', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    const data = await res.json();

    console.log(res.status)
    console.log(data)

    if (res.status === 200) {
      success(data?.message)
      navigate("/login")
    } else {
      error(data?.message)
    }

    // Add your form submission logic here

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);


  };

  return (
    <div className="container">
      {contextHolder}
      <div className="form-hold">

        <h1>Create your account</h1>
        <h4>Start accessing our new learning app</h4>

        <Form
          name="registrationForm"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 32,
          }}
          style={{
            // maxWidth: 600,
            // border: "2px solid #000",
            // marginInline:"auto"
          }}
          layout="vertical"

          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >


          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not a valid email address!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>

          <Form.Item
            label="FullName"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Please input your Fullname!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder='FullName' />
          </Form.Item>


          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Password' />

          </Form.Item>

          <Form.Item
            label=" ConfirmPassword"
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: 'Please input your Confirmpassword!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='ConfirmPassword' />

          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 32,
            }}

          >
            <Button
              style={{
                width: "150px",
                marginInline: "auto",
                padding: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>


          <p>Already have an account? <Link to='/login'>Login here</Link></p>
        </Form>

      </div>
    </div>
  );
};

export default RegisterForm;
