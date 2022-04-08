import React from 'react'
import styles from '../styles/OrderDetail.module.css'
import { useState } from 'react'
const OrderDetail = ({total, createOrder}) => {
  const [customer, setCustomer] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const handleClick = ()=>{
    createOrder({customer, address, total, method:0})
  }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>You will pay $12 after delivery.</h1>
            <div className={styles.item}>
              <label htmlFor="" className={styles.label}>Name Surname</label>
              <input type="text" className={styles.input} placeholder="John Doe" onChange={(e)=>{
                setCustomer(e.target.value)
              }}/>
            </div>
            <div className={styles.item}>
              <label htmlFor="" className={styles.label}>Phone Number</label>
              <input type="text" className={styles.input} placeholder="+1 234 567 890" onChange={(e)=>{
                setPhone(e.target.value)
              }}/>
            </div>
            <div className={styles.item}>
              <label htmlFor="" className={styles.label}>Address</label>
              <input type="text" className={styles.input} placeholder="12 abc abc" onChange={(e)=>{
                setAddress(e.target.value)
              }}/>
            </div>
            <button className={styles.button} onClick={handleClick}>
              Order
            </button>
        </div>
    </div>
  )
}

export default OrderDetail