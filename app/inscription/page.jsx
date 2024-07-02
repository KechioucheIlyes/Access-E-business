'use client'
import React, { useEffect } from 'react'
import NavBar from '../Component/NavBar/NavBar'
import styles from "./inscription.module.scss"
import { useState } from 'react'
import LoaderForButton from '../Component/LoaderForButton/LoaderForButton'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import inscriptionImage from "../Assets/inscription.svg"
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import ConfettiExplosion from 'react-confetti-explosion';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import logoImage from "../Assets/logoAccess.png"
import Button from '@mui/joy/Button';
import Link from 'next/link';
import LinkedIn from '@mui/icons-material/LinkedIn';
import gmailProvider from "./../Assets/google.svg"
import TwitterIcon from '@mui/icons-material/Twitter';

const Inscription = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [raisonSociale, setRaisonSociale] = useState('');
    const [fonction, setFonction] = useState('');
    const [commentaire, setCommentaire] = useState('');
    const [siren, setSiren] = useState('');
    const [password, setPassword] = useState('');
    const [fix, setFix] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [errorAlertVisible, setErrorAlertVisible] = useState(false);
    const [message, setMessage] = useState("")
    const searchParams = useSearchParams()
    const [isExploding, setIsExploding] = useState(false);
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const ref = searchParams.get('ref')

    const router = useRouter()

    const { data: session, status } = useSession()

    if (status === "authenticated") {
        redirect("/protected/user/accueil")
    }

    useEffect(() => {

        if (ref) {
            fetch(`/api/verifyReferral?ref=${ref}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.valid && !data.filleul.affiliated && !data.filleul.actif) {
                        setIsExploding(true)
                        setMessageError(false)
                        setNom(data.filleul.nom)
                        setPrenom(data.filleul.prenom)
                        setEmail(data.filleul.email)
                        setNumero(data.filleul.mobile)
                        setFix(data.filleul.fixe)
                        setRaisonSociale(data.filleul.raison_sociale)
                        setFonction(data.filleul.fonction)
                    }
                    else {
                        setIsExploding(false)
                        setNotificationValid(false)
                        setNotificationError(true)
                        setMessageError("Lien de parrainage invalide ou expiré.")
                        router.replace("http://localhost:3000/inscription")
                    }
                });
        }
    }, []);

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };


    useEffect(() => {
        if (successAlertVisible || errorAlertVisible) {
            const timeout = setTimeout(() => {
                setSuccessAlertVisible(false);
                setErrorAlertVisible(false);
                setMessage('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [successAlertVisible, errorAlertVisible]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = {
            nom,
            prenom,
            email,
            tel: numero,
            fix,
            password,
            raison_social: raisonSociale,
            fonction,
            siren,
            commentaire,
            ref,

        }



        fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                if (data.success) {
                    setSuccessAlertVisible(true);
                    setErrorAlertVisible(false);
                    setMessage(data.message);
                } else {
                    setSuccessAlertVisible(false);
                    setErrorAlertVisible(true);
                    setMessage(data.message);
                }

            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
                setSuccessAlertVisible(false);
                setErrorAlertVisible(true);
                setMessage(err)
            })


    };
    return (
        <>

            <Box sx={{ width: 500, backgroundColor: "red" }}>
                <Snackbar
                    variant='soft'
                    sx={{
                        color: '#1a252a',
                        fontWeight: "bolder",
                        backgroundColor: '#14b497',
                        border: "2px solid #1a252a"
                    }}
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

            <main className={styles.mainContainer}>

                <div className={styles.imageContainer}>
                    <div className={styles.sectionImage}>
                        <Image src={inscriptionImage} height={400} width={700} alt='image-Access-OptiScore-inscription' priority />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.containerTextLogo}>

                        <div className={styles.logoAccess}>
                            <Link href="/" ><Image src={logoImage} height={100} width={250} alt='image-Access-OptiScore-connexion-logo-Access-energies' priority /></Link>
                        </div>
                        <div className={styles.text}>
                            <h1>L'économie commence ici 🚀</h1>
                            <h2>Optimisez votre énergie et économisez de l'argent facilement et efficacement !</h2>
                        </div>
                    </div>
                    <div className={styles.champContainer}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.labelAndInputContainer}>
                                <label>Nom :</label>
                                <input id='nom' name='nom' placeholder="Exemple : Doe" type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Prénom :</label>
                                <input id='prenom' name='prenom' placeholder="Exemple : Jhon" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Email : </label>
                                <input id='email' name='email' placeholder="Exemple : JohnDoe@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Mot de passe :</label>
                                <input id='password' name='password' placeholder="Exemple : Jhon123" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>N° tel :</label>
                                <input id='tel' name='tel' placeholder="Exemple : 07999999" type="tel" value={numero} onChange={(e) => setNumero(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>N° Fixe: </label>
                                <input id='tel' name='tel' placeholder="Exemple : 07999999" type="tel" value={fix} onChange={(e) => setFix(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Raison sociale :</label>
                                <input id='raison_social' name='raison_social' placeholder="Exemple : TotalEnergies SA" type="text" value={raisonSociale} onChange={(e) => setRaisonSociale(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Siren :</label>
                                <input id='siren' name='siren' placeholder="Exemple : 123456789" type="text" value={siren} onChange={(e) => setSiren(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Fonction :</label>
                                <input id='fonction' name='fonction' placeholder="Exemple : DAF" type="text" value={fonction} onChange={(e) => setFonction(e.target.value)} required />
                            </div>
                            <div className={styles.labelAndInputContainer}>
                                <label>Commentaire :</label>
                                <textarea id='commentaire' name='commentaire' placeholder="Exemple : Je souhaite en savoir plus sur ce que vous proposez" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} required />
                            </div>
                            <Button type="submit">{isLoading ? <LoaderForButton /> : "Soumettre"}</Button>

                            <div className={styles.creationCompte}>
                                <h3>Vous avez déjà un compte? </h3> <Link href="/connexion" className={styles.link}>Connectez-vous ici</Link>
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




            </main>
            <div className={styles.alertContainer}>
                {successAlertVisible && (
                    <Alert severity="success">
                        <AlertTitle>Inscription réussie ! </AlertTitle>
                        {message}
                    </Alert>
                )}
                {errorAlertVisible && (
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
                    </Alert>

                )}

            </div>
            <div className={styles.confetti}>

                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
                {isExploding && <ConfettiExplosion />}
            </div>
        </>

    )
}

export default Inscription
