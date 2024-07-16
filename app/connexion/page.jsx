'use client'
import React, { useState } from 'react';
import NavBar from '../Component/NavBar/NavBar';
import styles from "./connexion.module.css";
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import connexionImage from "../Assets/connexion.svg"
import logoImage from "../Assets/logoAccess.png"
import LoaderForButton from '../Component/LoaderForButton/LoaderForButton'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';
import Link from 'next/link';
import LinkedIn from '@mui/icons-material/LinkedIn';
import gmailProvider from "./../Assets/google.svg"
import TwitterIcon from '@mui/icons-material/Twitter';
const Connexion = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)


    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    const { data: session, status } = useSession()

    if (status === "authenticated") {
        redirect("/protected/user/accueil")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: 'http://localhost:3000/protected/user/accueil',
            })
            if (response.error) {
                setIsLoading(false);
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Email/Mot de passe incorrectes !")
                return
            }
            else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Email ou Mot de passe incorrectes !")
            console.log(error);
        }
    }


    return (
        <div className={styles.container}>
            <Box sx={{ width: 500 }}>
                <Snackbar
                    variant='soft'
                    color="success"
                    size="lg"
                    open={notificationValid}
                    onClose={handleCloseValid}
                    key="success"
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    {messageValid}
                </Snackbar>

                <Snackbar
                    open={notificationError}
                    onClose={handleCloseError}
                    message="Operation failed!"
                    key="error"
                    variant='soft'
                    color="danger"
                    size="lg"
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >{messageError} </Snackbar>

            </Box>
            <section className={styles.customSection}>
                <div className={styles.leftHalfContainer}>
                    <div className={styles.leftHalf}>
                        <div className={styles.imageSection}>
                            <Image src={connexionImage} height={300} width={300} alt='Access-OptiScore-connexion' priority />
                        </div>

                    </div>
                </div>
                <div className={styles.rightHalf}>
                    <div className={styles.connexionCard}>
                        <div className={styles.logoAccess}>
                            <Link href="/" ><Image src={logoImage} height={100} width={250} alt='image-Access-OptiScore-connexion-logo-Access-energies' priority /></Link>
                        </div>
                        <div className={styles.text}>
                            <h1>Bienvenue sur OptimScore ! 👋🏻</h1>
                            <h2>Veuillez vous connecter à votre compte et commencer l'aventure !</h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email">Adresse e-mail:</label>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" id="email" name="email" placeholder="Entrez votre e-mail" required />

                            <label htmlFor="password">Mot de passe:</label>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" id="password" name="password" placeholder="Entrez votre mot de passe" required />

                            <Button type="submit">{isLoading ? <LoaderForButton /> : "Se connecter"}</Button>

                            <div className={styles.creationCompte}>
                                <h3>Nouveau sur notre plateforme ? </h3> <Link href="/inscription" className={styles.link}> Créer un compte</Link>
                            </div>
                            <div className={styles.creationCompte}>
                                <h3>Mot de passe oublié ? </h3> <Link href="/reset-password" className={styles.link}>Cliquez ici</Link>
                            </div>

                            <div className={styles.anotherSignup}>
                                <div className={styles.OrContainer}>
                                    <div className={styles.orLeft}>

                                    </div>
                                    <div className={styles.orText}>
                                        <h4>ou</h4>
                                    </div>
                                    <div className={styles.orRight}>

                                    </div>
                                </div>
                                <div className={styles.providers}>
                                    <LinkedIn sx={{ height: '30px', width: '30px', color: "#1865c2", cursor: "pointer", marginRight: "15px" }} />
                                    <TwitterIcon sx={{ height: '30px', width: '30px', color: "#34a2f1", cursor: "pointer", marginRight: "15px" }} />
                                    <Image style={{ cursor: "pointer" }} src={gmailProvider} height={30} width={30} alt='image-Access-OptiScore-connexion-gmail' priority />
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Connexion;
