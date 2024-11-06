import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";


function User() {
    const email = localStorage.getItem("email");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${email}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("Data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [email]);

    const handleView = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${userId}`, { method: 'DELETE' });
            if (response.ok) {
                setUsers(users.filter(user => user._id !== userId));
                alert("User deleted successfully");
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while trying to delete the user.");
        }
    };

    const columns = [
        {
            title: "Headline",
            dataIndex: "headline",
            key: "headline",
        },
        {
            title: "Status",
            dataIndex: "verified",
            key: "status",
            render: (verified) => (
                <span>{verified ? "Verified" : "Not Verified"}</span>
            ),
        },
        {
            title: "View",
            key: "view",
            render: (text, user) => (
                <Button type="primary" className="bg-red-600 hover:!bg-red-800 hover:!border-none" onClick={() => handleView(user)}>
                    View
                </Button>
            ),
        },
        {
            title: "Delete",
            key: "delete",
            render: (text, user) => (
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(user._id)}
                    className="border-none"
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="bg-red-950 w-screen h-screen">
            <h1 className="text-center">Your Articles</h1>
            <Table
                columns={columns}
                dataSource={users}
                loading={loading}
                rowKey="_id"
            />

            {selectedUser && (
                <Modal
                    title="User Details"
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                >
                    <p><strong>Headline:</strong> {selectedUser.headline}</p>
                    <p><strong>Status:</strong> {selectedUser.verified ? "Verified" : "Not Verified"}</p>
                    <p><strong>Author:</strong> {selectedUser.Author}</p>
                </Modal>
            )}
                                {selectedUser && (
                        <Modal visible={isModalVisible} onCancel={handleCloseModal} footer={null}>
                            <div className="grid grid-cols-1">
                                <div id={selectedUser.headline} key={selectedUser.Article_id} className="mb-4 pb-0 pr-4 border-r-4 border-black">
                                    <hr className="m-auto my-4 w-[100%] border-2 border-black" />
                                    <h2 className="text-3xl font-bold mb-4 text-center">{selectedUser.headline || `Article ${idx + 1}`}</h2>
                                    <hr className="m-auto my-1 w-[100%] border-2 border-black" />
                                    <div className="flex flex-col md:flex-row items-start">
                                        {selectedUser.Photos && selectedUser.Photos[0] && (
                                            <img
                                                src={selectedUser.Photos[0]}
                                                className="w-72 grayscale hover:grayscale-0 transition-all duration-300 mb-5 h-40"
                                            />
                                        )}
                                        <div className="ml-4">
                                            {selectedUser.Textcontent && selectedUser.Textcontent[0] && (
                                                <p className="font-sans text-sm first-letter:font-serif first-letter:text-3xl">
                                                    {selectedUser.Textcontent[0]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        {selectedUser.Textcontent && selectedUser.Textcontent[1] && (
                                            <p className="font-sans text-sm">{selectedUser.Textcontent[1]}</p>
                                        )}
                                        {selectedUser.Photos && selectedUser.Photos[1] && (
                                            <img
                                                src={selectedUser.Photos[1]}
                                                className="w-72 grayscale hover:grayscale-0 transition-all duration-300 h-40"
                                            />
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold text-right font-serif">Author: {selectedUser.Author}</h2>
                                </div>
                            </div>
                        </Modal>
                    )}
        </div>
    );
}

export default User;
