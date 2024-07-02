import React, { useEffect, useState } from 'react'
import styles from "./../Creer/creer.module.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import ConfirmationSuppression from "./../../../components/ConfirmationSuppressionContrat/ConfirmationSuppressionContrat"
const Supprimer = () => {

    const [ref, setRef] = useState('')
    const [contrat, setContrat] = useState([])
    const [contratID, setContratID] = useState(null)
    const [nom_site, setnomSite] = useState()
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
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
        if (!contratID) {
            setMessageError('vous devez choisir un contrat !')
            setNotificationError(true)
        } else {
            const formData = {
                contratID,
            }
            try {
                const res = await fetch("/api/crud/admin/delete/contrat", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify(formData)
                })

                if (res.ok) {
                    const data = await res.json()
                    setNotificationValid(true)
                    setMessageValid(data.message)
                    setNotificationError(false)
                } else {
                    setNotificationValid(false)
                    setNotificationError(true)
                    setMessageError("Erreur l'or de la modification du Contrat !")
                }
            } catch (error) {
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Erreur l'or de la modification du Contrat !")
            }
        }
        setOpen(false);
    }

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    const handleDeleteContrat = async () => {
        setOpen(true)
    }


    useEffect(() => {
        const fetchinContrat = async () => {
            try {
                const response = await fetch('/api/crud/admin/get-all/contrats');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setContrat(data.allContrats)
                    }
                }
            }
            catch (error) {
                console.log(error)
            }

        }

        fetchinContrat()


    }, [])

    const handleUserChange = (_, newValue) => {
        if (newValue) {
            setContratID(newValue.id)
        } else {
            setContratID('')
        }
    }
    return (
        <div className={`${styles.creer} ${styles.backgroungCreer}`}>
            <ConfirmationSuppression open={open} handleClose={handleClose} handleDisagree={handleDisagree} handleAgree={handleAgree} />
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
                <h1>Supprimer un contrat </h1>
            </div>

            <Autocomplete
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.nom_site}
                    </li>
                )}
                onChange={handleUserChange}
                disablePortal
                id="combo-box-demo"
                options={contrat}
                getOptionLabel={(option) => `${option ? ` ${option.nom_site} ` : 'Sans nom'}`}
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
                    label="Contrat"
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
                <Button onClick={handleDeleteContrat} sx={{ color: "white" }} >Supprimer le Contrat</Button>
            </div>
        </div>
    )
}

export default Supprimer