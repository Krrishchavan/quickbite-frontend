import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterRestaurant = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantImage, setRestaurantImage] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({
                name,
                email,
                password,
                role: 'restaurant',
                restaurantName,
                restaurantImage
            });
            navigate('/restaurant-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
            <div className="card">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Partner with QuickBite</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Owner Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Business Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />
                    <div className="form-group">
                        <label>Restaurant Name</label>
                        <input type="text" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Restaurant Image URL</label>
                        <input type="url" placeholder="https://example.com/image.jpg" value={restaurantImage} onChange={(e) => setRestaurantImage(e.target.value)} />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Register Restaurant</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterRestaurant;
