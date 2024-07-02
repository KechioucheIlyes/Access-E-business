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
  const [ref, setRef] = useState('')
  const [contrat, setContrat] = useState([])
  const [contratID, setContratID] = useState(null)
  const [nom_site, setnomSite] = useState()
  const [fournisseurElec, setFournisseurElec] = useState()
  const [fournisseurGaz, setFournisseurGaz] = useState()
  const [fichier_contrat, setFichierContrat] = useState()
  const [etudes, setEtude] = useState([])
  const [etudeID, setEtudeID] = useState(null)
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

  const handleModifyContrat = async () => {
    const formData = {
      contratID,
      nom_site,
      fournisseurElec,
      fournisseurGaz
    }
    try {
      const res = await fetch("/api/crud/admin/update/contrat", {
        method: 'PUT',
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

  const handleUserChange = (_, newValue) => {
    if (newValue) {
      setnomSite(newValue.nom_site)
      setFournisseurElec(newValue.fournisseur.split('-')[0])
      setFournisseurGaz(newValue.fournisseur.split('-')[1])
      setContratID(newValue.id)
    } else {
      setnomSite('')
      setFournisseurElec('')
      setFournisseurGaz('')
      setContratID('')
    }
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
        <h1>Modifier un contrat </h1>
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

      <TextField id="outlined-basic" onChange={(e) => { setnomSite(e.target.value) }} value={nom_site ? nom_site : ''} label="Nom du Site" variant="outlined" sx={{
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
      <TextField id="outlined-basic" onChange={(e) => { setFournisseurElec(e.target.value) }} value={fournisseurElec ? fournisseurElec : ''} label="Fournisseur éléctricité" variant="outlined" sx={{
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
      <TextField id="outlined-basic" onChange={(e) => { setFournisseurGaz(e.target.value) }} value={fournisseurGaz ? fournisseurGaz : ''} label="Fournisseur gaz" variant="outlined" sx={{
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
        <Button onClick={handleModifyContrat} sx={{ color: "white" }} >Modifier le Contrat</Button>
      </div>
    </div>
  )
}

export default Modifier