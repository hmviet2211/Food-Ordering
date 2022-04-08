import React from 'react'
import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'
import Link from 'next/link'


const PizzaCard = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`}>
      <div className={styles.container}>
        <Image src={product.img} width='500' height='500' />
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${product.prices[0]}</span>
        <p className={styles.desc}>
          {product.desc}
        </p>
      </div>
    </Link>
  )
}

export default PizzaCard