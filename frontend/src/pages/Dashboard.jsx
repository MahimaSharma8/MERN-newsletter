import React, { useState, useEffect } from "react";
import { Layout, Modal, Button } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import MenuList from "../components/MenuList";
import ToggleThemeButton from "../components/ToggleThemeButton";
import Barchart from "../components/Barchart";
import Linechart from "../components/Linechart";
import Donutchart from "../components/Donutchart";

const { Header, Sider, Content } = Layout;

function Dashboard() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

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

    const handleDelete = async (author) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${author}`, { method: 'DELETE' });
            if (response.ok) {
                const updatedUsers = users.filter(user => user.Author !== author);
                setUsers(updatedUsers);
                alert("User's Article Deleted Successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while trying to delete the user.");
        }
    };

    const handleShowModal = (article) => {
        setSelectedArticle(article);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedArticle(null);
    };
    const handleVerifyArticle = async () => {
        if (!selectedArticle) return;

        try {
            const response = await fetch('http://localhost:5000/api/articles1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedArticle),
            });

            if (response.ok) {
                alert("Article Verified Successfully");
                setIsModalVisible(false);
            } else {
                alert("Failed to verify the article.");
            }
        } catch (error) {
            console.error("Error verifying article:", error);
            alert("An error occurred while verifying the article.");
        }
    };
    


    return (
        <Layout style={{ minHeight: "100vh", width: "auto" }}>
            <Sider theme={darkTheme ? 'dark' : 'light'} className="sidebar">
                <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                <MenuList darkTheme={darkTheme} />
            </Sider>
            <Layout>
                <Header style={{ background: darkTheme ? '#001529' : '#fff', padding: 0 }} />
                <Content style={{ margin: '24px 16px', padding: 24, background: darkTheme ? '#001529' : '#fff', color: darkTheme ? '#fff' : '#001529' }}>
                    <div className="flex flex-wrap justify-between">
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <Barchart />
                            <h1 className="font-mono text-2xl ml-36 mt-0 mb-10">Articles vs Likes</h1>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <Linechart />
                            <h1 className="font-mono text-2xl ml-36 mt-4 mb-10">Author vs Likes</h1>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <Donutchart />
                            <h1 className="font-mono text-2xl ml-36 mt-0 mb-10">Word Count</h1>
                        </div>
                        <div style={{ flex: 1, padding: '0 16px' }}>
                            <h1 className="font-mono text-2xl text-center">Users</h1>
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className={`${darkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-mono text-2xl">Author</th>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-mono text-2xl">Email</th>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-mono text-2xl">Headline</th>
                                        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600 font-mono text-2xl"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className={`${darkTheme ? 'bg-gray-800 text-white hover:bg-gray-200 font-mono' : 'bg-gray-100 text-black hover:bg-gray-200 font-mono'}`}>
                                            <td className="py-2 px-4 border-b border-gray-300 font-mono text-xl">{user.Author}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 font-mono text-xl">{user.email}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 font-mono text-xl">{user.headline}</td>
                                            <td className="py-2 px-4 border-b border-gray-300">
                                                <button className="bg-blue-500 text-white px-3 py-2" onClick={() => handleShowModal(user)}>View</button>
                                                <button className="bg-red-900 text-white text-l pl-3 pr-3 pt-2 pb-2" onClick={() => handleDelete(user.Author)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {selectedArticle && (
                        <Modal visible={isModalVisible} onCancel={handleCloseModal} footer={null} title="Article Details">
                            <div className="grid grid-cols-1">
                                <div id={selectedArticle.headline} key={selectedArticle.Article_id} className="mb-4 pb-0 pr-4 border-r-4 border-black">
                                    <hr className="m-auto my-4 w-[100%] border-2 border-black" />
                                    <h2 className="text-3xl font-bold mb-4 text-center">{selectedArticle.headline || `Article ${idx + 1}`}</h2>
                                    <hr className="m-auto my-1 w-[100%] border-2 border-black" />
                                    <div className="flex flex-col md:flex-row items-start">
                                        {selectedArticle.Photos && selectedArticle.Photos[0] && (
                                            <img
                                                src={selectedArticle.Photos[0]}
                                                className="w-72 grayscale hover:grayscale-0 transition-all duration-300 mb-5 h-40"
                                            />
                                        )}
                                        <div className="ml-4">
                                            {selectedArticle.Textcontent && selectedArticle.Textcontent[0] && (
                                                <p className="font-sans text-sm first-letter:font-serif first-letter:text-3xl">
                                                    {selectedArticle.Textcontent[0]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        {selectedArticle.Textcontent && selectedArticle.Textcontent[1] && (
                                            <p className="font-sans text-sm">{selectedArticle.Textcontent[1]}</p>
                                        )}
                                        {selectedArticle.Photos && selectedArticle.Photos[1] && (
                                            <img
                                                src={selectedArticle.Photos[1]}
                                                className="w-72 grayscale hover:grayscale-0 transition-all duration-300 h-40"
                                            />
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold text-right font-serif">Author: {selectedArticle.Author}</h2>
                                </div>
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    onClick={handleVerifyArticle}
                                    style={{ marginTop: 16 }}
                                >
                                    Verify
                                </Button>
                            </div>
                        </Modal>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
