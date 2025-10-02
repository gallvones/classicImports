// src/components/LoginGoogle.jsx
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'implicit',
    scope: 'openid profile email', // 👈 garante e-mail
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;

        
        const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const profile = await profileRes.json();

        const googleEmail = profile?.email;
        const googleName = profile?.name;

        if (!googleEmail) {
          throw new Error('Não foi possível obter o e-mail pelo Google.');
        }

        // 2) chama o backend
        const res = await fetch('http://localhost:4000/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: googleEmail, name: googleName }),
        });

        if (!res.ok) {
          
          if (res.status === 409) {
            const err = await res.json().catch(() => ({}));
            alert(err.message || 'Email já cadastrado. Use login por e-mail e senha.');
            return; 
          }
          const err = await res.json().catch(() => ({}));
          throw new Error(err.message || 'Falha no login com Google');
        }

       
        const { user } = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/products'); 
      } catch (error) {
        console.error("Erro ao autenticar com Google:", error);
        alert(error.message || 'Erro no login com Google');
      }
    },
    onError: () => {
      console.log('Erro ao autenticar com Google');
      alert('Erro ao autenticar com Google');
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="submitLogin_button"
    >
      <FcGoogle style={{ fontSize: "15px", position: "relative", top: "2px", marginRight: "5px" }} />
      Google
    </button>
  );
};

export default LoginGoogle;
