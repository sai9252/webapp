import React, { useState, useEffect } from 'react'
import "./Myprofile.css";
import { Card, Modal, Form, Input,message,Button } from 'antd';  // Assuming you are using Ant Design components
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


const { Meta } = Card;
const { TextArea } = Input;


const Myprofile = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userdata, setuserdata] = useState({})
    const [modalText, setModalText] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
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
        const token = localStorage.getItem("token")
  
        console.log('Success:', values);
        const res = await fetch('http://localhost:3001/editprofile', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json',                
      'x-token': token
    },
      body: JSON.stringify(values)
    })

    const data = await res.json();

    console.log(res.status)
    console.log(data)
    
    if (res.status === 200) {
        success(data?.message)
        setuserdata(values)
        handleUpdate('update is successful')
    } else {
      error(data?.message)
    }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const showModal = () => {
        setOpen(true);
    };

    const handleUpdate = (text) => {
        setModalText(text);
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setModalText("")
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };




    const getDataFromServer = async () => {

        const token = localStorage.getItem("token")

        const res = await fetch('http://localhost:3001/myprofile', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
        })


        const data = await res.json();

        console.log(res.status)
        console.log(data)
        form.setFieldValue("fullName",data?.user?.fullName)
        form.setFieldValue("email",data?.user?.email)
        form.setFieldValue("skills",data?.user?.skills)
        form.setFieldValue("about",data?.user?.about)
        setuserdata(data);
    };


    useEffect(() => {
        getDataFromServer()
    }, [userdata?.email])




    return (
        <div className='myprofile_main'>

            <Modal
                title="Edit your details correctly"

                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button form="basic" key="submit" htmlType="submit">
                        Update
                    </Button>
                    ]}
            >
                <p>{modalText}</p>

                {userdata && <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    style={{
                        maxWidth: 900,
                    }}
                    layout='vertical'

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Fullname"
                        name="fullName"
                    >
                        <Input placeholder="Enter your Fullname" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="Enter your Email" />
                    </Form.Item>

                    <Form.Item
                        label="About"
                        name="about">
                        <TextArea rows={4} placeholder='Enter your information' />
                    </Form.Item>

                    <Form.Item
                        label="Skills"
                        name="skills"
                    >
                        <Input placeholder="Enter your Skills" />
                    </Form.Item>
                </Form>}

            </Modal>


            <Card


                style={{
                    width: "90vw",
                    height: "90vh",
                    margin: "40px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-around",
                    border: "1px solid #000"
                }}
                cover={
                    <img className='myprofile_pic'
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <Meta
                    className='myprofile_data'
                    // avatar={<Avatar className='avatar' src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    description={
                        <div className='myprofile_action'>

                            <EditOutlined className='editchild' onClick={showModal} key="edit" />
                            <div className="card_desc">
                                <div style={{
                                    textAlign: "left"
                                }}>
                                    <strong style={{
                                        color: "black",
                                        fontSize: "40px",
                                    }}>
                                        {userdata?.user?.fullName}
                                    </strong>
                                </div>
                                <div>

                                    <p style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start'
                                    }}><p>EMAIL</p> - <span>{userdata?.user?.email}</span></p>
                                    <p style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start'
                                    }}><p>ABOUT</p> - <span>{userdata?.user?.about}</span></p>
                                    <p style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'start'
                                    }}><p>SKILLS</p> - <span>{userdata?.user?.skills}</span></p>
                                </div>
                                <Button onClick={()=>{
                                    localStorage.removeItem('token');
                                    navigate("/login")
                                }}>
                        Logout
                    </Button>
                            </div>
                        </div>
                    }
                />

            </Card>

        </div >
    )
}

export default Myprofile;