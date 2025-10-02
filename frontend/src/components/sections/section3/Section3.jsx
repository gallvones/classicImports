import React, { useEffect, useState } from 'react'
import '../section3/section3.css'
import CardProduct1 from '../section1/CardProduct1'

const Section3 = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/dummyjson/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 3)) // pega só 3 produtos
      })
      .catch(err => console.error("Erro ao buscar produtos do DummyJSON:", err))
  }, [])

  return (
    <div className='section3-all-container'>
      <div className='section3-cards-container'>
        {products.map((prod, index) => (
          <CardProduct1
            key={index}
            data={{
              title: prod.title,
              price: `K$ ${prod.price}`,
              img: prod.img,
              img2: prod.img
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Section3
