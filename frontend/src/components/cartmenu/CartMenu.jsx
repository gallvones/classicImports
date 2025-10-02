import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { BsFillCartXFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import '../cartmenu/cartmenu.css';

const CartMenu = () => {
  const { itemsCart, setItemsCart, cartMenu, toggleCart, saldo, userEmail, setSaldo } = useContext(AppContext);

  const normalizePrice = (value) => {
    if (typeof value === 'number') return value;
    return parseFloat(String(value).replace(/[^0-9.,]/g, '').replace(',', '.')) || 0;
  };

  const updateQuantity = (idx, delta) => {
    const newItems = [...itemsCart];
    const currentQty = Number(newItems[idx].quantity || 1);
    newItems[idx].quantity = Math.max(1, currentQty + delta);
    setItemsCart(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeItem = (idx) => {
    const updatedItems = itemsCart.filter((_, index) => index !== idx);
    setItemsCart(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const total = itemsCart.reduce((sum, item) => {
    const price = normalizePrice(item.price);
    const qty = Number(item.quantity || 1);
    return sum + price * qty;
  }, 0);

  // === Lógica da compra ===
  const handlePurchase = async () => {
    if (saldo >= total) {
      try {
        // Atualiza saldo local (já arredondado para 2 casas decimais)
        setSaldo((prev) => Number((prev - total).toFixed(2)));

        // Atualiza no banco
        const res = await fetch(`http://localhost:4000/users/${encodeURIComponent(userEmail)}/purchase`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total }),
        });

        if (!res.ok) throw new Error("Erro ao atualizar saldo no banco.");

        alert("✅ Compra realizada com sucesso!");
        localStorage.removeItem("cart");
      } catch (err) {
        console.error(err);
        alert("❌ Erro ao processar compra.");
      }
    } else {
      alert("⚠️ Saldo insuficiente para realizar a compra.");
    }
  };

  return (
    <div className={cartMenu ? 'cart-menu-open' : 'cart-menu-close'}>
      <div className={cartMenu ? 'empty-cart-open' : 'empty-cart-close'}>
        <button className='button_close' onClick={toggleCart}>
          <IoMdCloseCircle />
        </button>

        {itemsCart.length === 0 ? (
          <>
            <p>Seu carrinho está vazio!</p>
            <p className='cart_icon_empty'><BsFillCartXFill /></p>
          </>
        ) : (
          <div className='items-cart-container'>
            <ul className='items-cart'>
              {itemsCart.map((item, index) => {
                const price = normalizePrice(item.price);
                const qty = Number(item.quantity || 1);

                return (
                  <li key={`${item.title}-${index}`} className='item-cart-row'>
                    <img src={item.img} alt={item.title} className='item-cart-image' />
                    <div className='item-cart-info'>
                      <p className='item-cart-title'>{item.title}</p>

                      <p className='item-cart-quantity'>
                        Quantidade:
                        <button
                          className='decrease-quantity-oncart'
                          onClick={() => updateQuantity(index, -1)}
                        >
                          -
                        </button>
                        <span className='quantity-oncart'>{qty}</span>
                        <button
                          className='increase-quantity-oncart'
                          onClick={() => updateQuantity(index, +1)}
                        >
                          +
                        </button>
                      </p>

                      <div className='price-and-trash'>
                        <p className='item-cart-price'>
                          Valor: K${(price * qty).toFixed(2)}
                        </p>
                        <div className='remove-item-from-cart'>
                          <FaTrash onClick={() => removeItem(index)} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className='total-value'>
              <strong>Valor Total:</strong> K${total.toFixed(2)}
              <br />
              <strong>Saldo Atual: K$ {Number(saldo || 0).toFixed(2)}</strong>
              <br />
              <strong>Entrega na MV Gois 🔥</strong>
              <br />
              <button className='cart-buy' onClick={handlePurchase}>
                Comprar com K$
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartMenu;
