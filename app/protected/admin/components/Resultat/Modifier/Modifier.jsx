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
  const [messageValid, setMessageValid] = useState('')
  const [messageError, setMessageError] = useState('')
  const [notificationValid, setNotificationValid] = useState(false)
  const [notificationError, setNotificationError] = useState(false)
  const [resultats, setResultats] = useState([])
  const [CSPE, setCSPE] = useState(null)
  const [resultatID, setResultatID] = useState(null)
  const [Arhen, setArhen] = useState(null)
  const [nbCtrElec, setNBctrElec] = useState('')
  const [nbCtrGaz, setNBctrGaz] = useState('')
  const [fournisseurElec, setFournisseurElec] = useState('')
  const [fournisseurGaz, setFournisseurGaz] = useState('')
  const [DateRenego, setDateRenego] = useState()
  const [DureeEngagement, setDureeEngagement] = useState()
  const [accTiers, setAccTiers] = useState('')
  const [puissanceSouscrite, setPuissanceSouscrite] = useState()
  const [formuleAcheminement, setFormuleAcheminement] = useState()
  const [penalite, setPenalite] = useState()
  const [surfacturConso, setSurfacturConso] = useState()
  const [souscriteSoutirée, setSouscriteSoutirée] = useState()
  const [periodique, setPeriodique] = useState()
  const [Naf, setNaf] = useState()
  const [reducConso, setReducConso] = useState()
  const [mesurReductionConso, setMesurReductionConso] = useState()
  const [actionReducConso, setActionReducConso] = useState()
  const [outilsQuantif, setOutilsQuantif] = useState()
  const [assujettiTertiare, setAssujettiTertiare] = useState()
  const [operate, setOperate] = useState()
  const [bat1k, setBat1k] = useState()
  const [AssujetiBacs, setAssujetiBacs] = useState()
  const [GTB, setGTB] = useState()
  const [noteAnalyse, setNoteAnalyse] = useState('')
  const [noteTaxe, setNoteTaxe] = useState('')
  const [noteEcoEnergie, setNoteEcoEnergie] = useState('')
  const [noteReglementaire, setNoteReglementaire] = useState('')
  const [noteGlobale, setNoteGlobale] = useState('')
  const [obilgation, setObilgation] = useState('')



  const handleEtude = (_, newValue) => {
    if (newValue) {
      setResultatID(newValue.id)
      setCSPE(newValue.CSPE)
      setArhen(newValue.ctr_ARENH)
      setNBctrElec(newValue.ctr_nb_compteur_elec)
      setNBctrGaz(newValue.ctr_nb_compteur_gaz)
      setFournisseurElec(newValue.ctr_fournisseurs_elec)
      setFournisseurGaz(newValue.ctr_fournisseurs_gaz)
      setDateRenego(newValue.ctr_renegociation)
      setDureeEngagement(newValue.ctr_duree_engage_definit)
      setAccTiers(newValue.ctr_est_accomp_tiers)
      setPuissanceSouscrite(newValue.tx_puissance_souscrite)
      setFormuleAcheminement(newValue.tx_formule_tarifaire)
      setPenalite(newValue.tx_subis_penalites)
      setSurfacturConso(newValue.tx_surfacturation)
      setSouscriteSoutirée(newValue.tx_coherence_puissance_1)
      setPeriodique(newValue.tx_periodique_1_1)
      setNaf(newValue.tx_code_naf_eligible)
      setReducConso(newValue.ec_reduc_consom)
      setMesurReductionConso(newValue.ec_mesures_econom)
      setActionReducConso(newValue.ec_actions_econom)
      setOutilsQuantif(newValue.ec_outils_mesure_conso)
      setAssujettiTertiare(newValue.rg_adheresion_tertiaire_1)
      setOperate(newValue.rg_operate_tertiaire_oui_01)
      setBat1k(newValue.rg_bis_1k_tertiaire_non_01)
      setAssujetiBacs(newValue.rg_bacs_oui_01)
      setGTB(newValue.rg_bacs_outils_oui_01)
      setObilgation(newValue.obilgation)
      setNoteAnalyse(newValue.noteAnalyse)
      setNoteTaxe(newValue.noteTaxe)
      setNoteEcoEnergie(newValue.noteEcoEnergie)
      setNoteReglementaire(newValue.noteReglementaire)
      setNoteGlobale(newValue.noteGlobale)
      setCSPE(newValue.tx_cspe_eligible)


    } else {
      setNBctrGaz('')
      setFournisseurElec('')
      setResultatID(null)
      setCSPE(null)
      setArhen(null)
      setNBctrElec("")
      setFournisseurGaz("")
      setDateRenego("")
      setDureeEngagement("")
      setAccTiers("")
      setPuissanceSouscrite("")
      setFormuleAcheminement("")
      setPenalite("")
      setSurfacturConso("")
      setSouscriteSoutirée("")
      setPeriodique("")
      setNaf("")
      setReducConso("")
      setMesurReductionConso("")
      setActionReducConso("")
      setOutilsQuantif("")
      setAssujettiTertiare("")
      setOperate("")
      setBat1k('')
      setAssujetiBacs('')
      setGTB("")
      setObilgation("")
      setNoteAnalyse("")
      setNoteTaxe("")
      setNoteEcoEnergie("")
      setNoteReglementaire("")
      setNoteGlobale("")


    }
  }


  const handleCSPE = (_, CSPE) => {
    if (CSPE) {

      setCSPE(CSPE.value)
    } else {
      setCSPE('')
    }
  }
  const handleArhen = (_, newValue) => {
    if (newValue) {

      setArhen(newValue.value)
    } else {
      setArhen('')
    }
  }

  const handleDateRenego = (_, newValue) => {
    if (newValue) {

      setDateRenego(newValue.value)
    } else {
      setDateRenego('')
    }
  }
  const handleDureeEngagement = (_, newValue) => {
    if (newValue) {

      setDureeEngagement(newValue.value)
    } else {
      setDureeEngagement('')
    }
  }
  const handlePuissanceSouscrite = (_, newValue) => {
    if (newValue) {

      setPuissanceSouscrite(newValue.value)
    } else {
      setPuissanceSouscrite('')
    }
  }
  const handleFormuleAcheminement = (_, newValue) => {
    if (newValue) {

      setFormuleAcheminement(newValue.value)
    } else {
      setFormuleAcheminement('')
    }
  }
  const handlePenalite = (_, newValue) => {
    if (newValue) {

      setPenalite(newValue.value)
    } else {
      setPenalite('')
    }
  }
  const handleSurfacturConso = (_, newValue) => {
    if (newValue) {

      setSurfacturConso(newValue.value)
    } else {
      setSurfacturConso('')
    }
  }
  const handleSouscriteSoutirée = (_, newValue) => {
    if (newValue) {

      setSouscriteSoutirée(newValue.value)
    } else {
      setSouscriteSoutirée('')
    }
  }
  const handlePeriodique = (_, newValue) => {
    if (newValue) {

      setPeriodique(newValue.value)
    } else {
      setPeriodique('')
    }
  }
  const handleNaf = (_, newValue) => {
    if (newValue) {

      setNaf(newValue.value)
    } else {
      setNaf('')
    }
  }
  const handleReducConso = (_, newValue) => {
    if (newValue) {

      setReducConso(newValue.value)
    } else {
      setReducConso('')
    }
  }
  const handleOutilsQuantif = (_, newValue) => {
    if (newValue) {

      setOutilsQuantif(newValue.value)
    } else {
      setOutilsQuantif('')
    }
  }

  const handleAssujettiTertiare = (_, newValue) => {
    if (newValue) {

      setAssujettiTertiare(newValue.value)
    } else {
      setAssujettiTertiare('')
    }
  }
  const handleOperate = (_, newValue) => {
    if (newValue) {

      setOperate(newValue.value)
    } else {
      setOperate('')
    }
  }
  const handleObilgation = (_, newValue) => {
    if (newValue) {

      setObilgation(newValue.value)
    } else {
      setObilgation('')
    }
  }
  const handleBat1k = (_, newValue) => {
    if (newValue) {

      setBat1k(newValue.value)
    } else {
      setBat1k('')
    }
  }
  const handleAssujetiBacs = (_, newValue) => {
    if (newValue) {

      setAssujetiBacs(newValue.value)
    } else {
      setAssujetiBacs('')
    }
  }
  const handleGTB = (_, newValue) => {
    if (newValue) {

      setGTB(newValue.value)
    } else {
      setGTB('')
    }
  }


  const handleModifyResultat = async () => {
    const formData = {
      resultatID,
      CSPE,
      Arhen,
      nbCtrElec,
      nbCtrGaz,
      fournisseurElec,
      fournisseurGaz,
      DateRenego,
      DureeEngagement,
      accTiers,
      puissanceSouscrite,
      formuleAcheminement,
      penalite,
      surfacturConso,
      souscriteSoutirée,
      periodique,
      Naf,
      reducConso,
      mesurReductionConso,
      actionReducConso,
      outilsQuantif,
      assujettiTertiare,
      operate,
      bat1k,
      AssujetiBacs,
      GTB,
      noteAnalyse,
      noteTaxe,
      noteEcoEnergie,
      noteReglementaire,
      noteGlobale,
      obilgation,
    }
    try {
      const res = await fetch("/api/crud/admin/update/resultat", {
        method: 'PUT',
        "content-type": 'application/json',
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
        setMessageError("Une erreur s'est produite l'or de la modification du Resultat !")
      }
    } catch (error) {
      setNotificationValid(false)
      setNotificationError(true)
      setMessageError("Une erreur s'est produite l'or de la modification du Resultat !")
    }
  }







  useEffect(() => {
    const fetchinResult = async () => {
      const res = await fetch("/api/crud/admin/get-all/resultats")
      if (res.ok) {
        const data = await res.json()
        setResultats(data.resultats)

      } else {
        return
      }
    }
    fetchinResult()
  }, [])
  const handleCloseValid = () => {
    setNotificationValid(false);
  };

  const handleCloseError = () => {
    setNotificationError(false);
  };

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
        <h1>Modifier un Resultat </h1>
      </div>

      <Autocomplete
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.etude.nom_etude ? option.etude.nom_etude : "Sans nom"}
          </li>
        )}
        onChange={handleEtude}
        disablePortal
        id="combo-box-demo"
        options={resultats}
        getOptionLabel={(option) => `${option ? `${option.etude.nom_etude} ` : 'Sans nom'}`}
        sx={{
          margin: "5px",
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

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleCSPE}

        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="CSPE" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <TextField id="outlined-basic" onChange={(e) => { setNBctrGaz(e.target.value) }} label="N° compteur gaz" variant="outlined" sx={{
        margin: "5px",
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
      <TextField id="outlined-basic" onChange={(e) => { setNBctrElec(e.target.value) }} label="N° compteur electricité" variant="outlined" sx={{
        margin: "5px",
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
        margin: "5px",
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
      <TextField id="outlined-basic" onChange={(e) => { setFournisseurElec(e.target.value) }} label="Fournisseur Elec" variant="outlined" sx={{
        margin: "5px",
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
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleArhen}

        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Bandeau ARENH" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}

        onChange={handleDateRenego}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Anticipation date renegociation" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}

        onChange={handleDureeEngagement}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Durée engagement définie" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <TextField onChange={(e) => { setAccTiers(e.target.value) }} id="outlined-basic" label="Accomapgnement tiers" variant="outlined" sx={{
        margin: "5px",
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
        disablePortal
        id="combo-box-demo"
        options={puissance}
        onChange={handlePuissanceSouscrite}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Puissance souscrite (36KVA)" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleFormuleAcheminement}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Formule tarifaire d'acheminement" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handlePenalite}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Pénalité subis" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleSurfacturConso}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Surfacturation de consomation" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleSouscriteSoutirée}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Coherence puissance souscrite/soutirée" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handlePeriodique}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Periodique tout les 2 ans" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleNaf}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Eligible Naf" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleReducConso}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Réduction consomation" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <TextField id="outlined-basic" onChange={(e) => { setMesurReductionConso(e.target.value) }} label="Mesure reduction Consomations" variant="outlined" sx={{
        margin: "5px",
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

      <TextField id="outlined-basic" onChange={(e) => { setActionReducConso(e.target.value) }} label="Action réduction consomation" variant="outlined" sx={{
        margin: "5px",
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
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleOutilsQuantif}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Outils quantification consomation" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool_jsp}
        onChange={handleAssujettiTertiare}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Assujetti décret tertiaire" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleOperate}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="OPERATE" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleObilgation}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Obligation atteinte -40%" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />


      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleBat1k}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Bâtiment avec surface sup a 1Km&sup2;" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool}
        onChange={handleAssujetiBacs}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Assujetti décret BACS" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bool_jsp}
        onChange={handleGTB}
        sx={{
          margin: "5px",
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
              color: "#716c6c",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#716c6c"
              }
            }
          }
        }}
        renderInput={(params) => <TextField {...params} label="Equipé d'une GTB" InputLabelProps={{
          style: { color: 'white' },
        }}
          inputProps={{
            ...params.inputProps,
            style: { color: 'white' }
          }} />}
      />

      <TextField id="outlined-basic" onChange={(e) => { setNoteAnalyse(e.target.value) }} label="Note Analyse" variant="outlined" sx={{
        margin: "5px",
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


      <TextField id="outlined-basic" onChange={(e) => { setNoteTaxe(e.target.value) }} label="Note Taxes" variant="outlined" sx={{
        margin: "5px",
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


      <TextField id="outlined-basic" onChange={(e) => { setNoteEcoEnergie(e.target.value) }} label="Note Economies Energie" variant="outlined" sx={{
        margin: "5px",
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


      <TextField id="outlined-basic" onChange={(e) => { setNoteReglementaire(e.target.value) }} label="Note Reglementaire" variant="outlined" sx={{
        margin: "5px",
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

      <TextField id="outlined-basic" onChange={(e) => { setNoteGlobale(e.target.value) }} label="note Globale" variant="outlined" sx={{
        margin: "5px",
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
        <Button onClick={handleModifyResultat} sx={{ color: "white" }} >Modifier le Resultat</Button>
      </div>

    </div>
  )
}
const bool = [
  { label: 'Oui', value: true },
  { label: 'Non', value: false }
]
const puissance = [
  { label: 'Supérieure' },
  { label: 'Inferieure' }
]
const bool_jsp = [
  { label: 'Oui', value: true },
  { label: 'non', value: false },
  { label: 'Je ne sais pas', value: "ne_sais_pas" },
]

export default Modifier