import React, { useEffect, useState } from 'react'
import styles from "./creer.module.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import Sheet from '@mui/joy/Sheet';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';

const Creer = () => {




  const [ref, setRef] = useState('')
  const [contrat, setContrat] = useState([])
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

  const handleUserChange = (_, newValue) => {

    if (newValue) {
      setEtudeID(newValue.id)
    } else {
      setEtudeID(null)
    }

  }


  const handleCreateContrat = async () => {
    const formData = {
      nom_site,
      fournisseurElec,
      fournisseurGaz,
      ref,
      etudeID
    }
    if (!nom_site || !fournisseurElec || !fournisseurGaz || !ref || !etudeID) {
      setMessageError('tout les champs sont obligatoire !')
      setNotificationError(true)
    } else {
      setMessageError('')
      setNotificationError(false)
      try {
        const res = await fetch("/api/crud/admin/create/contrat", {
          method: 'POST',
          headers: {
            "Content-Type": "Application/json"
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
          setMessageError("Erreur l'or de la création du Contrat !")
        }
      } catch (error) {
        console.log(error)
        setNotificationValid(false)
        setNotificationError(true)
        setMessageError("Erreur l'or de la création du Contrat !")
      }
    }

  }

  useEffect(() => {
    const fetchinContrat = async () => {
      try {
        const response = await fetch('/api/crud/admin/get-all/contrats');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setContrat(data)
            setRef(generateUniqueReference(25, data))
          }
        }
      }
      catch (error) {
        console.log(error)
      }

    }
    const fetchingEtudeWithoutPDF = async () => {
      try {
        const response = await fetch('/api/crud/admin/get-all/contrats/empty');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setEtude(data.etudes.map(etude => {
              return etude
            }))
          }
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchingEtudeWithoutPDF()
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
        <h1>Creer un contrat </h1>
      </div>

      <Autocomplete
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.nom_etude}
          </li>
        )}
        onChange={handleUserChange}
        disablePortal
        id="combo-box-demo"
        options={etudes}
        getOptionLabel={(option) => `${option ? ` ${option.nom_etude} ` : 'Sans nom'}`}
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
          label="Étude"
          InputLabelProps={{
            style: { color: 'white' },
          }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }}
        />}
      />

      <TextField id="outlined-basic" focused={ref ? true : false} value={ref != "" ? ref : ''} label="Réference" variant="outlined" sx={{
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

      <TextField id="outlined-basic" onChange={(e) => { setnomSite(e.target.value) }} label="Nom du Site" variant="outlined" sx={{
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
      <TextField id="outlined-basic" onChange={(e) => { setFournisseurElec(e.target.value) }} label="Fournisseur éléctricité" variant="outlined" sx={{
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
      <TextField id="outlined-basic" onChange={(e) => { setFournisseurGaz(e.target.value) }} label="Fournisseur gaz" variant="outlined" sx={{
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
        <Button onClick={handleCreateContrat} sx={{ color: "white" }} >Créer le Contrat</Button>
      </div>
    </div>
  )
}



function generateStrongRandomReference(length) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
function generateUniqueReference(length, contrat) {
  let uniqueReference;
  do {
    uniqueReference = generateStrongRandomReference(length);
  } while (contrat.includes(uniqueReference));
  return uniqueReference;
}


export default Creer