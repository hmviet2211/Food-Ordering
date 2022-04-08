import React, { useState } from 'react'
import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {addProduct} from '../../redux/cartSlice'
const Product = ({ pizza }) => {
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(addProduct({...pizza, extras, price, quantity}))
    }
    const [size, setSize] = useState(0)
    const [price, setPrice] = useState(pizza.prices[0])
    const [extras, setExtras]  = useState([])
    const [quantity, setQuantity] = useState(1)
    const changePrice = (number)=>{
        setPrice(price+number)
    }
    const handleSize = (sizeIndex)=>{
        const difference = pizza.prices[sizeIndex] - pizza.prices[size]
        setSize(sizeIndex)
        changePrice(difference)
    }
    const handleChange = (e, option)=>{
        const checked = e.target.checked
        if(checked){
            changePrice(option.price)
            setExtras(prev=>[
                ...prev, option
            ])
        }else{
            changePrice(-option.price)
            setExtras(extras.filter(extra=>{
                return extra._id!==option._id
            }))
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} alt='' objectFit="contain" layout="fill" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>${price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose your size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image alt='' src='/img/size.png' layout="fill" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image alt='' src='/img/size.png' layout="fill" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image alt='' src='/img/size.png' layout="fill" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOption.map(option => {
                        return <div className={styles.option} key={option._id}>
                            <input
                                type="checkbox"
                                id={option.text}
                                name={option.text}
                                className={styles.checkbox}
                                onChange ={(e)=>{
                                    handleChange(e, option)
                                }}
                            />
                            <label htmlFor="double">{option.text}</label>
                        </div>
                    })}

                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} className={styles.quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
                    <button className={styles.button} onClick={handleClick}>Add to cart </button>
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
    return {
        props: {
            pizza: res.data
        }
    }
}

export default Product