import { useState } from 'react';
import React from 'react';
import '../pages/loginAccount.css';
import Logo from '../assets/imgs/blackjack.png';
import Logo2 from '../assets/imgs/e-commerce.png';
import { Link, useNavigate } from 'react-router-dom';
import LoginGoogle from '../components/LoginGoogle';

const LoginAccount = () => {  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Falha no login');
      }

      const { user } = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/products');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='loginAccount_container'>
      <form onSubmit={handleSubmit} className='loginForms_container'>
        <div className='imgs-container'>
          <div className='firstimg-container'>
            <img src={Logo} alt="logo" className='imgLogin_logo'/>
            <h3> Arcade Blackjack</h3>
          </div>
          <div className='secondimg-container'>
            <img src={Logo2} alt="logo" className='imgLogin_logo'/>
            <h3> Classic Imports</h3>
          </div>
        </div>
        
        <h2 className='login_title'>Login 🏛️</h2>
        
        {error && <p className='error-message'>{error}</p>}

        <div className='formsLogin_list'>
          <input 
            type="email" 
            placeholder='E-mail' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder='Senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='submitLogin_button'>Enviar</button>
      </form>

      <div className='google-button-container'>
      <LoginGoogle/>
      </div>
    </div>
  );
};

export default LoginAccount;
