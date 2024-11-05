import React  from 'react'
import { Menu } from 'antd'
import { Link } from "react-router-dom";
import {HeartOutlined, UserOutlined, HomeOutlined, FileDoneOutlined} from '@ant-design/icons';
const MenuList = ({darkTheme}) => {
    return (
        <Menu theme= {darkTheme ? 'dark' : 'light'} mode="inline" className='menu-bar text-2xl pr-6  h-screen flex flex-col items-center justify-center'>
            <Link to="/Dashboard">
            <Menu.Item key='home' icon={<HomeOutlined />}>
                Home
            </Menu.Item>
            </Link>
            <Link to="/Bar">
            <Menu.Item key='Likes' icon={<HeartOutlined />}>
            Likes
            </Menu.Item>
            </Link>
            <Link to = "/Line">
            <Menu.Item key='Author' icon={<UserOutlined />}>
            Author
            </Menu.Item>
            </Link>
            <Link to = "/Donut">
            <Menu.Item key='Words' icon={<FileDoneOutlined />}>
            Words
            </Menu.Item>
            </Link>
        </Menu>
    );
};

export default MenuList;