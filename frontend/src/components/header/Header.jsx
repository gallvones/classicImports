import React, { useContext } from 'react'
import Logo from '../../assets/imgs/e-commerce.png'
import '../header/header.css'
import { FaShoppingCart } from 'react-icons/fa'
import AppContext from '../../context/AppContext'

const Header = () => {
 
  const { toggleCart, itemsCart, saldo, userEmail } = useContext(AppContext)

  const cartCount = itemsCart.reduce((sum, i) => sum + Number(i.quantity || 1), 0)

  return (
    <div className='header-container'>
      {/* Esquerda */}
      <div className='left-header'>
        <div className='logo-container'>
          <img src={Logo} alt="logo" />
        </div>
        <h2>Classic Imports</h2>
      </div>

      {/* Direita */}
      <div className='right-header'>
        <div className="user-info">
          <span>Olá, {userEmail || 'Usuário'}</span>
          <span>Seu saldo: K$ {saldo}</span>
          <strong>Farm K$ no Arcade BlackJack!</strong>
          <button
  onClick={() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const email = user._doc ? user._doc.email : user.email;
      window.open(
        `http://localhost:3001?email=${encodeURIComponent(email)}`,
        "_blank" 
      );
    }
  }}
>
  Ir para o BlackJack 🤑 ♦️
</button>

        </div>

        {/* botão que abre o carrinho */}
        <button
          type="button"
          className="cart-icon-btn"
          onClick={toggleCart}
          aria-label="Abrir carrinho"
        >
          <FaShoppingCart className="cart-icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </div>
  )
}

export default Header




