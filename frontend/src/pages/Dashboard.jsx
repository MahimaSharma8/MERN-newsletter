import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import MenuList from "../components/MenuList";
import ToggleThemeButton from "../components/ToggleThemeButton";
import Barchart from "../components/Barchart";
import Linechart from "../components/Linechart";
import Donutchart from "../components/Donutchart";

const { Header, Sider, Content } = Layout;

function Dashboard() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/users'); 
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    setUsers(data); 
                } else {
                    console.error("Data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
    const handledelete = async(author) =>
    {
        try
        {
        const response = await fetch(`http://localhost:5000/users/${author}`,{
        method: 'DELETE',
        });
        if (response.ok) {
            const data = await response.json()
            console.log(data.message);
            alert("User's Article Deleted Successfully");
            // Refresh the users list
            const updatedUsers = users.filter(user => user.Author !== author);
            setUsers(updatedUsers);
        }
    }
        catch (error) {
            console.error("Error:", error);
            alert("An error occurred while trying to delete the user.");
        }

    }

    return (
        <Layout style={{ minHeight: "100vh", width: "auto" }}>
            <Sider theme={darkTheme ? 'dark' : 'light'} className="sidebar">
                <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                <MenuList darkTheme={darkTheme} />
            </Sider>
            <Layout>
                <Header style={{ background: darkTheme ? '#001529' : '#fff', padding: 0 }}>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: darkTheme ? '#001529' : '#fff', color: darkTheme ? '#fff' : '#001529' }}>
                    <div className="flex flex-wrap justify-between">
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <Barchart />
                            <h1 className="font-mono text-2xl ml-36 mt-0 mb-10 ">Articles vs Likes</h1>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <Linechart />
                            <h1 className="font-mono text-2xl ml-36 mt-4 mb-10 ">Author vs Likes</h1>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <Donutchart />
                            <h1 className="font-mono text-2xl ml-36 mt-0 mb-10 ">Word Count</h1>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <h1 className="font-mono text-2xl text-center">Users</h1>
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className={`${darkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-mono text-2xl">Author</th>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600  font-mono text-2xl">Email</th>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600  font-mono text-2xl">Headline</th>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600  font-mono text-2xl"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className={`${darkTheme ? 'bg-gray-800 text-white hover:bg-gray-200  font-mono' : 'bg-gray-100 text-black hover:bg-gray-200  font-mono'}`}>
                                            <td className="py-2 px-4 border-b border-gray-300  font-mono text-xl">{user.Author}</td>
                                            <td className="py-2 px-4 border-b border-gray-300  font-mono text-xl">{user.email}</td>
                                            <td className="py-2 px-4 border-b border-gray-300  font-mono text-xl">{user.headline}</td>
                                            <button className="bg-red-900 text-white text-l pl-3 pr-3 pt-2 pb-2" onClick={() => handledelete(user.Author)} >X</button>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
