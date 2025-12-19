import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [placing, setPlacing] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;

        if (!deliveryAddress.trim()) {
            setError('Please enter your delivery address');
            return;
        }

        setPlacing(true);
        setError('');

        try {
            const orderData = {
                restaurantId: cart[0].restaurantId,
                items: cart.map(item => ({
                    menuItemId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: cartTotal,
                deliveryAddress: deliveryAddress
            };

            await api.post('/orders', orderData);
            clearCart();
            setDeliveryAddress('');
            navigate('/orders');
        } catch (err) {
            console.error(err);
            setError('Failed to place order. Please try again.');
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '800px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '32px' }}>
                🛒 Your Cart
            </h2>

            {error && <div className="error-msg">{error}</div>}

            {cart.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
                    <h3>Your cart is empty</h3>
                    <p style={{ marginBottom: '24px' }}>Add some delicious items to get started!</p>
                    <button onClick={() => navigate('/')} className="btn">
                        Browse Restaurants
                    </button>
                </div>
            ) : (
                <>
                    <div className="card">
                        {cart.map((item, index) => (
                            <div
                                key={item._id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '20px 0',
                                    borderBottom: index < cart.length - 1 ? '1px solid #e8ecef' : 'none'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '6px', color: '#2c3e50' }}>
                                        {item.name}
                                    </h4>
                                    <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                                        ₹{item.price} × {item.quantity}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <span style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ff6b35' }}>
                                        ₹{item.price * item.quantity}
                                    </span>
                                    <button
                                        className="btn btn-secondary"
                                        style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ marginTop: '24px' }}>
                        <h4 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>📍 Delivery Address</h4>
                        <textarea
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            placeholder="Enter your complete delivery address (Building, Street, Area, City, Pincode)"
                            rows="3"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #e8ecef',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                fontFamily: 'Poppins, sans-serif',
                                resize: 'vertical'
                            }}
                            required
                        />
                    </div>

                    <div className="card" style={{ marginTop: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <span style={{ fontSize: '1.3rem', fontWeight: '600' }}>Total Amount</span>
                            <span style={{ fontSize: '2rem', fontWeight: '700' }}>₹{cartTotal}</span>
                        </div>
                        <button
                            className="btn"
                            style={{
                                width: '100%',
                                background: '#fff',
                                color: '#764ba2',
                                fontSize: '1.1rem',
                                padding: '14px'
                            }}
                            onClick={handlePlaceOrder}
                            disabled={placing}
                        >
                            {placing ? 'Placing Order...' : '🚀 Place Order'}
                        </button>
                    </div>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#6c757d',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                fontSize: '0.95rem'
                            }}
                        >
                            ← Continue Shopping
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
