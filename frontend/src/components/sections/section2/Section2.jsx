import React, { useEffect, useState } from 'react'
import '../section2/section2.css'
import CardProduct1 from '../section1/CardProduct1'

const Section2 = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/escuelajs/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 3)) // pega só 3 produtos
      })
      .catch(err => console.error("Erro ao buscar produtos do OpenFood:", err))
  }, [])

  return (
    <div className='section2-all-container'>
      <div className='section2-cards-container'>
        {products.map((prod, index) => (
          <CardProduct1
            key={index}
            data={{
              title: prod.title,
              price: prod.price ? `K$ ${prod.price}` : "Sem preço",
              img: prod.img,
              img2: prod.img
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Section2
