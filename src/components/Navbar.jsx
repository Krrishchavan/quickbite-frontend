import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    🍕 QuickBite
                </Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            {user.role === 'customer' && (
                                <>
                                    <Link to="/">Restaurants</Link>
                                    <Link to="/cart" style={{ position: 'relative' }}>
                                        Cart
                                        {cart.length > 0 && (
                                            <span style={{
                                                position: 'absolute',
                                                top: '2px',
                                                right: '2px',
                                                background: '#ff6b35',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: '700'
                                            }}>
                                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                            </span>
                                        )}
                                    </Link>
                                    <Link to="/orders">Orders</Link>
                                </>
                            )}
                            {user.role === 'restaurant' && (
                                <Link to="/restaurant-dashboard">Dashboard</Link>
                            )}
                            {user.role === 'rider' && (
                                <Link to="/rider-dashboard">Dashboard</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{ marginLeft: '8px', padding: '8px 20px' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Sign In</Link>
                            <Link to="/register" className="btn" style={{ padding: '8px 20px' }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
