import React, { useEffect, useState } from 'react'
import '../section1/section1.css'
import CardProduct1 from './CardProduct1'

const Section1 = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/fakestore/products")
      .then(res => res.json())
      .then(data => {
        // Pega apenas os 3 primeiros produtos
        setProducts(data.slice(0, 3))
      })
      .catch(err => console.error("Erro ao buscar produtos da FakeStore:", err))
  }, [])

  return (
    <div className='section1-all-container'>
      <div className='section1-cards-container'>
        {products.map((prod, index) => (
          <CardProduct1
            key={index}
            data={{
              title: prod.title,
              price: `K$ ${prod.price}`,
              img: prod.img,
              img2: prod.img // aqui só duplico pq o fakestore não tem 2 imagens
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Section1
