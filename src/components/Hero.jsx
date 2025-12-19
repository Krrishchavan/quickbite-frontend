import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Hero = () => {
    const { user } = useContext(AuthContext);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #ff6b35 0%, #f7931a 100%)',
            padding: '80px 20px',
            textAlign: 'center',
            color: '#fff',
            borderRadius: '0 0 24px 24px',
            marginBottom: '48px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative circles */}
            <div style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                top: '-100px',
                right: '-100px'
            }}></div>
            <div style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '50%',
                bottom: '-50px',
                left: '-50px'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    marginBottom: '20px',
                    fontWeight: '700',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    lineHeight: '1.2'
                }}>
                    🍕 Delicious Food, Delivered Fast
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    marginBottom: '36px',
                    opacity: 0.95,
                    maxWidth: '600px',
                    margin: '0 auto 36px'
                }}>
                    Order from your favorite local restaurants. Fresh, hot, and delivered to your doorstep.
                </p>

                {!user ? (
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            to="/register"
                            className="btn"
                            style={{
                                fontSize: '1.1rem',
                                padding: '16px 40px',
                                background: '#fff',
                                color: '#ff6b35',
                                boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                            }}
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="btn btn-outline"
                            style={{
                                fontSize: '1.1rem',
                                padding: '16px 40px',
                                borderColor: '#fff',
                                color: '#fff'
                            }}
                        >
                            Sign In
                        </Link>
                    </div>
                ) : (
                    <p style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                        Welcome back! Browse restaurants below 👇
                    </p>
                )}

                {/* Features */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    marginTop: '48px',
                    maxWidth: '800px',
                    margin: '48px auto 0'
                }}>
                    <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⚡</div>
                        <h4 style={{ marginBottom: '8px' }}>Fast Delivery</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>30 min average</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🍔</div>
                        <h4 style={{ marginBottom: '8px' }}>Quality Food</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Fresh ingredients</p>
                    </div>
                    <div>
                        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📍</div>
                        <h4 style={{ marginBottom: '8px' }}>Live Tracking</h4>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Real-time updates</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
