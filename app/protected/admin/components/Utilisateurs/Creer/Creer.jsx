
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
import styles from "./../../Filleuls/Creer/creer.module.css"

const Creer = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [raisonSociale, setRaisonSociale] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [email, setEmail] = useState('')
    const [fixe, setFixe] = useState('')
    const [mobile, setMobile] = useState('')

    const [roles, setRole] = useState('')
    const [siren, setSiren] = useState('')

    const handleSelectedRole = (_, role) => {
        if (role) {
            setRole(role.label)
        } else {
            setRole('')
        }
    }
    const handleCreateUser = async () => {

        if (!raisonSociale || !nom || !prenom || !fonction || !email || !fixe || !mobile || !roles || !siren) {
            setNotificationValid(false)
            setNotificationError(true);
            setMessageError("Tout les champs sont obligatoires !")
        } else {
            const formData = {
                raisonSociale,
                nom,
                prenom,
                fonction,
                email,
                fixe,
                mobile,
                siren,
                roles
            }

            try {
                const res = await fetch("/api/crud/admin/create/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                if (res.ok) {
                    const data = await res.json()
                    setNotificationValid(true)
                    setNotificationError(false);
                    setMessageValid(data.message)
                }
                else if (res.status === 402) {
                    setNotificationValid(false)
                    setNotificationError(true);
                    setMessageError("Cet email existe déja !")
                }
                else {
                    setNotificationValid(false)
                    setNotificationError(true);
                    setMessageError("Erreur l'or de la création de l'utilisateur veuillez reessayer plus tard !")
                }
            } catch (error) {
                setNotificationValid(false)
                setNotificationError(true);
                setMessageError("Erreur l'or de la création de l'utilisateur veuillez reessayer plus tard !")
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
        <div className={`${styles.creer} ${styles.backgroungCreer}`} >

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
                <h1>Créer un Utilisateur </h1>
            </div>

            <TextField onChange={(e) => { setRaisonSociale(e.target.value) }} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
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

            <TextField onChange={(e) => { setNom(e.target.value) }} id="outlined-basic" label="Nom" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setPrenom(e.target.value) }} id="outlined-basic" label="Prenom" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setFonction(e.target.value) }} id="outlined-basic" label="Fonction" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setEmail(e.target.value) }} id="outlined-basic" label="Email" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic" label="Fixe" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setMobile(e.target.value) }} id="outlined-basic" label="Mobile" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setSiren(e.target.value) }} id="outlined-basic" label="Siren/Siret" variant="outlined" sx={{
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

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={role}
                onChange={handleSelectedRole}
                sx={{
                    color: "#716c6c",
                    width: 300,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "whitesmoke",
                        },
                        "&:hover fieldset": {
                            borderColor: "whitesmoke",
                            color: "#716c6c"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-disabled": {
                            color: "#8d8d8d",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#8d8d8d"
                            }
                        }
                    }
                }}
                renderInput={(params) => <TextField
                    {...params}
                    label="Role"
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    inputProps={{
                        ...params.inputProps,
                        style: { color: 'white' }
                    }}
                />}
            />

            <div className={styles.btnSubmit}>
                <Button sx={{ color: "white" }} onClick={handleCreateUser} >Créer l'utilisateur </Button>
            </div>
        </div>
    )
}

const role = [
    { label: 'Utilisateur' },
    { label: 'Admin' },

]

export default Creer
