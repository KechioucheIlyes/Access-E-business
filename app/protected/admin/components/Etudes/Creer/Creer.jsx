import React, { useEffect, useState } from 'react'
import styles from "./creer.module.css"
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
const Creer = () => {
    const [nomEtude, setNomEtude] = useState("")
    const [typeEtude, setTypeEtude] = useState("")
    const [statutEtude, setStatutEtude] = useState("")
    const [clientEtude, setClientEtude] = useState("")
    const [commissionEtude, setCommissiontEtude] = useState("")
    const [contratEtude, setContratEtude] = useState("")
    const [ResultatEtude, setResultatEtude] = useState("")
    const [commission, setCommission] = useState([])
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const handleSelection = (event, value) => {
        if (value) {
            setSelectedClientId(value.id);
        }
    };
    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };



    const handleCreateEtude = async () => {
        setMessageValid('')
        const formData = {
            nomEtude,
            typeEtude,
            statutEtude,
            selectedClientId
        }
        try {
            const res = await fetch("/api/crud/admin/create/etude", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
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
                setMessageError("Erreur l'or de la cration de l'étude veuillez reessayer plus tard !")
            }
        } catch (error) {
            setNotificationValid(false)
            setNotificationError(true);
            setMessageError("Erreur l'or de la cration de l'étude veuillez reessayer plus tard !")
        }


    }
    const handleUserChange = (event, value) => {

        setSelectedUser(value);
        const filteredClients = users.filter(users => users.name === value)

        let newClients = []
        filteredClients.forEach(client => {
            if (client.Clients && client.Clients.length > 0) {
                client.Clients.forEach(clientDetail => {
                    newClients.push(clientDetail);
                });
            }
        });
        setClients(newClients)

    };
    useEffect(() => {
        const fetchinData = async () => {

            const res = await fetch("/api/crud/admin/get-all/clients")

            if (res.ok) {
                const data = await res.json()
                setUsers(data.verifiedClients.map(userName => {

                    return userName

                }))


            }
            else {
                return
            }

        }

        fetchinData()

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
                <h1>Creer une Étude </h1>
            </div>
            <div className={styles.creerMain}>
                <div className={styles.textField}>


                    <TextField id="outlined-basic" onChange={(e) => { setNomEtude(e.target.value) }} label="Nom d'étude" variant="outlined" sx={{ marginTop : '15px',
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

                    <TextField id="outlined-basic" onChange={(e) => { setTypeEtude(e.target.value) }} label="Type d'étude" variant="outlined" sx={{ marginTop : '15px',
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
                        onChange={(event, newValue) => {
                            setStatutEtude(newValue ? newValue.label : "");
                        }}
                        disablePortal
                        id="combo-box-demo"
                        options={status}
                        sx={{ marginTop : '15px',
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
                            label="Statut"
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            inputProps={{
                                ...params.inputProps,
                                style: { color: 'white' }
                            }}
                        />}
                    />
                    <Autocomplete
                        key={users.map(el => { return el.id })}
                        disablePortal
                        id="combo-box-demo"
                        options={users.map(el => { return el.name })}
                        onChange={handleUserChange}
                        sx={{ marginTop : '15px',
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
                            label="Utilisateur"
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            inputProps={{
                                ...params.inputProps,
                                style: { color: 'white' }
                            }}
                        />}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={clients.map(client => ({
                            label: client.siret,
                            id: client.id
                        }))}
                        onChange={handleSelection}
                        sx={{ marginTop : '15px',
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
                            label="Siren Client"
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
            </div>
            <div className={styles.btnSubmit}>
                <Button sx={{ marginTop : '15px', color: "white" }} onClick={handleCreateEtude} >Creer l'étude</Button>
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



export default Creer