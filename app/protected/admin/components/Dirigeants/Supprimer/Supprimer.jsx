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
  const [clientID, setClientID] = useState(null)
  const [signataire, setSignataire] = useState()
  const [decisionnaire, setDecisionnaire] = useState()
  const [civilite, setCivilite] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [fixe, setFixe] = useState('')
  const [fonction, setFonction] = useState('')
  const [allDirigeants, setAllDirigeants] = useState([])
  const [dirigeantID, setDirigeantID] = useState(null)
  const [open, setOpen] = useState(false)
  const [agree, setAgree] = useState(false)
  const [desagree, setDesagree] = useState(false)

  const handleDirigeant = (_, dirigeants) => {
    if (dirigeants) {
      setDirigeantID(dirigeants.id)
      setNom(dirigeants.nom)
      setPrenom(dirigeants.prenom)
      setCivilite(dirigeants.civilite)
      setEmail(dirigeants.email)
      setMobile(dirigeants.mobile)
      setFixe(dirigeants.fixe)
      setFonction(dirigeants.fonction)
      setClientID(dirigeants.ID_clients)
      setSignataire(dirigeants.signataire)
      setDecisionnaire(dirigeants.decisionnaire)
    } else {
      setDirigeantID(null)
      setNom("")
      setPrenom("")
      setCivilite("")
      setEmail("")
      setMobile("")
      setFixe("")
      setFonction("")
      setClientID(null)
      setSignataire()
      setDecisionnaire()

    }
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleDisagree = () => {
    setDesagree(true)
    setAgree(false)
    handleClose();
  };

  const handleAgree = async () => {

    if (!nom) {
      setMessageError('vous devez choisir un dirigeant !')
      setNotificationError(true)
    } else {
      if (dirigeantID) {
        const formData = {
          dirigeantID,
        };

        try {
          const res = await fetch("/api/crud/admin/delete/dirigeant", {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
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
            setMessageError("Une erreur s'est produite l'or de la suppression du dirigeant !")
          }
        } catch (error) {
          setNotificationValid(false)
          setNotificationError(true)
          setMessageError("Une erreur s'est produite l'or de la suppression du dirigeant !")
        }

      } else {
        setOpen(false);
      }
      setOpen(false);
    };
  }

  const handleDeleteDirigeant = () => {
    if (nom) {
      setOpen(true)
    } else {
      setNotificationValid(false)
      setNotificationError(true)
      setMessageError("Vous devez séléctionner un dirigeant pour pouvoir le supprimer !")
    }
  }

  const handleCloseValid = () => {
    setNotificationValid(false);
  };

  const handleCloseError = () => {
    setNotificationError(false);
  };
  useEffect(() => {
    const fetchingAllDirigeant = async () => {
      try {
        const res = await fetch("/api/crud/admin/get-all/dirigeants", {
          method: "GET"
        })
        if (res.ok) {
          const data = await res.json()

          const dirigeants = data.dirigeants
          setAllDirigeants(dirigeants.map(dirigeant => {
            return dirigeant
          }))

        } else {
          console.log("erreur")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchingAllDirigeant()
  }, [])


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
        <h1>Supprimer un Dirigeant </h1>
      </div>
      <Autocomplete
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nom && option.prenom ? `${option.nom} ${option.prenom}` : "Sans nom"}
          </li>
        )}
        onChange={handleDirigeant}
        disablePortal
        id="combo-box-demo"
        options={allDirigeants}
        getOptionLabel={(option) => `${option ? `${option.nom} ${option.prenom}` : 'Sans nom'}`}
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
          label="Dirigeant"
          InputLabelProps={{
            style: { color: 'white' },
          }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }}
        />}
      />


      <TextField value={nom ? nom : ''} id="outlined-basic" label="Nom" variant="outlined" sx={{
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

      <TextField value={prenom ? prenom : ''} id="outlined-basic" label="Prenom" variant="outlined" sx={{
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


      <TextField value={email ? email : ''} id="outlined-basic" label="Email" type='email' variant="outlined" sx={{
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
      <TextField value={mobile ? mobile : ''} onChange={(e) => { setMobile(e.target.value) }} id="outlined-basic" label="Mobile" variant="outlined" sx={{
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
      <TextField value={fixe ? fixe : ''} onChange={(e) => { setFixe(e.target.value) }} id="outlined-basic" label="Fixe" variant="outlined" sx={{
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
      <TextField value={fonction ? fonction : ''} id="outlined-basic" label="Fonction" variant="outlined" sx={{
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

      <div className={styles.btnSubmit}>
        <Button onClick={handleDeleteDirigeant} sx={{ color: "white" }} >Supprimer le Dirigeant</Button>
      </div>
    </div>
  )
}

export default Supprimer