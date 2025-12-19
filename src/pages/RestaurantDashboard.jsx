import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const RestaurantDashboard = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', price: '', image: '' });
    const [adding, setAdding] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, [user]);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/my');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setAdding(true);
        setMessage('');
        try {
            await api.post('/menus', newItem);
            setMessage('✓ Menu item added successfully!');
            setNewItem({ name: '', price: '', image: '' });
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
            setMessage('Failed to add item. Please try again.');
        } finally {
            setAdding(false);
        }
    };

    const updateStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>
                🍽️ Restaurant Dashboard
            </h2>

            <div className="card" style={{ marginBottom: '40px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>➕ Add Menu Item</h3>
                {message && (
                    <div className={message.includes('✓') ? 'success-msg' : 'error-msg'}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleAddItem}>
                    <div className="form-group">
                        <label>Item Name *</label>
                        <input
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            placeholder="e.g., Margherita Pizza"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price (₹) *</label>
                        <input
                            type="number"
                            value={newItem.price}
                            onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                            placeholder="299"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="url"
                            value={newItem.image}
                            onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <button type="submit" className="btn" disabled={adding}>
                        {adding ? 'Adding...' : '➕ Add Item'}
                    </button>
                </form>
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>📋 Incoming Orders</h3>
            {orders.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📦</div>
                    <h3>No orders yet</h3>
                    <p>When customers place orders, they'll appear here.</p>
                </div>
            ) : (
                <div className="grid">
                    {orders.map(order => (
                        <div key={order._id} className="card">
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>
                                Order #{order._id.slice(-6).toUpperCase()}
                            </h4>
                            <div style={{
                                background: '#f8f9fa',
                                padding: '12px',
                                borderRadius: '6px',
                                marginBottom: '16px'
                            }}>
                                <strong>Status:</strong> {order.status}
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '16px' }}>
                                {order.items.map((i, idx) => (
                                    <li key={idx} style={{ padding: '6px 0', borderBottom: '1px solid #e8ecef' }}>
                                        {i.name} × {i.quantity}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {order.status === 'pending' && (
                                    <button
                                        className="btn"
                                        style={{ flex: 1 }}
                                        onClick={() => updateStatus(order._id, 'preparing')}
                                    >
                                        👨‍🍳 Start Preparing
                                    </button>
                                )}
                                {order.status === 'preparing' && (
                                    <button
                                        className="btn"
                                        style={{ flex: 1 }}
                                        onClick={() => updateStatus(order._id, 'ready')}
                                    >
                                        ✅ Mark Ready
                                    </button>
                                )}
                                {order.status === 'ready' && (
                                    <div style={{
                                        background: '#d4edda',
                                        color: '#155724',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        textAlign: 'center',
                                        fontWeight: '600',
                                        flex: 1
                                    }}>
                                        ✓ Ready for Pickup
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantDashboard;
