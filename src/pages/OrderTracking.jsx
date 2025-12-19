import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MapComponent from '../components/MapComponent';

const OrderTracking = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchOrders();

        // Refresh orders every 10 seconds
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const getStatusInfo = (status) => {
        const statuses = {
            pending: { label: 'Pending', emoji: '⏳', class: 'badge-pending' },
            preparing: { label: 'Preparing', emoji: '👨‍🍳', class: 'badge-preparing' },
            ready: { label: 'Ready', emoji: '✅', class: 'badge-ready' },
            out_for_delivery: { label: 'Out for Delivery', emoji: '🛵', class: 'badge-delivering' },
            delivered: { label: 'Delivered', emoji: '🎉', class: 'badge-delivered' }
        };
        return statuses[status] || statuses.pending;
    };

    if (loading) {
        return (
            <div className="loading">
                <div>
                    <div className="spinner"></div>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>
                📦 My Orders
            </h2>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📦</div>
                    <h3>No orders yet</h3>
                    <p style={{ marginBottom: '24px' }}>When you place an order, it will appear here.</p>
                    <button onClick={() => window.location.href = '/'} className="btn">
                        Start Ordering
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '24px' }}>
                    {orders.map(order => {
                        const statusInfo = getStatusInfo(order.status);
                        return (
                            <div key={order._id} className="card" style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#2c3e50' }}>
                                            Order #{order._id.slice(-6).toUpperCase()}
                                        </h4>
                                        <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                                            {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className={`badge ${statusInfo.class}`}>
                                        {statusInfo.emoji} {statusInfo.label}
                                    </span>
                                </div>

                                <div style={{
                                    background: '#f8f9fa',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    marginBottom: '16px'
                                }}>
                                    <div style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: '4px' }}>
                                        📍 Delivery Address
                                    </div>
                                    <div style={{ fontWeight: '500' }}>
                                        {order.deliveryAddress || 'Address not provided'}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <h5 style={{ marginBottom: '12px', color: '#2c3e50' }}>Items:</h5>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {order.items.map((item, idx) => (
                                            <li key={idx} style={{
                                                padding: '8px 0',
                                                borderBottom: idx < order.items.length - 1 ? '1px solid #e8ecef' : 'none',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}>
                                                <span>{item.name} × {item.quantity}</span>
                                                <span style={{ fontWeight: '600' }}>₹{item.price * item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '16px',
                                    background: '#f8f9fa',
                                    borderRadius: '8px',
                                    marginBottom: '20px'
                                }}>
                                    <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Total</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff6b35' }}>
                                        ₹{order.totalAmount}
                                    </span>
                                </div>

                                {/* Show Map for active orders */}
                                {order.status !== 'delivered' && (
                                    <div style={{ marginTop: '24px' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            marginBottom: '12px'
                                        }}>
                                            <div style={{ fontSize: '1.3rem' }}>📍</div>
                                            <h5 style={{ margin: 0, color: '#2c3e50' }}>Live Tracking</h5>
                                        </div>
                                        <MapComponent status={order.status} />

                                        {/* Progress Timeline */}
                                        <div style={{ marginTop: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                                <div style={{ textAlign: 'center', opacity: order.status === 'pending' || order.status === 'preparing' || order.status === 'ready' || order.status === 'out_for_delivery' || order.status === 'delivered' ? 1 : 0.3 }}>
                                                    <div style={{ fontSize: '1.5rem' }}>✓</div>
                                                    <div>Ordered</div>
                                                </div>
                                                <div style={{ textAlign: 'center', opacity: order.status === 'preparing' || order.status === 'ready' || order.status === 'out_for_delivery' || order.status === 'delivered' ? 1 : 0.3 }}>
                                                    <div style={{ fontSize: '1.5rem' }}>👨‍🍳</div>
                                                    <div>Preparing</div>
                                                </div>
                                                <div style={{ textAlign: 'center', opacity: order.status === 'ready' || order.status === 'out_for_delivery' || order.status === 'delivered' ? 1 : 0.3 }}>
                                                    <div style={{ fontSize: '1.5rem' }}>📦</div>
                                                    <div>Ready</div>
                                                </div>
                                                <div style={{ textAlign: 'center', opacity: order.status === 'out_for_delivery' || order.status === 'delivered' ? 1 : 0.3 }}>
                                                    <div style={{ fontSize: '1.5rem' }}>🛵</div>
                                                    <div>On the way</div>
                                                </div>
                                                <div style={{ textAlign: 'center', opacity: order.status === 'delivered' ? 1 : 0.3 }}>
                                                    <div style={{ fontSize: '1.5rem' }}>🎉</div>
                                                    <div>Delivered</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
