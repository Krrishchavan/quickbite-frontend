import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { AuthContext } from '../context/AuthContext';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await api.get('/restaurants');
                setRestaurants(res.data);
            } catch (err) {
                console.error('Error fetching restaurants', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    if (loading) {
        return (
            <>
                {!user && <Hero />}
                <div className="loading">
                    <div>
                        <div className="spinner"></div>
                        <p>Loading delicious options...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div>
            {!user && <Hero />}
            <div className="container" style={{ paddingTop: user ? '40px' : '0' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '12px', color: '#2c3e50' }}>
                        {user ? '🍽️ Browse Restaurants' : 'Popular Restaurants'}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#6c757d' }}>
                        Choose from our selection of {restaurants.length} amazing local restaurants
                    </p>
                </div>

                {restaurants.length === 0 ? (
                    <div className="empty-state">
                        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏪</div>
                        <h3>No restaurants available yet</h3>
                        <p>Check back soon for amazing food options!</p>
                    </div>
                ) : (
                    <div className="grid">
                        {restaurants.map((rest) => (
                            <div
                                key={rest._id}
                                className="card"
                                style={{
                                    padding: '0',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    overflow: 'hidden'
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
                                }}
                            >
                                {rest.image ? (
                                    <img
                                        src={rest.image}
                                        alt={rest.name}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x200/ff6b35/ffffff?text=Restaurant';
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: '100%',
                                        height: '200px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#fff',
                                        fontSize: '3rem'
                                    }}>
                                        🍴
                                    </div>
                                )}

                                <div style={{ padding: '20px' }}>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '8px',
                                        color: '#2c3e50'
                                    }}>
                                        {rest.name}
                                    </h3>
                                    <p style={{
                                        color: '#6c757d',
                                        marginBottom: '16px',
                                        fontSize: '0.95rem'
                                    }}>
                                        ⭐ 4.5 • 20-30 min • Fresh & Local
                                    </p>
                                    <Link
                                        to={`/menu/${rest._id}`}
                                        className="btn"
                                        style={{
                                            width: '100%',
                                            textAlign: 'center',
                                            padding: '12px'
                                        }}
                                    >
                                        View Menu →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
