import React, { useState } from 'react'
import styles from '../styles/Featured.module.css'
import Image from 'next/image'
const Featured = () => {
    const [index, setIndex] = useState(0)
    const images = [
        "/img/featured.png",
        "/img/featured2.png",
        "/img/featured3.png",
    ]
    const handleArrow = (direction) => {
        if (direction === 'l') {
            setIndex(index !== 0 ? index - 1 : 2)
        }
        if (direction === 'r') {
            setIndex(index !== 2 ? index + 1 : 0)
        }
    }
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.arrowContainer} style={{ left: 0 }} >
                    <Image src={"/img/arrowl.png"} layout="fill" alt="" objectFit='contain' onClick={() => handleArrow('l')} />
                </div>
                <div className={styles.wrapper} style={{ transform: `translateX(${-100 * index}vw)` }}>

                    {/* {images.map((image, index) => {
                        return (
                            <div className={styles.imgContainer}>
                                <Image wi src={image} key={index} layout="fill" objectFit='contain' alt="" />
                            </div>
                        )
                    })} */}

                </div>
                <div className={styles.arrowContainer} style={{ right: 0 }}>
                    <Image src={"/img/arrowr.png"} layout="fill" alt="" objectFit='contain' onClick={() => handleArrow('r')} />
                </div>
            </div>
        </div>
    )
}

export default Featured