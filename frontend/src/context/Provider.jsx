import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [cartMenu, setCartMenu] = useState(false);
  const [itemsCart, setItemsCart] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  // Carrega carrinho salvo ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setItemsCart(JSON.parse(storedCart));
  }, []);

  // Persiste carrinho sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(itemsCart));
  }, [itemsCart]);

  // Busca usuário e saldo atualizado no backend ao iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (!raw) return;

      const parsed = JSON.parse(raw);
      const data = parsed && parsed._doc ? parsed._doc : parsed;

      if (typeof data?.email !== 'undefined') {
        setUserEmail(String(data.email));

        // Consulta saldo atualizado no backend
        fetch(`http://localhost:4000/users/${encodeURIComponent(data.email)}`)
          .then(res => res.json())
          .then(user => {
            if (typeof user?.saldoK !== 'undefined') {
              setSaldo(Number(user.saldoK) || 0);
              // atualiza localStorage também
              localStorage.setItem('user', JSON.stringify(user));
            }
          })
          .catch(err => console.error('[FRONTEND] Erro ao buscar saldo:', err));
      }
    } catch (err) {
      console.error('[FRONTEND] Erro ao ler usuário do localStorage:', err);
    }
  }, []);

  const toggleCart = () => setCartMenu((prev) => !prev);

  // Adiciona item ao carrinho
  const addToCart = (product) => {
    setItemsCart((prev) => {
      const idx = prev.findIndex((p) => p.title === product.title);
      if (idx !== -1) {
        const next = [...prev];
        const currentQty = Number(next[idx].quantity || 1);
        next[idx] = { ...next[idx], quantity: currentQty + 1 };
        return next;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const value = {
    cartMenu,
    toggleCart,
    itemsCart,
    setItemsCart,
    addToCart,
    saldo,
    setSaldo,
    userEmail,   
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;

export default Provider;
