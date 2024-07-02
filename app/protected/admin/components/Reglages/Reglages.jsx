import React, { use, useEffect, useState } from 'react'
import styles from "./reglages.module.css"
import { useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';

const Reglages = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const { data: session, status } = useSession()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [numero, setNumero] = useState('')
    const [raisonSociale, setRaisonSociale] = useState('')
    const [fonction, setFonction] = useState('')
    const [siren, setSiren] = useState('')
    const [role, setRole] = useState('')
    const [fixe, setFixe] = useState('')
    const [modifierLe, setModifierLe] = useState('')
    const [creerLe, setCreerLe] = useState('')
    const [userID, setUserID] = useState(null)
    const id = session?.user?.id


    const handleUpdate = async () => {
        const formData = {
            nom,
            prenom,
            email,
            numero,
            raisonSociale,
            fonction,
            siren,
            fixe,
            userID

        }
        try {
            const res = await fetch('/api/crud/update/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                setMessageError("Une erreur s'est produite l'or de la mise à jour !")
            }
        } catch (error) {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Une erreur s'est produite l'or de la mise à jour !")
        }

    }

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    useEffect(() => {
        const fetchinUser = async () => {
            try {
                const res = await fetch(`/api/crud/user?id=${id}`, {
                    method: "GET"
                })
                if (res.ok) {
                    const data = await res.json()
                    const user = data.user
                    setNom(user.name)
                    setPrenom(user.prenom)
                    setEmail(user.email)
                    setNumero(user.numero)
                    setRaisonSociale(user.raison_social)
                    setFonction(user.fonction)
                    setSiren(user.siren)
                    setRole(user.role)
                    setFixe(user.fix)
                    setModifierLe(user.modifier_le)
                    setCreerLe(user.create_time)
                    setUserID(user.id)
                } else {
                    return
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchinUser()
    }, [userID, messageValid, messageError])

    return (
        <div className={`${styles.creer} ${styles.backgroungCreer}`}>
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
            <div className={styles.title}>
                <h1>Parametre du compte</h1>
            </div>

            <TextField onChange={(e) => { setNom(e.target.value) }} value={nom ? nom : ''} id="outlined-basic" label="Nom" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setPrenom(e.target.value) }} id="outlined-basic" value={prenom ? prenom : ''} label="Prenom" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setEmail(e.target.value) }} value={email ? email : ''} id="outlined-basic" label="Email" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setNumero(e.target.value) }} value={numero ? numero : ''} id="outlined-basic" label="Numero de téléphone" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setRaisonSociale(e.target.value) }} value={raisonSociale ? raisonSociale : ''} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setFonction(e.target.value) }} value={fonction ? fonction : ''} id="outlined-basic" label="Fonction" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setSiren(e.target.value) }} value={siren ? siren : ''} id="outlined-basic" label="Siren" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField disabled={true} value={role ? role : ''} id="outlined-basic" label="Rôle" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />
            <TextField value={fixe ? fixe : ''} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic" label="Fixe" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />

            <TextField disabled={true} value={creerLe ? new Date(creerLe).toLocaleString('fr-FR') : ''} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic" label="Creer le" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />

            <TextField disabled={true} value={modifierLe ? new Date(modifierLe).toLocaleString('fr-FR') : ''} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic" label="Modifier le" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} inputProps={{ style: { color: 'white' } }} />


            <div className={styles.btnSubmit}>
                <Button onClick={handleUpdate} sx={{ color: "white" }} >Modifier</Button>
            </div>
        </div>
    )
}

export default Reglages