import React, { useEffect, useState } from 'react'
import styles from "./supprimer.module.css"
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
import { Autocomplete, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import ConfirmationSuppressionFilleul from "./../../ConfirmationSuppressionFilleul/ConfirmationSuppressionFilleul"

const Supprimer = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [filleuls, setFilleulfs] = useState([])
    const [filleulID, setFilleulID] = useState(null)
    const [open, setOpen] = useState(false)
    const [agree, setAgree] = useState(false)
    const [desagree, setDesagree] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleDisagree = () => {
        setDesagree(true)
        setAgree(false)
        handleClose();
    };

    const handleAgree = async () => {

        if (!filleulID) {
            setMessageError('vous devez choisir un dirigeant !')
            setNotificationError(true)
        } else {
            if (filleulID) {
                try {
                    const formData = {
                        filleulID
                    }
                    const res = await fetch("/api/crud/admin/delete/filleul", {
                        method: "DELETE",
                        headers: {
                            'content-type': "application/json"
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
                        setMessageError("Une erreur s'est produite l'or de la suppression du filleul !")
                    }
                } catch (error) {
                    setNotificationValid(false)
                    setNotificationError(true)
                    setMessageError("Une erreur s'est produite l'or de la suppression du filleul !")
                }

            } else {
                setOpen(false);
            }
            setOpen(false);
        };
    }

    const handleDeleteFilleul = async () => {
        if (filleulID) {
            setOpen(true)
        } else {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Vous devez séléctionner un filleul pour pouvoir le supprimer !")
        }


    }

    const handleSelectedFilleul = (_, filleul) => {
        if (filleul) {

            setFilleulID(filleul.id)
        } else {

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
            <ConfirmationSuppressionFilleul open={open} handleClose={handleClose} handleDisagree={handleDisagree} handleAgree={handleAgree} />

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
                <h1>Supprimer un filleul </h1>
            </div>
            <div className={styles.supp}>
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
            </div>

            <div className={styles.btnSubmit}>
                <Button sx={{ color: "white" }} onClick={handleDeleteFilleul} >Supprimer le filleul </Button>
            </div>
        </div>
    )
}

export default Supprimer