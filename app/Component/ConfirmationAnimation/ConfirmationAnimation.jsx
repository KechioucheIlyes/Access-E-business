import React from 'react'
import styles from "./confimrationAnimation.module.css"
import Link from 'next/link'
import Image from 'next/image'
import energie from "./../../Assets/energie-propre.png"
const ConfirmationAnimation = () => {
    return (
        <div className={styles.center}>

            <Image className={styles.thumb} src={energie} height={100} width={100} priority alt='energie-validation' />

            <div className={styles.circleWrap}>
                <div className={styles.circleLg}></div>
            </div>
            <div className={styles.dotsWrap}>
                <div className={`${styles.dot} ${styles.dotT}`}></div>
                <div className={`${styles.dot} ${styles.dotTr}`}></div>
                <div className={`${styles.dot} ${styles.dotBr}`}></div>
                <div className={`${styles.dot} ${styles.dotB}`}></div>
                <div className={`${styles.dot} ${styles.dotBl}`}></div>
                <div className={`${styles.dot} ${styles.dotTl}`}></div>
            </div>
        </div>
    )
}

export default ConfirmationAnimation