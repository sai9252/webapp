import React from 'react';
import { Card, Avatar ,Button } from 'antd';  // Assuming you are using Ant Design components
import './Allprofiles.css';
import { EditOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Allprofiles = () => {

    const onFinish = async () => {

        const token = localStorage.getItem("token")

        const res = await fetch('http://localhost:3001/allprofiles', {
            method: "GET",
            headers: { 'Content-Type': 'application/json',
            'x-token':token
        },
        })
         

        const data = await res.json();

        console.log(res.status)
        console.log(data)


    };


    return (
        <div className='allprofiles_main'>


<Button type="primary"  onClick={() => onFinish()} >
          Click me!
        </Button>
        
            <Card
            
            
                style={{
                    width: "100vh",
                    height: "25%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-around",
                    border: "1px solid #000"
                }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <EditOutlined key="edit" />,
                ]}
                layout="horizontal"
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
            

        </div>
    )
};

export default Allprofiles;
