import React, { useEffect, useState } from 'react'
import styles from "./../Creer/creer.module.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';




const Modifier = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [clients, setClients] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [ref, setRef] = useState('')
    const [commission, setCommission] = useState([])
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [courtage, setCourtage] = useState(false)
    const [turpe, setTurpe] = useState(false)
    const [logiciel, setLogiciel] = useState(false)
    const [gtb, setGTB] = useState(false)
    const [montant_commission_total, setMontant_commission_total] = useState(0)
    const [montant_commission_courtage, setMontant_commission_courtage] = useState(0)
    const [montant_commission_turpe, setMontant_commission_turpe] = useState(0)
    const [montant_commission_cspe, setMontant_commission_cspe] = useState(0)
    const [montant_commission_logiciel, setMontant_commission_logiciel] = useState(0)
    const [montant_commission_gtb, setMontant_commission_gtb] = useState(0)
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')


    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    const handleCreate = async (e) => {

        e.preventDefault()
        setMessageValid('')
        const formData = {
            reference: selectedUser.reference,
            courtage,
            turpe,
            CSPE: selectedUser.Etudes[0].resultats[0].CSPE,
            logiciel,
            GTB: gtb,
            montant_commission_total,
            montant_commission_courtage,
            montant_commission_turpe,
            montant_commission_cspe,
            montant_commission_logiciel,
            montant_commission_gtb,
            user_id: selectedUser.User.id,
            etude_id: selectedUser.Etudes[0].id,
            username: selectedUser.User.name,
            useremail: selectedUser.User.email
        }

        try {
            const res = await fetch("/api/crud/admin/update/commissions", {
                method: "POST",
                'Content-type': 'application/json',
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const data = await res.json()
                setNotificationValid(true)
                setNotificationError(false);
                setMessageValid(data.message)

            } else {
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Erreur l'ors de la modification de la commission !")
            }
        } catch (error) {
            console.log(error)
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Erreur l'ors de la modification de la commission !")
        }


    }

    const handleUserChange = (_, newValue) => {
        if (newValue) {

            setSelectedUser(newValue);
        } else {
            setSelectedUser(null);
            setMontant_commission_total(0)
            setMontant_commission_courtage(0)
            setMontant_commission_turpe(0)
            setMontant_commission_cspe('')
            setMontant_commission_logiciel(0)
            setMontant_commission_gtb(0)


        }

    };

    const handleCheckboxChange = (event) => {

        if (selectedUser) {
            setSelectedUser({ ...selectedUser, checked: event.target.checked });

        }
    };

    useEffect(() => {
        const fetchinData = async () => {

            const res = await fetch("/api/crud/admin/get-all/users-etudes-all")

            if (res.ok) {
                const data = await res.json()
                setCommission(data.commissions)
                setClients(data.commissions.map(etude => {
                    return etude
                }))
            }
            else {
                return
            }


        }

        fetchinData()



    }, [])


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
                <h1>Modifier une commission </h1>
            </div>

            <div className={styles.creer}>

                <Autocomplete
                    renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                            {option.reference}
                        </li>
                    )}
                    onChange={handleUserChange}
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => `${option ? `${option.reference} ` : 'Sans nom'}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
                        label="Réference Commission"
                        InputLabelProps={{
                            style: { color: isFocused ? 'white' : 'white' },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            style: { color: 'white' }
                        }}
                    />}

                />
                <Autocomplete
                    value={selectedUser}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disabled={!selectedUser}
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => `${option ? `${option.Etudes[0].Clients.nom_entreprise} / ${option.Etudes[0].Clients.siret}` : 'Sans nom'}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
                        label="Clients/Siren"
                        InputLabelProps={{
                            style: { color: isFocused ? 'white' : '#716c6c' },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            style: { color: 'white' }
                        }}
                    />}
                />
                <Autocomplete
                    value={selectedUser}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    disablePortal
                    disabled={!selectedUser}
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => `${option.Etudes[0].nom_etude}`}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
                                color: "#716c6c", // Couleur du texte pour les composants désactivés
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#716c6c" // Couleur de la bordure pour les composants désactivés
                                }
                            }
                        }
                    }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Études"
                        InputLabelProps={{
                            style: { color: isFocused ? 'white' : '#716c6c' },
                        }}
                        inputProps={{
                            ...params.inputProps,
                            style: { color: 'white' }
                        }}
                    />}
                />


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 300,
                        '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
                    }}
                >
                    <Sheet sx={{ border: "2px solid white", backgroundColor: "transparent" }} variant="outlined">
                        <Checkbox sx={{ color: "white" }} overlay label="Courtage" onChange={(e) => { setCourtage(e.target.checked) }} />
                    </Sheet>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 300,
                        '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
                    }}
                >
                    <Sheet sx={{ border: "2px solid white", backgroundColor: "transparent" }} variant="outlined">
                        <Checkbox sx={{ color: "white" }} overlay label="Turpe" onChange={(e) => { setTurpe(e.target.checked) }} />
                    </Sheet>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 300,
                        '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
                    }}
                >
                    <Sheet sx={{ border: selectedUser ? selectedUser.CSPE ? "2px solid grey" : "2px solid white" : "2px solid white", backgroundColor: "transparent" }} variant="outlined">
                        <Checkbox disabled={selectedUser ? selectedUser.CSPE ? true : false : false} checked={selectedUser ? selectedUser.CSPE ? true : false : false} onChange={handleCheckboxChange} sx={{
                            color: "white", "&.Mui-disabled": {
                                color: "grey",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "grey"
                                }
                            }
                        }} overlay label="CSPE" />
                    </Sheet>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 300,
                        '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
                    }}
                >
                    <Sheet sx={{ border: "2px solid white", backgroundColor: "transparent" }} variant="outlined">
                        <Checkbox sx={{ color: "white" }} overlay label="Logiciel" onChange={(e) => { setLogiciel(e.target.checked) }} />
                    </Sheet>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: 300,
                        '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
                    }}
                >
                    <Sheet sx={{ border: "2px solid white", backgroundColor: "transparent" }} variant="outlined">
                        <Checkbox sx={{ color: "white" }} overlay label="GTB" onChange={(e) => { setGTB(e.target.checked) }} />
                    </Sheet>
                </Box>
                <TextField onChange={(e) => { setMontant_commission_courtage(e.target.value) }} type='number' id="outlined-basic" label="Montant Courtage" variant="outlined" sx={{ color: "white", width: 300, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, } }} InputLabelProps={{ style: { color: isFocused ? 'white' : 'white' }, }} inputProps={{ style: { color: 'white' }, min: 0 }} />
                <TextField onChange={(e) => { setMontant_commission_turpe(e.target.value) }} type='number' id="outlined-basic" label="Montant TURPE" variant="outlined" sx={{ color: "white", width: 300, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, } }} InputLabelProps={{ style: { color: isFocused ? 'white' : 'white' }, }} inputProps={{ style: { color: 'white' }, min: 0 }} />
                <TextField
                    onChange={(e) => { setMontant_commission_cspe(e.target.value) }}
                    type='number'
                    disabled={selectedUser ? selectedUser.CSPE ? false : true : true}
                    id="outlined-basic"
                    label="Montant CSPE"
                    variant="outlined"
                    sx={{
                        color: "white",
                        width: 300,
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { border: selectedUser ? selectedUser.CSPE ? "2px solid white" : "2px solid white" : "2px solid white" },
                            "&:hover fieldset": { borderColor: "#716c6c", color: "red" },
                            "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "red" },
                            "&.Mui-disabled": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#716c6c"
                                }
                            }
                        }
                    }} InputLabelProps={{
                        style: {
                            color: selectedUser ? !selectedUser.CSPE ? 'grey' : 'white' : 'white'  }, }} inputProps={{ style: { color: 'white' }, min: 0 }} />
                                <TextField onChange = { (e) => { setMontant_commission_logiciel(e.target.value) }} value={montant_commission_logiciel ? montant_commission_logiciel : ''} type='number' id="outlined-basic" label="Montant Logiciel" variant="outlined" sx={{ color: "white", width: 300, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, } }} InputLabelProps={{ style: { color: isFocused ? 'white' : 'white' }, }} inputProps={{ style: { color: 'white' }, min: 0 }} />
                <TextField onChange={(e) => { setMontant_commission_gtb(e.target.value) }} value={montant_commission_gtb ? montant_commission_gtb : ''} type='number' id="outlined-basic" label="Montant GTB" variant="outlined" sx={{ color: "white", width: 300, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, } }} InputLabelProps={{ style: { color: isFocused ? 'white' : 'white' }, }} inputProps={{ style: { color: 'white' }, min: 0 }} />
                <TextField onChange={(e) => { setMontant_commission_total(e.target.value) }} value={montant_commission_total ? montant_commission_total : ''} type='number' id="outlined-basic" label="Montant Totale" variant="outlined" sx={{ color: "white", width: 300, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, } }} InputLabelProps={{ style: { color: isFocused ? 'white' : 'white' }, }} inputProps={{ style: { color: 'white' }, min: 0 }} />

            </div>
            <div className={styles.btnSubmit}>
                <Button onClick={handleCreate} sx={{ color: "white" }} >Modifier la commission</Button>
            </div>

        </div>
    )
}




export default Modifier