import React, { useState } from 'react'
import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'
const Index = ({ orders, products }) => {
    const [pizzaList, setPizzaList] = useState(products)
    const [orderList, setOrderList] = useState(orders)
    const statusArr = ['preparing','on the way', 'delivered']
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete('http://localhost:3000/api/products/' + id)
            setPizzaList(pizzaList.filter((pizza) => {
                return pizza._id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }
    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;
    
        try {
          const res = await axios.put("http://localhost:3000/api/orders/" + id, {
            status: currentStatus + 1,
          });
          setOrderList([
            res.data,
            ...orderList.filter((order) => order._id !== id),
          ]);
        } catch (err) {
          console.log(err);
        }
      };
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>

                    <tbody>
                        {pizzaList.map(product => {
                            return (
                                <tr className={styles.trTitle} key={product._id}>
                                    <td>
                                        <Image
                                            src={product.img}
                                            width={50}
                                            height={50}
                                            objectFit='cover'
                                            alt=''
                                        />
                                    </td>
                                    <td>{product._id.slice(0, 5) + '...'}</td>
                                    <td>{product.title}</td>
                                    <td>${product.prices[0]}</td>
                                    <td>
                                        <button className={styles.button}>Edit</button>
                                        <button className={styles.button} onClick={() => { handleDelete(product._id) }}>Delete</button>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>

                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {orderList.map(order => {
                            return (
                                <tr className={styles.trTitle} key={order._id}>
                                    <td>
                                        {order._id.slice(0, 5) + "..."}
                                    </td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>{order.method === 0 ? (<span>Cash</span>) : (<span>Paid</span>)}</td>
                                    <th>{statusArr[order.status]}</th>
                                    <td>
                                        {order.status===2 && ( <button onClick={() => {handleStatus(order._id)}}>Next Stage</button>)}
                                       
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies || ""
    if(myCookie.token !== process.env.TOKEN){
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }
    const productList = await axios.get('http://localhost:3000/api/products')
    const orderList = await axios.get('http://localhost:3000/api/orders')
    return {
        props: {
            orders: orderList.data,
            products: productList.data
        }
    }
}
export default Index