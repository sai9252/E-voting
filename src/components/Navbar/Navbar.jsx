import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex justify-between items-center">
                <li>
                    <Link to="/" className="text-white px-4 py-2 text-lg font-semibold">Home</Link>
                </li>
                {!user && (
                    <>
                        <li>
                            <Link to="/login" className="text-white px-4 py-2 text-lg">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup" className="text-white px-4 py-2 text-lg">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/admin-login" className="text-white px-4 py-2 text-lg">Admin Login</Link>
                        </li>
                    </>
                )}
                {user && user.role === 'user' && (
                    <>
                        <li>
                            <Link to="/vote" className="text-white px-4 py-2 text-lg">Vote</Link>
                        </li>
                        <li>
                            <Link to="/results" className="text-white px-4 py-2 text-lg">Results</Link>
                        </li>
                    </>
                )}
                {user && user.role === 'admin' && (
                    <>
                        <li>
                            <Link to="/add-candidates" className="text-white px-4 py-2 text-lg">Add Candidates</Link>
                        </li>
                        <li>
                            <Link to="/vote" className="text-white px-4 py-2 text-lg">Vote</Link>
                        </li>
                        <li>
                            <Link to="/results" className="text-white px-4 py-2 text-lg">Results</Link>
                        </li>
                    </>
                )}
                {user && (
                    <li>
                        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 text-lg rounded hover:bg-red-700">
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;