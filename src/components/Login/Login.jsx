// Login.js
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        aadhar: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                // Redirect to dashboard or home page
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-orange-500">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form id="loginForm" className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="aadhar"
                        placeholder="Aadhar Number"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.aadhar}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="w-full p-3 bg-pink-500 text-white font-bold rounded hover:bg-pink-600">
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Dont have an account?{' '}
                    <Link to="/register" className="text-pink-500 font-bold hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;