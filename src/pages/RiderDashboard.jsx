import React, { useState, useEffect } from 'react';
import api from '../services/api';

const RiderDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get('/orders/my');
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div>
                    <div className="spinner"></div>
                    <p>Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>
                🛵 Rider Dashboard
            </h2>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛵</div>
                    <h3>No available orders</h3>
                    <p style={{ marginBottom: '12px' }}>Orders appear here when restaurants mark them as "Ready for Pickup".</p>
                    <div style={{
                        background: '#fff3e0',
                        padding: '16px',
                        borderRadius: '8px',
                        maxWidth: '500px',
                        margin: '24px auto',
                        textAlign: 'left'
                    }}>
                        <strong style={{ display: 'block', marginBottom: '8px' }}>How it works:</strong>
                        <ol style={{ margin: 0, paddingLeft: '20px' }}>
                            <li>Customer places an order</li>
                            <li>Restaurant prepares the food</li>
                            <li>Restaurant marks order as "Ready"</li>
                            <li>Order appears here for you to deliver</li>
                        </ol>
                    </div>
                    <button onClick={() => fetchOrders()} className="btn" style={{ marginTop: '16px' }}>
                        🔄 Refresh
                    </button>
                </div>
            ) : (
                <div className="grid">
                    {orders.map(order => (
                        <div key={order._id} className="card">
                            <div style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: '#fff',
                                padding: '16px',
                                margin: '-24px -24px 20px',
                                borderRadius: '10px 10px 0 0'
                            }}>
                                <h4 style={{ fontSize: '1.3rem', marginBottom: '4px' }}>
                                    Order #{order._id.slice(-6).toUpperCase()}
                                </h4>
                                <span style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    fontWeight: '600'
                                }}>
                                    {order.status.replace('_', ' ').toUpperCase()}
                                </span>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: '8px',
                                    marginBottom: '12px'
                                }}>
                                    <div style={{ fontSize: '1.2rem', marginTop: '4px' }}>📍</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>Delivery Address</div>
                                        <div style={{ fontWeight: '600', marginTop: '4px', lineHeight: '1.5' }}>
                                            {order.deliveryAddress || 'Address not provided'}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    background: '#f8f9fa',
                                    padding: '12px',
                                    borderRadius: '6px'
                                }}>
                                    <div style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '4px' }}>
                                        Total Amount
                                    </div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff6b35' }}>
                                        ₹{order.totalAmount}
                                    </div>
                                </div>
                            </div>

                            {order.status === 'ready' && (
                                <button
                                    className="btn"
                                    style={{ width: '100%' }}
                                    onClick={() => updateStatus(order._id, 'out_for_delivery')}
                                >
                                    🚀 Accept & Deliver
                                </button>
                            )}
                            {order.status === 'out_for_delivery' && (
                                <button
                                    className="btn"
                                    style={{ width: '100%', background: '#27ae60' }}
                                    onClick={() => updateStatus(order._id, 'delivered')}
                                >
                                    ✓ Mark as Delivered
                                </button>
                            )}
                            {order.status === 'delivered' && (
                                <div style={{
                                    background: '#d4edda',
                                    color: '#155724',
                                    padding: '12px',
                                    borderRadius: '6px',
                                    textAlign: 'center',
                                    fontWeight: '600'
                                }}>
                                    ✓ Delivery Complete
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RiderDashboard;
