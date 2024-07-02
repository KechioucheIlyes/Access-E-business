'use client'
import React, { useState } from 'react'
import styles from "./acceuil.module.css"
import Card from "../../../Component/Card/Card"
import NavBar from '../../../Component/NavBar/NavBar'
import Button from '@mui/material-next/Button';
import Image from 'next/image'
import Earth from "./../../../Assets/energie-earth.png"
import { useRouter } from 'next/navigation';
import LoaderForButton from "../../../Component/LoaderForButton/LoaderForButton"
import Link from 'next/link'
import mascotte from "./../../../Assets/mascote.png"
import { TypeAnimation } from 'react-type-animation';
const Accueil = () => {

    return (
        <main className={styles.main}>
            <NavBar accueilClient={false} accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <div className={styles.textAccroche}>
                        <div className={styles.text} >
                            <TypeAnimation
                                sequence={[
                                    'Apportez des solutions à vos clients',
                                    1000,
                                    'Apportez des solutions à vos prospects',
                                    1000,
                                    'Apportez des solutions à vos clients et à vos prospects pour réduire leur budget énergetique.',
                                    1000,
                                ]}
                                speed={50}
                                style={{ fontSize: '2em', color: "black" }}
                                repeat={false}
                            />
                        </div>
                        <div className={styles.imageSection}>
                            <Image className={styles.earth} src={mascotte} width={300} height={300} priority alt='energy-earth' />
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <Link className={styles.btn} href={"/protected/user/information-client"}>LANCER UNE ÉTUDE</Link>
                        <Link className={styles.btn} href={"/protected/user/parrainage"}>PARRAINER</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Accueil