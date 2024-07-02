
import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Autocomplete, Button } from '@mui/material';
import Snackbar from '@mui/joy/Snackbar';
import Box from '@mui/joy/Box';
import styles from "./../../Filleuls/Creer/creer.module.css"


async function getUsers(setUsers) {
    try {
        const res = await fetch('/api/crud/admin/get-all/users', {
            method: "GET",
        })
        if (res.ok) {
            const data = await res.json()
            setUsers(data.users)
        }
    } catch (error) {
        console.log(error)
    }
}

const Modifier = () => {
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [raisonSociale, setRaisonSociale] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [email, setEmail] = useState('')
    const [fixe, setFixe] = useState('')
    const [mobile, setMobile] = useState('')
    const [users, setUsers] = useState([])
    const [roles, setRole] = useState('')
    const [siren, setSiren] = useState('')
    const [userID, setUserID] = useState(null)
    const [updatedUser , setUserUpdated] = useState()


    useEffect(() => {
        getUsers(setUsers)
    }, [updatedUser])
    const handleSelectedRole = (_, role) => {
        if (role) {
            setRole(role.label)

        } else {
            setRole('')
        }

    }
    const handleCreateUser = async () => {

        if (!raisonSociale || !nom || !prenom || !fonction || !email || !fixe || !mobile || !roles || !siren || !userID) {
            setNotificationValid(false)
            setNotificationError(true);
            setMessageError("Tout les champs sont obligatoires !")
        } else {
            const formData = {
                raisonSociale,
                nom,
                prenom,
                fonction,
                email,
                fixe,
                mobile,
                siren,
                roles,
                userID

            }

            try {
                const res = await fetch("/api/crud/admin/update/user", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                if (res.ok) {
                    const data = await res.json()
                    setNotificationValid(true)
                    setNotificationError(false);
                    setMessageValid(data.message)
                    setUserUpdated(data.userUpdated)
                }
                else if (res.status === 402) {
                    setNotificationValid(false)
                    setNotificationError(true);
                    setMessageError("Cet email existe déja !")
                }
                else {
                    setNotificationValid(false)
                    setNotificationError(true);
                    setMessageError("Erreur l'or de la modification de l'utilisateur veuillez reessayer plus tard !")
                }
            } catch (error) {
                setNotificationValid(false)
                setNotificationError(true);
                setMessageError("Erreur l'or de la modification de l'utilisateur veuillez reessayer plus tard !")
            }
        }

    }
    const handleSelectedUser = (_, user) => {
        if (user) {
            setUserID(user.id)
            setNom(user.name)
            setPrenom(user.prenom)
            setRaisonSociale(user.raison_social)
            setFonction(user.fonction)
            setEmail(user.email)
            setFixe(user.fixe)
            setMobile(user.mobile)
            setSiren(user.siren)
            setRole(user.role)

        } else {
            setUserID(null)
            setNom("")
            setPrenom("")
            setRaisonSociale("")
            setFonction("")
            setEmail("")
            setFixe("")
            setMobile("")
            setSiren("")
            setRole("")
        }
    }
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
                <h1>Modifier un Utilisateur </h1>
            </div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={users.map(user => ({
                    label: `${user.name} ${user.prenom}`,
                    id: user.id,
                    name: user.name,
                    prenom: user.prenom,
                    raison_social: user.raison_social,
                    fonction: user.fonction,
                    email: user.email,
                    fixe: user.fix,
                    mobile: user.numero,
                    siren: user.siren,
                    role: user.role

                }))}
                onChange={handleSelectedUser}
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
            <TextField onChange={(e) => { setRaisonSociale(e.target.value) }} id="outlined-basic" label="Raison sociale" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} value={raisonSociale ? raisonSociale : ''} focused={raisonSociale ? true : false} inputProps={{ style: { color: 'white' } }} />

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
            }} InputLabelProps={{ style: { color: 'white' }, }} value={nom ? nom : ''} focused={nom ? true : false} inputProps={{ style: { color: 'white' } }} />
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
            }} InputLabelProps={{ style: { color: 'white' }, }} value={prenom ? prenom : ''} focused={prenom ? true : false} inputProps={{ style: { color: 'white' } }} />
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
            }} InputLabelProps={{ style: { color: 'white' }, }} value={fonction ? fonction : ''} focused={fonction ? true : false} inputProps={{ style: { color: 'white' } }} />
            <TextField onChange={(e) => { setEmail(e.target.value) }} id="outlined-basic" label="Email" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} value={email ? email : ''} focused={email ? true : false} inputProps={{ style: { color: 'white' } }} />
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
            }} InputLabelProps={{ style: { color: 'white' }, }} value={fixe ? fixe : ''} focused={fixe ? true : false} inputProps={{ style: { color: 'white' } }} />
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
            }} InputLabelProps={{ style: { color: 'white' }, }} value={mobile ? mobile : ''} focused={mobile ? true : false} inputProps={{ style: { color: 'white' } }} />


            <TextField onChange={(e) => { setSiren(e.target.value) }} id="outlined-basic" label="Siren/Siret" variant="outlined" sx={{
                color: "white", width: 300, "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "whitesmoke", }, "&:hover fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }, "&.Mui-focused fieldset": { borderColor: "whitesmoke", color: "whitesmoke" }
                    , "&.Mui-disabled": {
                        color: "#716c6c",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#716c6c"
                        }
                    }
                }
            }} InputLabelProps={{ style: { color: 'white' }, }} value={siren ? siren : ''} focused={siren ? true : false} inputProps={{ style: { color: 'white' } }} />

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={role}
                onChange={handleSelectedRole}
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
                    label="Role"
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    inputProps={{
                        ...params.inputProps,
                        style: { color: 'white' }
                    }}
                    value={roles === 'user' ? role[0].label : role[1].label}
                    focused={roles ? true : false}
                />}
            />

            <div className={styles.btnSubmit}>
                <Button sx={{ color: "white" }} onClick={handleCreateUser} >Modifier l'utilisateur </Button>
            </div>
        </div>
    )
}

const role = [
    { label: 'Utilisateur' },
    { label: 'Admin' },

]

export default Modifier
