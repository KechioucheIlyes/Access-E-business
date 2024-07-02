"use client"
import NavBar from '../../../Component/NavBar/NavBar'
import ResetModal from '../../../Component/ResetModal/ResetModal'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/joy/Avatar';
import Image from "next/image";
import { useSession } from 'next-auth/react';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from "./reglage.module.css"
import { Button } from '@mui/joy'
import Link from 'next/link';


const Reglages = () => {

  const { data: session, status } = useSession()
  const id = session?.user?.id
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [numero, setNumero] = useState('')
  const [raisonSociale, setRaisonSociale] = useState('')
  const [fonction, setFonction] = useState('')
  const [siren, setSiren] = useState('')
  const [role, setRole] = useState('')
  const [fixe, setFixe] = useState('')
  const [modifierLe, setModifierLe] = useState('')
  const [creerLe, setCreerLe] = useState('')
  const [userID, setUserID] = useState(null)
  const [commissionNumber, setCommissionNumber] = useState(null)
  const [clientNumber, setClientNumber] = useState(null)
  const [filleulNumber, setFilleulNumber] = useState(null)
  const [confirmed, setConfirmed] = useState(null)
  const [activated, setActivated] = useState(null)
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




  const handleUpdate = async () => {
    const formData = {
      nom,
      prenom,
      email,
      numero,
      raisonSociale,
      fonction,
      siren,
      fixe,
      userID
    }
    try {
      const res = await fetch('/api/crud/update/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
        setMessageError("Une erreur s'est produite l'or de la mise à jour !")
      }
    } catch (error) {
      setNotificationValid(false)
      setNotificationError(true)
      setMessageError("Une erreur s'est produite l'or de la mise à jour !")
    }

  }

  useEffect(() => {
    const fetchinUser = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/crud/user?id=${id}`, {
            method: "GET"
          })
          if (res.ok) {
            const data = await res.json()
            const user = data.user
            setNom(user.name)
            setPrenom(user.prenom)
            setEmail(user.email)
            setNumero(user.numero)
            setRaisonSociale(user.raison_social)
            setFonction(user.fonction)
            setSiren(user.siren)
            setRole(user.role)
            setFixe(user.fix)
            setModifierLe(user.modifier_le)
            setCreerLe(user.create_time)
            setUserID(user.id)
            setCommissionNumber(data.commission)
            setClientNumber(data.client)
            setFilleulNumber(data.filleul)
            setConfirmed(user.confirmed)
            setActivated(user.activated)
          } else {
            return
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchinUser()
  }, [id, userID, messageValid, messageError])


  return (
    <>
      <NavBar accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />

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
          <h1>Paramètres du compte</h1>
        </div>
        <div className={styles.Fields}>
          <div className={styles.miniFields}>
            <TextField className={styles.mobile} onChange={(e) => { setNom(e.target.value) }} value={nom ? nom : ''} id="outlined-basic-1" label="Nom" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "black",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
            <TextField className={styles.mobile} onChange={(e) => { setPrenom(e.target.value) }} id="outlined-basic-2" value={prenom ? prenom : ''} label="Prenom" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
            <TextField className={styles.mobile} onChange={(e) => { setEmail(e.target.value) }} value={email ? email : ''} id="outlined-basic-3" label="Email" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
            <TextField className={styles.mobile} onChange={(e) => { setNumero(e.target.value) }} value={numero ? numero : ''} id="outlined-basic-4" label="Numero de téléphone" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
            <TextField className={styles.mobile} onChange={(e) => { setRaisonSociale(e.target.value) }} value={raisonSociale ? raisonSociale : ''} id="outlined-basic-5" label="Raison sociale" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
          </div>
          <div className={styles.miniFields}>
            <TextField className={styles.mobile} onChange={(e) => { setFonction(e.target.value) }} value={fonction ? fonction : ''} id="outlined-basic-6" label="Fonction" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
            <TextField className={styles.mobile} onChange={(e) => { setSiren(e.target.value) }} value={siren ? siren : ''} id="outlined-basic-7" label="Siren" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />

            <TextField value={fixe ? fixe : ''} className={styles.mobile} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic-8" label="Fixe" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />

            <TextField disabled={true} value={creerLe ? new Date(creerLe).toLocaleString('fr-FR') : ''} className={styles.mobile} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic-9" label="Creer le" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />

            <TextField disabled={true} value={modifierLe ? new Date(modifierLe).toLocaleString('fr-FR') : ''} className={styles.mobile} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic-10" label="Modifier le" variant="outlined" sx={{
              color: "black", width: 300, "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black", }, "&:hover fieldset": { borderColor: "black", color: "black" }, "&.Mui-focused fieldset": { borderColor: "black", color: "black" }
                , "&.Mui-disabled": {
                  color: "#716c6c",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#716c6c"
                  }
                }
              }
            }} InputLabelProps={{ style: { color: 'black' }, }} inputProps={{ style: { color: 'black' } }} />
          </div>



        </div>

        <div className={styles.btnSubmit}>
          <Button className={styles.btnReset} onClick={handleUpdate} sx={{ color: "white" , backgroundColor:"#2c8444" ,width:"230px"}} >Modifier les paramètres</Button>
        </div>

      </div>
    </>
  )
}

export default Reglages