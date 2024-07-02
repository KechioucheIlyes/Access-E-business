import React, { useEffect, useState } from 'react'
import styles from "./../Creer/creer.module.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import ConfirmationSuppressionDirigeant from "./../../ConfirmationSuppressionDirigeant/ConfirmationSuppressionDirigeant"

const Supprimer = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [open, setOpen] = useState(false)
    const [agree, setAgree] = useState(false)
    const [desagree, setDesagree] = useState(false)
    const [resultats, setResultats] = useState([])
    const [resultatID, setResultatID] = useState(null)


    const handleEtude = (_, newValue) => {
        if (newValue) {
            setResultatID(newValue.id)
        } else {
            setResultatID(null)
        }
    }

    useEffect(() => {
        const fetchinResult = async () => {
            const res = await fetch("/api/crud/admin/get-all/resultats")
            if (res.ok) {
                const data = await res.json()
                setResultats(data.resultats)
            } else {
                return
            }
        }
        fetchinResult()
    }, [])


    const handleDisagree = () => {
        setDesagree(true)
        setAgree(false)
        handleClose();
    };

    const handleDeleteDirigeant = () => {
        if (resultatID) {
            setOpen(true)
        } else {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Vous devez séléctionner un dirigeant pour pouvoir le supprimer !")
        }
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleAgree = async () => {
        const formData = {
            resultatID
        }
        try {
            const res = await fetch("/api/crud/admin/delete/resultat", {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
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
                setMessageError("Une erreur s'est produite l'or de la suppression du Resultat !")
            }
        } catch (error) {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Une erreur s'est produite l'or de la suppression du Resultat !")
        }
        setOpen(false);
    }

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };
    return (
        <div className={`${styles.creer} ${styles.backgroungCreer}`}>
            <ConfirmationSuppressionDirigeant open={open} handleClose={handleClose} handleDisagree={handleDisagree} handleAgree={handleAgree} />

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
                <h1>Supprimer un Resultat</h1>
            </div>
            <div className={styles.input}>
                <Autocomplete
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.etude.nom_etude ? option.etude.nom_etude : "Sans nom"}
                        </li>
                    )}
                    onChange={handleEtude}
                    disablePortal
                    id="combo-box-demo"
                    options={resultats}
                    getOptionLabel={(option) => `${option ? `${option.etude.nom_etude} ` : 'Sans nom'}`}
                    sx={{
                        margin: "5px",
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
                        label="Étude"
                        InputLabelProps={{
                            style: { color: 'white' },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            style: { color: 'white' }
                        }}
                    />}
                />
            </div>

            <div className={styles.btnSubmit}>
                <Button onClick={handleDeleteDirigeant} sx={{ color: "white" }} >Supprimer le resultat</Button>
            </div>
        </div>
    )
}

export default Supprimer