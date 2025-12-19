import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLanding = () => {
    return (
        <div className="container" style={{ maxWidth: '1000px', marginTop: '60px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '12px' }}>
                    Join QuickBite Today
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
                    Choose your role and get started in minutes
                </p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <div className="card" style={{
                    padding: '40px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.borderColor = '#ff6b35';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                    }}
                >
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        👤
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Customer</h3>
                    <p style={{ margin: '0 0 24px', color: '#6c757d' }}>
                        Order delicious food from local restaurants and track delivery in real-time.
                    </p>
                    <Link to="/register/customer" className="btn" style={{ width: '100%' }}>
                        Sign up as Customer
                    </Link>
                </div>

                <div className="card" style={{
                    padding: '40px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '2px solid #ff6b35'
                }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 53, 0.2)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
                    }}
                >
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                    }}>
                        🍕
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Restaurant</h3>
                    <p style={{ margin: '0 0 24px', color: '#6c757d' }}>
                        Grow your business, manage orders, and reach more hungry customers.
                    </p>
                    <div style={{
                        background: '#fff3e0',
                        padding: '8px',
                        borderRadius: '6px',
                        marginBottom: '16px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: '#ff6b35'
                    }}>
                        ⭐ Most Popular
                    </div>
                    <Link to="/register/restaurant" className="btn" style={{ width: '100%' }}>
                        Partner with Us
                    </Link>
                </div>

                <div className="card" style={{
                    padding: '40px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.borderColor = '#ff6b35';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                    }}
                >
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        🛵
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Delivery Rider</h3>
                    <p style={{ margin: '0 0 24px', color: '#6c757d' }}>
                        Earn money on your schedule by delivering food to happy customers.
                    </p>
                    <Link to="/register/rider" className="btn btn-outline" style={{ width: '100%' }}>
                        Join as Rider
                    </Link>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #e8ecef' }}>
                <p style={{ color: '#6c757d' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#ff6b35', fontWeight: '600' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterLanding;
