import React, { useEffect, useState } from 'react'
import styles from "./creer.module.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';

const Creer = () => {
    const [nomEntreprise, setNomEntreprise] = useState('')
    const [resultatPapers, setResultatPapers] = useState([])
    const [allResult, setAllResult] = useState([])
    const [utilisateurs, setUtilisateurs] = useState([])
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

    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    useEffect(() => {
        const fetchinData = async () => {
            try {
                const res = await fetch("/api/crud/admin/get-all/clients", { method: 'GET' })
                if (res.ok) {
                    const data = await res.json()
                    setUtilisateurs(data.verifiedClients.map(user => {
                        return user
                    }))

                } else {
                    console.log("Erreur l'or de la recuperation des données ! ")
                }
            } catch (error) {
                console.log(error)
            }

        }

        fetchinData()
    }, [])

    const handleSelectedEntreprise = (_, newValue) => {
        
        const infosEntreprise = allResult.filter(entreprise => entreprise.nom_entreprise == newValue)
        setSiret(infosEntreprise[0] ? infosEntreprise[0].siren : '')
        setRaisonSociale(infosEntreprise[0] ? infosEntreprise[0].nom_entreprise : '')
        setFormeJuridique(infosEntreprise[0] ? infosEntreprise[0].forme_juridique : '')
        setCodeNaf(infosEntreprise[0] ? infosEntreprise[0].code_naf : '')
        setSecteurActivite(infosEntreprise[0] ? infosEntreprise[0].domaine_activite : '')
        setVille(infosEntreprise[0] ? infosEntreprise[0].siege.ville : '')
        setCodePostale(infosEntreprise[0] ? infosEntreprise[0].siege.code_postal : '')
        setAdressePostale(infosEntreprise[0] ? `${infosEntreprise[0].siege.adresse_ligne_1} ${infosEntreprise[0].siege.complement_adresse}` : '')
    }
    const handleChangeUser = (_, selectedValue) => {
        setUserID(selectedValue.id)

    }
    const handleChange = async (e) => {
        setNomEntreprise(e.target.value)
        const formData = {
            nomEntreprise
        }

        try {
            const res = await fetch("/api/papers", {
                method: 'POST', headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const data = await res.json()
                const nomEntreprise = data.data.resultats_nom_entreprise

                setResultatPapers(nomEntreprise.map(el => {
                    return el.nom_entreprise
                }))
                setAllResult(data.data.resultats_nom_entreprise)
            }
        } catch (error) {
            console.log(error)
        }

    }


    const handleCreateClient = async () => {
        const formData = {
            siret,
            nom_entreprise: nomEntreprise,
            raison_sociale: raisonSociale,
            forme_juridique: formeJuridique,
            code_naf: codeNaf,
            adresse_postal: adressePostale,
            ville,
            code_postal: codePostale,
            user_id: userID,
            secteur_activite: secteurActivite,
        }
        try {
            const res = await fetch("/api/crud/admin/create/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                setMessageError("Erreur l'or de la création du Client !")
            }
        } catch (error) {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Erreur l'or de la création du Client !")
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
                <h1>Créer un Client </h1>
            </div>


            <Autocomplete
                onChange={handleSelectedEntreprise}
                renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                        {option}
                    </li>
                )}
                disablePortal
                id="combo-box-demo"
                options={resultatPapers}
                getOptionLabel={(option) => `${option ? `${option} ` : 'Sans nom'}`}
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
                    onChange={handleChange}
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

            <TextField value={siret ? siret : ''} id="outlined-basic" label="Siret" variant="outlined" sx={{
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

            <TextField value={raisonSociale ? raisonSociale : ''} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
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

            <TextField value={formeJuridique ? formeJuridique : ''} id="outlined-basic" label="Forme juridique" variant="outlined" sx={{
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
            <TextField value={codeNaf ? codeNaf : ''} id="outlined-basic" label="Code naf" variant="outlined" sx={{
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

            <TextField value={adressePostale ? adressePostale : ''} id="outlined-basic" label="Adresse postal" variant="outlined" sx={{
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
            <TextField value={ville ? ville : ''} id="outlined-basic" label="Ville" variant="outlined" sx={{
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

            <TextField value={codePostale ? codePostale : ''} id="outlined-basic" label="Code postal" variant="outlined" sx={{
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

            <TextField value={secteurActivite ? secteurActivite : ''} id="outlined-basic" label="Secteur d'activité" variant="outlined" sx={{
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
                    onChange={handleChange}
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
                <Button onClick={handleCreateClient} sx={{ color: "white" }} >Créer le Client</Button>
            </div>
        </div>

    )
}

export default Creer