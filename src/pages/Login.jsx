import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const role = await login(email, password);
            // Redirect based on role
            if (role === 'restaurant') navigate('/restaurant-dashboard');
            else if (role === 'rider') navigate('/rider-dashboard');
            else navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    // Quick login helpers
    const quickLogin = (email, password) => {
        setEmail(email);
        setPassword(password);
    };

    return (
        <div className="container" style={{ maxWidth: '480px', marginTop: '60px', marginBottom: '60px' }}>
            <div className="card" style={{ padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px' }}>
                        Welcome Back!
                    </h2>
                    <p style={{ color: '#6c757d' }}>Sign in to continue to QuickBite</p>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        style={{ width: '100%', marginTop: '8px' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid #e8ecef',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#6c757d', marginBottom: '16px' }}>Demo Accounts (Quick Login)</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => quickLogin('customer@example.com', 'password123')}
                            style={{
                                padding: '8px 16px',
                                border: '2px solid #e8ecef',
                                borderRadius: '6px',
                                background: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}
                        >
                            👤 Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => quickLogin('pizza@example.com', 'password123')}
                            style={{
                                padding: '8px 16px',
                                border: '2px solid #e8ecef',
                                borderRadius: '6px',
                                background: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}
                        >
                            🍕 Restaurant
                        </button>
                        <button
                            type="button"
                            onClick={() => quickLogin('rider@example.com', 'password123')}
                            style={{
                                padding: '8px 16px',
                                border: '2px solid #e8ecef',
                                borderRadius: '6px',
                                background: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}
                        >
                            🛵 Rider
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <p style={{ color: '#6c757d' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: '#ff6b35', fontWeight: '600' }}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
