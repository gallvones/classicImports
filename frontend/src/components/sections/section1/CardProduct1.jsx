import { useState, useContext } from 'react'
import '../section1/cardproduct1.css'
import { BsFillCartPlusFill } from 'react-icons/bs'
import AppContext from '../../../context/AppContext'

const CardProduct1 = ({ data }) => {
  const { title, img, price, img2 } = data
  const [currentImg, setCurrentImg] = useState(img)
  const { addToCart } = useContext(AppContext) 

  return (
    <section
      onMouseMove={() => setCurrentImg(img2)}
      onMouseOut={() => setCurrentImg(img)}
      className='Card'
    >
      <img src={currentImg} className='card__image' alt={title} />
      <div className='card__info'>
        <h1 className='card__title'>{title}</h1>
        <h1 className='card__price'>{price}</h1>
      </div>
      <button
        type='button'
        className='add__cart'
        onClick={() => addToCart({ title, price, img })} 
      >
        <BsFillCartPlusFill />
      </button>
    </section>
  )
}

export default CardProduct1
