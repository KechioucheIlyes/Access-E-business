import React, { useEffect, useState } from 'react'
import styles from "./../Creer/creer.module.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import ConfirmationSuppression from "./../../../components/ConfirmationSuppression/ConfirmationSuppression"

const Supprimer = () => {
    const [nomEntreprise, setNomEntreprise] = useState('')
    const [resultatPapers, setResultatPapers] = useState([])
    const [allResult, setAllResult] = useState([])
    const [clients, setClients] = useState([])
    const [siret, setSiret] = useState('')
    const [raisonSociale, setRaisonSociale] = useState('')
    const [formeJuridique, setFormeJuridique] = useState('')
    const [codeNaf, setCodeNaf] = useState('')
    const [adressePostale, setAdressePostale] = useState('')
    const [ville, setVille] = useState('')
    const [codePostale, setCodePostale] = useState('')
    const [secteurActivite, setSecteurActivite] = useState('')
    const [userID, setUserID] = useState()
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [utilisateurs, setUtilisateurs] = useState([])
    const [etudes, setEtudes] = useState([])
    const [clientID, setClientID] = useState([])
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
        if (clientID && userID) {
            const formData = {
                clientID,
                user_id: userID,
                etudes
            };
            try {
                const res = await fetch("/api/crud/admin/delete/client", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                if (res.ok) {
                    const data = await res.json();
                    setNotificationValid(true);
                    setNotificationError(false);
                    setMessageValid(data.message);
                } else {
                    setNotificationValid(false);
                    setNotificationError(true);
                    setMessageError("Erreur lors de la suppression du client !");
                }
            } catch (error) {
                setNotificationValid(false);
                setNotificationError(true);
                setMessageError("Erreur lors de la suppression du client !");
                console.log(error);
            }
        }
        setOpen(false); // Fermer le dialogue après l'action
    };

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    useEffect(() => {
        //FETCHING CLIENTS
        const fetchinData = async () => {
            try {
                const res = await fetch("/api/crud/admin/get-all/clients/all", { method: 'GET' })
                if (res.ok) {
                    const data = await res.json()
                    setClients(data.clients.map(client => {

                        return client
                    }))
                    setAllResult(data.clients)

                } else {
                    console.log("Erreur l'or de la recuperation des données ! ")
                }
            } catch (error) {
                console.log(error)
            }

        }

        fetchinData()

    }, [])

    const handleModifyeClient = async () => {
        setOpen(true)

    }


    const handleSelectedEntreprise = (_, newValue) => {
        if (newValue) {
            const infosEntreprise = allResult.filter(entreprise => entreprise.id == newValue.id)

            setClientID(infosEntreprise[0].id)
            setSiret(infosEntreprise[0] ? infosEntreprise[0].siret : '')
            setRaisonSociale(infosEntreprise[0] ? infosEntreprise[0].nom_entreprise : '')
            setFormeJuridique(infosEntreprise[0] ? infosEntreprise[0].forme_juridique : '')
            setCodeNaf(infosEntreprise[0] ? infosEntreprise[0].code_naf : '')
            setSecteurActivite(infosEntreprise[0] ? infosEntreprise[0].secteur_activite : '')
            setVille(infosEntreprise[0] ? infosEntreprise[0].ville : '')
            setCodePostale(infosEntreprise[0] ? infosEntreprise[0].code_postal : '')
            setAdressePostale(infosEntreprise[0] ? `${infosEntreprise[0].adresse_postal}` : '')
            setUtilisateurs([infosEntreprise[0].User])
            setEtudes(infosEntreprise[0].Etudes.map(etude => {
                return etude.id
            }))


        } else {
            setSiret("")
            setRaisonSociale("")
            setFormeJuridique("")
            setCodeNaf("")
            setSecteurActivite("")
            setVille("")
            setCodePostale("")
            setAdressePostale("")
            setUtilisateurs([])
            setClientID('')
            setEtudes([])
        }
    }


    const handleChangeUser = (_, value) => {
        if (value) {
            setUserID(value.id)
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
                <h1>Supprimer un client</h1>
            </div>

            <Autocomplete
                onChange={handleSelectedEntreprise}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option ? `${option.nom_entreprise} ` : 'Sans nom'}
                    </li>
                )}
                disablePortal
                id="combo-box-demo"
                options={clients ? clients : null}
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
                    autoComplete={'off'}
                    {...params}
                    label="Nom Entreprise"
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    inputProps={{
                        ...params.inputProps,
                        style: { color: 'white' }
                    }}
                />}
            />
            <TextField onChange={(e) => { setSiret(e.target.value) }} disabled={true} value={siret ? siret : ''} id="outlined-basic" label="Siret" variant="outlined" sx={{
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

            <TextField onChange={(e) => { setRaisonSociale(e.target.value) }} disabled={true} value={raisonSociale ? raisonSociale : ''} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
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

            <TextField onChange={(e) => { setFormeJuridique(e.target.value) }} disabled={true} value={formeJuridique ? formeJuridique : ''} id="outlined-basic" label="Forme juridique" variant="outlined" sx={{
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
            <TextField onChange={(e) => { setCodeNaf(e.target.value) }} disabled={true} value={codeNaf ? codeNaf : ''} id="outlined-basic" label="Code naf" variant="outlined" sx={{
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

            <TextField onChange={(e) => { setAdressePostale(e.target.value) }} disabled={true} value={adressePostale ? adressePostale : ''} id="outlined-basic" label="Adresse postal" variant="outlined" sx={{
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
            <TextField onChange={(e) => { e.target.value }} disabled={true} value={ville ? ville : ''} id="outlined-basic" label="Ville" variant="outlined" sx={{
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

            <TextField onChange={(e) => { setCodePostale(e.target.value) }} disabled={true} value={codePostale ? codePostale : ''} id="outlined-basic" label="Code postal" variant="outlined" sx={{
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

            <TextField onChange={(e) => { setSecteurActivite(e.target.value) }} disabled={true} value={secteurActivite ? secteurActivite : ''} id="outlined-basic" label="Secteur d'activité" variant="outlined" sx={{
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
                onChange={handleChangeUser}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option.name} {option.prenom}
                    </li>
                )}
                disablePortal
                id="combo-box-demo"
                options={utilisateurs ? utilisateurs : null}
                getOptionLabel={(option) => `${option ? `${option.name} ${option.prenom} ` : 'Sans nom'}`}
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
                    autoComplete={'off'}
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

            <div className={styles.btnSubmit}>
                <Button onClick={handleModifyeClient} sx={{ color: "white" }} >Supprimer le Client</Button>
            </div>

        </div>
    )
}

export default Supprimer