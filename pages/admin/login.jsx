import axios from 'axios'
import { useRouter } from 'next/router'
import React ,{useState} from 'react'
import styles from '../../styles/Login.module.css'

const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [err, setError] = useState(false)
    const router = useRouter()
    const handleClick =async ()=>{
        try {
            await axios.post('http://localhost:3000/api/login',{
                username,
                password
            })
            router.push('/admin')
        }catch(err) {
            setError(true)
        }
    }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Admin Dashboard</h1>
            <input 
                type="text"
                placeholder="Username"
                className={styles.input}
                onChange={(e)=>{setUsername(e.target.value)}}
            />
            <input 
                type="password"
                placeholder="Password"
                className={styles.input}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button className={styles.button} onClick={handleClick} >
                Sign In
            </button>
            {err && (<span className={styles.error}> Wrong credentials</span>)}
        </div>
    </div>
  )
}

export default Login