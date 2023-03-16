import React, { useState, useEffect } from 'react'; 
import { signOut } from 'firebase/auth';  
import './profile.css';  
// import { UserOutlined } from '@ant-design/icons';
// import { Avatar, Space } from 'antd';
import { auth } from '../config/fire';

const Profile   = () => { 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <>
          <img src="images/passport.jpg" alt="" />
{/* 
          <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size={64} icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>
    <Space wrap size={16}>
      <Avatar shape="square" size={64} icon={<UserOutlined />} />
      <Avatar shape="square" size="large" icon={<UserOutlined />} />
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar shape="square" size="small" icon={<UserOutlined />} />
    </Space>
  </Space> */}


          <p>{user.email}</p>

          <button onClick={logOut}>Logout</button>
        </>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default Profile;
