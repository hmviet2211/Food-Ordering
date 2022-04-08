import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'
import {useState} from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
export default function Home({data, admin}) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in VietNam</title>
        <meta name="description" content="Best pizza company for your dinner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList products={data}/>
      {!close&& <Add setClose={setClose}/>}
    </div>
  )
}


export async function getServerSideProps(context){
  const myCookie = context.req?.cookies || ""
  let admin = false
  if(myCookie.token===process.env.TOKEN){
    admin=true
  }
  const res = await axios.get('http://localhost:3000/api/products')
  

  return {props: {data: res.data, admin}}
}