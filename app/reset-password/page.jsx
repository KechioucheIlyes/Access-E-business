'use client'
import React, { useEffect, useState } from 'react';
import styles from "./reset.module.css";
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import connexionImage from "../Assets/forgot.svg"
import logoImage from "../Assets/logoAccess.png"
import LoaderForButton from '../Component/LoaderForButton/LoaderForButton'
import Loader from '../Component/Loader/Loader'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';
import Link from 'next/link';

const Reset = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRes, setPasswordRes] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [id, setId] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [confirmationStatus, setConfirmationStatus] = useState(true);
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams();
    const token = searchParams.get('token');


    useEffect(() => {
        if (token) {
            (async () => {
                try {
                    setLoading(true)
                    const data = await getUrl(token);

                    if (data.message) {
                        setId(data.id)
                        setConfirmationStatus(false)
                        setLoading(false)
                    } else {
                        setConfirmationStatus(true)
                        setLoading(false)
                    }

                } catch (error) {
                    console.error(error);
                }
            })();
        } else {
            setLoading(false)
        }
    }, [token]);

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
            const response = await fetch("/api/forgot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setMessageValid("Si votre email a été trouvé un email viens de vous être envoyé !")
                setIsLoading(false);
            } else {
                setIsLoading(false);
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Email ou Mot de passe incorrectes !")
            }


        } catch (error) {
            setIsLoading(false);
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Email ou Mot de passe incorrectes !")
            console.log(error);
        }
    }

    const handleSubmitReset = async (e) => {
        e.preventDefault();

        if ((passwordRes == confirmedPassword) && (passwordRes !== "" && confirmedPassword !== "")) {
            alert("yes")

            const res = await fetch("/api/auth/reset-password", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ passwordRes, id })
            })

            if (res.ok) {
                const data = await res.json()
                if (data.maj) {
                    setNotificationValid(true)
                    setMessageValid("Mot de passe reinisialisé")
                    router.push("/")
                } else {
                    setNotificationError(true)
                    setMessageError("Une erreur s'est produite l'or de la reinisialisation de votre mot de passe !")
                }

            } else {
                setNotificationError(true)
                setMessageError("Une erreur s'est produite l'or de la reinisialisation de votre mot de passe !")
            }

        } else {
            setNotificationError(true)
            setMessageError("Veuillez renseinger des mot de passe identiques")
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
                            <Image src={connexionImage} height={300} width={300} alt='image-Access-OptiScore-connexion' priority />
                        </div>

                    </div>
                </div>
                <div className={styles.rightHalf}>
                    <div className={styles.connexionCard}>
                        <div className={styles.logoAccess}>
                            <Link href="/" ><Image src={logoImage} height={100} width={250} alt='image-Access-OptiScore-connexion-logo-Access-energies' priority /></Link>
                        </div>
                        <div className={styles.text}>
                            <h1>Mot de passe oublié</h1>
                            <h2>Entrez l'e-mail associé à votre compte et nous vous enverrons un e-mail avec des instructions pour réinitialiser votre mot de passe.</h2>
                        </div>




                        {loading ? ( // Si loading est vrai, affiche le loader
                            <div className={styles.loader}><Loader /></div>
                        ) : (
                            confirmationStatus ? ( // Si confirmationStatus est vrai, affiche le formulaire d'e-mail
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email">Adresse e-mail:</label>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" id="email" name="email" placeholder="Entrez votre e-mail" required />

                                    <Button type="submit">{isLoading ? <LoaderForButton /> : "Envoyer"}</Button>

                                    <div className={styles.creationCompte}>
                                        <h3>Nouveau sur notre plateforme ? </h3> <Link href="/inscription" className={styles.link}> Créer un compte</Link>
                                    </div>


                                </form>
                            ) : ( // Sinon, affiche le formulaire de réinitialisation de mot de passe
                                <form onSubmit={handleSubmitReset}>
                                    <label htmlFor="password">Mot de passe :</label>
                                    <input value={passwordRes} onChange={(e) => { setPasswordRes(e.target.value) }} type="password" id="password" name="password" placeholder="Nouveau votre mot de passe" required />
                                    <label htmlFor="ConfirmedPass">Confirmation Mot de passe :</label>
                                    <input value={confirmedPassword} onChange={(e) => { setConfirmedPassword(e.target.value) }} type="password" id="confirmedPass" name="confirmedPass" placeholder="Confirmer votre mot de passe" required />

                                    <Button type="submit">{isLoading ? <LoaderForButton /> : "Réinisialiser"}</Button>

                                </form>
                            )
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
}

async function getUrl(token) {
    try {
        const response = await fetch(`/api/confirmation-forgot/${token}`);
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default Reset;
