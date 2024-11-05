import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import video from "../components/3959035-uhd_4096_2160_25fps.mp4";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const role = data.userRole || 'User';
                console.log(role);
                localStorage.setItem('userRole', role);
                if (role === "Admin"){
                    navigate('/Dashboard')
                }
                alert(data.message);
                navigate('/Newspaper'); 
            } else {
                setErrorMessage(data.message || 'Sign-in failed');
            }
        } catch (error) {
            setErrorMessage('Sign-in failed. Please try again.');
        }
    };

    return (
        <div className="w-screen relative h-screen mt-0 overflow-hidden flex justify-center">
            <video className="absolute top-0 left-0 w-full h-full object-cover opacity-40" autoPlay loop muted>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative mt-16 p-6 rounded-lg w-1/4 bg-transparent h-2/5 text-xl">
                <h2 className="font-bold mb-6 text-center font-serif text-3xl">Sign In</h2>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-slate-50 font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border bg-transparent rounded-lg border-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-50 font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border bg-transparent border-none rounded-lg"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-red-950 hover:bg-rose-900 hover:border-red-950 text-white font-bold py-2 px-4 rounded-lg">
                            Sign In
                        </button>
                        <Link to="/register" className="text-gray-700 hover:text-gray-950">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
