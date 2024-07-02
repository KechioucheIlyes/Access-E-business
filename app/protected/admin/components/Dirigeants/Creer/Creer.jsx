import React, { useEffect, useState } from 'react'
import styles from "./creer.module.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
const Creer = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [clients, setClients] = useState([])
    const [clientID, setClientID] = useState(null)
    const [signataire, setSignataire] = useState()
    const [decisionnaire, setDecisionnaire] = useState()
    const [civilite, setCivilite] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [fixe, setFixe] = useState('')
    const [fonction, setFonction] = useState('')


    const handleCivilite = (_, civilite) => {
        if (civilite) {
            setCivilite(civilite.label)
        } else {
            setCivilite('')
        }
    }

    const handleSignataire = (_, signataire) => {
        if (signataire) {
            signataire.label === "Oui" ? setSignataire(true) : setSignataire(false)
        } else {
            setSignataire()
        }
    }
    const handleDecisionnaire = (_, decisionnaire) => {
        if (decisionnaire) {
            decisionnaire.label === "Oui" ? setDecisionnaire(true) : setDecisionnaire(false)
        } else {
            setDecisionnaire()
        }
    }


    const handleUserChange = (_, newValue) => {
        if (newValue) {
            setClientID(newValue.id)
        } else {
            setClientID()
        }
    }

    useEffect(() => {
        const fetchinClients = async () => {
            try {
                const res = await fetch("/api/crud/admin/get-all/clients/all", {
                    method: "GET"
                })
                if (res.ok) {
                    const data = await res.json()
                    const clients = data.clients

                    setClients(clients.map(client => {
                        return client
                    }))

                } else {
                    console.log("Un probleme est survenue l'or de la recuperation des clients !")
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchinClients()
    }, [])

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    const handleCreateDirigeant = async () => {

        if (!nom || !prenom || !civilite || !email || !mobile || !fixe || !fonction || !clientID || signataire == undefined || decisionnaire == undefined) {
            setMessageError('tout les champs sont obligatoire !')
            setNotificationError(true)
        } else {
            setMessageError('')
            setNotificationError(false)
            const formData = {
                nom,
                prenom,
                civilite,
                email,
                mobile,
                fixe,
                fonction,
                signataire,
                decisionnaire,
                clientID
            }

            try {
                const res = await fetch('/api/crud/admin/create/dirigeant', {
                    method: 'POST',
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
                    setMessageError("Une erreur s'est produite l'or de la creation du dirigeant !")
                }

            } catch (error) {
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Une erreur s'est produite l'or de la creation du dirigeant !")
            }
        }
    }

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
                <h1>Creer un Dirigeant </h1>
            </div>

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

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Civilite}
                onChange={handleCivilite}
                sx={{
                    color: "white",
                    width: 300,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "whitesmoke",
                        },
                        "&:hover fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-disabled": {
                            color: "#716c6c",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#716c6c"
                            }
                        }
                    }
                }}
                renderInput={(params) => <TextField {...params} label="Civilité" InputLabelProps={{
                    style: { color: 'white' },
                }}
                    inputProps={{
                        ...params.inputProps,
                        style: { color: 'white' }
                    }} />}
            />

            <TextField onChange={(e) => { setEmail(e.target.value) }} id="outlined-basic" label="Email" type='email' variant="outlined" sx={{
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

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Signataire}
                onChange={handleSignataire}
                sx={{
                    color: "white",
                    width: 300,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "whitesmoke",
                        },
                        "&:hover fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-disabled": {
                            color: "#716c6c",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#716c6c"
                            }
                        }
                    }
                }}
                renderInput={(params) => <TextField {...params} label="Signataire" InputLabelProps={{
                    style: { color: 'white' },
                }}
                    inputProps={{
                        ...params.inputProps,
                        style: { color: 'white' }
                    }} />}
            />


            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={Décisionnaire}
                onChange={handleDecisionnaire}
                sx={{
                    color: "white",
                    width: 300,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "whitesmoke",
                        },
                        "&:hover fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-disabled": {
                            color: "#716c6c",
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#716c6c"
                            }
                        }
                    }
                }}
                renderInput={(params) => <TextField {...params} label="Décisionnaire" InputLabelProps={{
                    style: { color: 'white' },
                }}
                    inputProps={{
                        ...params.inputProps,
                        style: { color: 'white' }
                    }} />}
            />
            <Autocomplete
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.nom_entreprise ? option.nom_entreprise : "Sans nom"}
                    </li>
                )}
                onChange={handleUserChange}
                disablePortal
                id="combo-box-demo"
                options={clients}
                getOptionLabel={(option) => `${option ? `${option.nom_entreprise} ` : 'Sans nom'}`}
                sx={{
                    color: "white",
                    width: 300,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "whitesmoke",
                        },
                        "&:hover fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "whitesmoke",
                            color: "whitesmoke"
                        },
                    }
                }}
                renderInput={(params) => <TextField

                    {...params}
                    label="Client"
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
                <Button onClick={handleCreateDirigeant} sx={{ color: "white" }} >Creer le Dirigeant</Button>
            </div>
        </div>

    )
}
const Signataire = [
    { label: 'Oui' },
    { label: 'Non' }
]
const Décisionnaire = [
    { label: 'Oui' },
    { label: 'Non' }
]
const Civilite = [
    { label: 'Homme' },
    { label: 'Femme' }
]
export default Creer