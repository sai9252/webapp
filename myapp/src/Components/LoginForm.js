
import React from 'react';
import { Button, Checkbox, Form, Input,message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
// import 'antd/dist/antd.css'; 
import "./LoginForm.css";

const LoginForm = () => {

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

      const res = await fetch('http://localhost:3001/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      })

      const Data = await res.json();

      console.log(res.status);
      console.log(Data);

      if (res.status === 200) {
        success(Data?.message)
        const token = Data?.token;
        console.log(token)
        localStorage.setItem('token',token);
        navigate("/myprofile")
      } else {
        error(Data?.message)
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);


    };

    return (
      <div className="container">
        {contextHolder}
        <div className="form-hold">

          <h1>Login to your account</h1>
          <h4>Lets start our journey</h4>

          <Form
            name="loginForm"
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
              name="remember"
              valuePropName="checked"
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column"
              }}


            >
              <Checkbox >Remember me</Checkbox>

              <Link className="login-form-forgot" href="./LoginForm">
                Forgot password
              </Link>


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
                }} type="primary" htmlType="submit" >
                Login
              </Button>
            </Form.Item>


            <p>Don't have an account - <Link to='/register'>Register here</Link></p>
          </Form>

        </div>
      </div>
    );
  };
export default LoginForm;
