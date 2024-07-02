import React, { useEffect, useState } from 'react'
import styles from "./../Creer/creer.module.css"
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
const Modifier = () => {
    const [etudes, setEtudes] = useState([])
    const [etudesAll, setEtudesAll] = useState()
    const [typeEtude, setTypeEtude] = useState('')
    const [statutEtude, setstatutEtude] = useState('')
    const [dateDebut, setDateDebut] = useState('')
    const [dateFin, setDateFin] = useState('')
    const [nomEtude, setNomEtude] = useState('')
    const [clients, setClients] = useState(null)
    const [clientsID, setClientsID] = useState(null)
    const [etudeID, setEtudeID] = useState(null)
    const [changedStatutEtude, setChangedStatutEtude] = useState('')
    const [changedTypeEtude, setChangedTypeEtude] = useState('')
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    const handleModify = async () => {
        setMessageValid('')

        const formData = {
            etudeID: etudeID,
            nomEtude: nomEtude,
            typeEtude: typeEtude == '' ? changedTypeEtude : typeEtude,
            statutEtude: statutEtude == '' ? changedStatutEtude : statutEtude,
            selectedClientId: clientsID
        }
        try {
            const res = await fetch("/api/crud/admin/update/etude", {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                const data = await res.json()

                setNotificationValid(true)
                setNotificationError(false)
                setMessageValid(data.message)

            } else {
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("une erreur s'est produite l'or de la modification de l'étude !")
            }
        } catch (error) {
            setNotificationError(true)
            setMessageError("une erreur s'est produite l'or de la modification de l'étude !")
        }
    }

    const handleChangedStatut = (e) => {
        setstatutEtude('')
        setChangedStatutEtude(e.target.value)
    }
    const handleChangedType = (e) => {
        setTypeEtude('')
        setChangedTypeEtude(e.target.value)
    }


    const handleSelectedEtude = (event, value) => {
        if (value) {
            alert(value.nom_etude)
            setNomEtude(value.nom_etude)
            const etude = etudesAll.filter(etude => etude == value)
            setEtudeID(etude[0].id)
            setTypeEtude(etude[0].type)
            setstatutEtude(etude[0].statut)
            setDateDebut(etude[0].date_debut)
            setDateFin(etude[0].date_fin)
            setClients(etude[0].Clients.siret)
            setClientsID(etude[0].Clients.id)

        }
        else {
            setTypeEtude('')
            setstatutEtude('')
            setDateDebut('')
            setDateFin('')
            setClients('')
            setChangedStatutEtude('')
            setChangedTypeEtude('')
        }

    }

    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch("/api/crud/admin/get-all/etudes/to-modify", {
                    method: "GET",
                    headers: {
                        'Accept': "application/json"
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setEtudes(data.etudes.map((nomEtude, index) => {
                        return nomEtude
                    }))

                    setEtudesAll(data.etudes)

                } else {
                    return
                }
            } catch (error) {
                console.log(error)
            }

        }

        fetchData()
    }, [])
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
                <h1>Modifier une Étude </h1>
            </div>
            <div className={styles.creerMain}>
                <div className={styles.textField}>
                    <Autocomplete
                        onChange={handleSelectedEtude}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {option.nom_etude}
                            </li>
                        )}
                        disablePortal
                        id="combo-box-demo"
                        options={etudes ? etudes : null}
                        getOptionLabel={(option) => `${option ? `${option.nom_etude}` : 'Sans nom'}`}
                        sx={{
                            marginTop: '15px',
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
                            key={etudes}
                            label="Études"
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            inputProps={{
                                ...params.inputProps,
                                style: { color: 'white' }
                            }}
                        />}
                    />

                    <TextField onChange={handleChangedType} value={typeEtude ? typeEtude : changedTypeEtude} id="outlined-basic" label="Type d'étude" variant="outlined" sx={{
                        marginTop: '15px',
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

                    <TextField onChange={handleChangedStatut} value={statutEtude ? statutEtude : changedStatutEtude} id="outlined-basic" label="statut" variant="outlined" sx={{
                        marginTop: '15px',
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

                    <TextField value={clients ? clients : ''} id="outlined-basic" disabled={clients ? true : false} label="Siren Client" variant="outlined" sx={{
                        marginTop: '15px',
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

                </div>
            </div>

            <div className={styles.btnSubmit}>
                <Button sx={{ marginTop: '15px', color: "white" }} onClick={() => { handleModify() }} >Modifier l'étude</Button>
            </div>

        </div>
    )
}
const status = [
    { label: 'en cours' },
    { label: 'terminé' },
    { label: 'clause gagnée' },
    { label: 'clause perdue' },
]



export default Modifier