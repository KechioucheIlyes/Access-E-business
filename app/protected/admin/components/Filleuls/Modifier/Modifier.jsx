import React, { useEffect, useState } from 'react'
import styles from "./../Creer/creer.module.css"
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
const Modifier = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [filleuls, setFilleulfs] = useState([])
    const [raisonSociale, setRaisonSociale] = useState('')
    const [secteurActivite, setsecteurActivite] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [email, setEmail] = useState('')
    const [fixe, setFixe] = useState('')
    const [mobile, setMobile] = useState('')
    const [users, setUsers] = useState([])
    const [pourcentages, setPourcentages] = useState('')
    const [dateLien, setDateLien] = useState('')
    const [dateAvantage, setDateAvantage] = useState('')
    const [userID, setUserID] = useState(null)
    const [filleulID, setFilleulID] = useState(null)




    const handleUpdateFilleul = async () => {

        const formData = {
            raisonSociale,
            secteurActivite,
            nom,
            prenom,
            fonction,
            email,
            fixe,
            mobile,
            pourcentages,
            dateLien,
            dateAvantage,
            filleulID
        }

        try {
            const res = await fetch('/api/crud/admin/update/filleul', {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const data = await res.json()
                setNotificationValid(true)
                setNotificationError(false);
                setMessageValid(data.message)
            } else {
                setNotificationValid(false)
                setNotificationError(true);
                setMessageError("Erreur l'or de la modification de l'étude veuillez reessayer plus tard !")
            }
        } catch (error) {
            setNotificationValid(false)
            setNotificationError(true);
            setMessageError("Erreur l'or de la modification de l'étude veuillez reessayer plus tard !")
        }

    }

    const handleSelectedFilleul = (_, filleul) => {
        if (filleul) {
            setRaisonSociale(filleul.raison_sociale)
            setsecteurActivite(filleul.secteur_activite)
            setNom(filleul.nom)
            setPrenom(filleul.prenom)
            setFonction(filleul.fonction)
            setEmail(filleul.email)
            setFixe(filleul.fixe)
            setMobile(filleul.mobile)
            setPourcentages(filleul.pourcentage_promo)
            setDateLien(filleul.date_expiration)
            setDateAvantage(filleul.date_expiration_avantage)
            setFilleulID(filleul.id)
        } else {
            setRaisonSociale('')
            setsecteurActivite('')
            setNom('')
            setPrenom('')
            setFonction('')
            setEmail('')
            setFixe('')
            setMobile('')
            setPourcentages('')
            setDateLien('')
            setDateAvantage('')
            setFilleulID(null)
        }
    }


    useEffect(() => {
        const fetchingFilleuls = async () => {

            try {
                const res = await fetch('/api/crud/admin/get-all/filleuls', {
                    method: "GET"
                })

                if (res.ok) {
                    const data = await res.json()
                    setFilleulfs(data.allFilleuls)

                }
                else {
                    console.log("une erreur s'est produite l'or de la recuperation des filleuls")
                }
            } catch (error) {
                console.log("une erreur s'est produite l'or de la recuperation des filleuls")
            }
        }

        fetchingFilleuls()
    }, [notificationValid, notificationError])

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
                <h1>Modifier un filleul </h1>
            </div>

                <Autocomplete
                    onChange={handleSelectedFilleul}
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.nom} {option.prenom}
                        </li>
                    )}
                    disablePortal
                    id="combo-box-demo"
                    options={filleuls ? filleuls : null}
                    getOptionLabel={(option) => `${option ? `${option.nom} ${option.prenom}` : 'Sans nom'}`}
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
                        key={filleuls}
                        label="Filleul"
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            style: { color: 'white' }
                        }}
                    />}
                />

                <TextField onChange={(e) => { setRaisonSociale(e.target.value) }} value={raisonSociale ? raisonSociale : ""} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
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

                <TextField onChange={(e) => { setsecteurActivite(e.target.value) }} value={secteurActivite ? secteurActivite : ""} id="outlined-basic" label="Secteur d'activité" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setNom(e.target.value) }} value={nom ? nom : ""} id="outlined-basic" label="Nom" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setPrenom(e.target.value) }} value={prenom ? prenom : ""} id="outlined-basic" label="Prenom" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setFonction(e.target.value) }} value={fonction ? fonction : ""} id="outlined-basic" label="Fonction" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setEmail(e.target.value) }} value={email ? email : ""} id="outlined-basic" label="Email" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setFixe(e.target.value) }} value={fixe ? fixe : ""} id="outlined-basic" label="Fixe" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setMobile(e.target.value) }} value={mobile ? mobile : ""} id="outlined-basic" label="Mobile" variant="outlined" sx={{
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


                <TextField onChange={(e) => { setDateLien(e.target.value) }} value={dateLien ? dateLien : ""} id="outlined-basic" label="Date expiration lien" variant="outlined" sx={{
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

                <TextField onChange={(e) => { setDateAvantage(e.target.value) }} value={dateAvantage ? dateAvantage : ""} id="outlined-basic" label="Date expiration avantage" variant="outlined" sx={{
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
                <TextField onChange={(e) => { setPourcentages(e.target.value) }} value={pourcentages ? pourcentages : ""} id="outlined-basic" label="Pourcentage" variant="outlined" sx={{
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
                <Button sx={{ color: "white" }} onClick={handleUpdateFilleul} >Modifier le filleul </Button>
            </div>
        </div>
    )
}


export default Modifier