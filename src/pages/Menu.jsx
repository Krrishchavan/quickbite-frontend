import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const Menu = () => {
    const { restaurantId } = useParams();
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [restaurantName, setRestaurantName] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await api.get(`/menus/${restaurantId}`);
                setMenu(res.data);

                // Also fetch restaurant details
                const restRes = await api.get('/restaurants');
                const restaurant = restRes.data.find(r => r._id === restaurantId);
                if (restaurant) setRestaurantName(restaurant.name);
            } catch (err) {
                console.error('Error fetching menu', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [restaurantId]);

    if (loading) {
        return (
            <div className="loading">
                <div>
                    <div className="spinner"></div>
                    <p>Loading menu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <div style={{ marginBottom: '40px' }}>
                <Link to="/" style={{ color: '#6c757d', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '16px' }}>
                    ← Back to Restaurants
                </Link>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px' }}>
                    {restaurantName || 'Menu'}
                </h2>
                <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                    {menu.length} items available
                </p>
            </div>

            {menu.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🍽️</div>
                    <h3>No menu items yet</h3>
                    <p>This restaurant is updating their menu. Check back soon!</p>
                </div>
            ) : (
                <div className="grid">
                    {menu.map((item) => (
                        <div key={item._id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x180/ff6b35/ffffff?text=Food';
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '180px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem'
                                }}>
                                    🍴
                                </div>
                            )}

                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#2c3e50' }}>
                                    {item.name}
                                </h3>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '16px'
                                }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff6b35' }}>
                                        ₹{item.price}
                                    </span>
                                    <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                        ⭐ 4.5
                                    </span>
                                </div>
                                <button
                                    className="btn"
                                    style={{ width: '100%' }}
                                    onClick={() => {
                                        addToCart({ ...item, restaurantId });
                                        // Show a quick feedback
                                        const btn = event.target;
                                        const originalText = btn.textContent;
                                        btn.textContent = '✓ Added!';
                                        btn.style.backgroundColor = '#27ae60';
                                        setTimeout(() => {
                                            btn.textContent = originalText;
                                            btn.style.backgroundColor = '';
                                        }, 1000);
                                    }}
                                >
                                    Add to Cart +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
