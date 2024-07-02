'use client'
import React, { useState } from 'react'
import styles from "./parrainage.module.css"
import NavBar from '../../../Component/NavBar/NavBar'
import { TextField } from '@mui/material'
import { Button } from '@mui/joy'
import { useSession } from 'next-auth/react';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';

const Parrainage = () => {
    const { data: session, status } = useSession()
    const [raisonSociale, setRaisonSociale] = useState('')
    const [secteurActivite, setsecteurActivite] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [email, setEmail] = useState('')
    const [fixe, setFixe] = useState('')
    const [mobile, setMobile] = useState('')
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)



    const userID = parseInt(session?.user?.id)


    const handleSponsor = async () => {
        const formData = {
            raisonSociale,
            secteurActivite,
            nom,
            prenom,
            fonction,
            email,
            fixe,
            mobile,
            userID
        }
        if (!userID) {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Une erreur s'est produite veuillez réessayer plus tard !")
        } else {
            if (!raisonSociale || !secteurActivite || !nom || !prenom || !fonction || !email || !fixe || !mobile) {
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Vous devez renseigner tout les chanmps !")
            } else {
                try {
                    const res = await fetch("/api/crud/parrainage", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })

                    if (res.ok) {
                        const data = await res.json()
                        setNotificationValid(true)
                        setMessageValid(data.message)
                        setMessageError(false)

                    } else {
                        setNotificationValid(false)
                        setNotificationError(true)
                        setMessageError("Une erreur s'est produite l'or du parrainage !")
                    }
                } catch (error) {
                    setNotificationValid(false)
                    setNotificationError(true)
                    setMessageError("Une erreur s'est produite l'or du parrainage !")
                }
            }
        }

    }


    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    return (

        <section className={styles.section} >
            <div>
                <NavBar accueil={false} accueilClient={true} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />

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

                <div className={styles.champsP}>
                    <h1>PARRAINAGE</h1>
                    <div className={styles.descriptionChampsP}>
                        <h3>Chaque parrainage vous permet de beneficer 5 % du montant des commissions des affaires conclues par votre
                            filleul et ceux durant les 3 premiers mois à compter de l'activation de son espace d'apporteur d'affaire.</h3>
                    </div>
                </div>
                <div className={styles.inputs}>

                    
                    <div className={styles.inputSection}>
                        <TextField onChange={(e) => { setRaisonSociale(e.target.value) }} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                        <TextField onChange={(e) => { setsecteurActivite(e.target.value) }} id="outlined-basic" label="Secteur d'activité" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                        <TextField onChange={(e) => { setNom(e.target.value) }} id="outlined-basic" label="Nom" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                        <TextField onChange={(e) => { setPrenom(e.target.value) }} id="outlined-basic" label="Prenom" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                    </div>

                    <div className={styles.inputSection}>
                        <TextField onChange={(e) => { setFonction(e.target.value) }} id="outlined-basic" label="Fonction" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                        <TextField type='email' onChange={(e) => { setEmail(e.target.value) }} id="outlined-basic" label="Email" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                        <TextField type='number' onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic" label="Télephone Fixe" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                        <TextField type='number' onChange={(e) => { setMobile(e.target.value) }} id="outlined-basic" label="Télephone mobile" variant="outlined" sx={{
                            margin: "5px",
                            color: "white", width: 300, "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "black", border: "2px solid" }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                                , "&.Mui-disabled": {
                                    color: "#716c6c",
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#716c6c"
                                    }
                                }
                            }
                        }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
                    </div>
                </div>
                <div className={styles.btnSubmit}>
                    <Button onClick={handleSponsor} className={styles.btnHover} sx={{ padding: '5px 40px', color: "white", backgroundColor: '#2c8443', fontSize: '20px' }} >Parrainer</Button>
                </div>
            </div>
        </section>


    )
}

export default Parrainage