'use client'
import React, { useEffect, useState } from 'react'
import styles from "./infos.module.css"
import Button from '@mui/joy/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation'
import CircularButton from "../../..//Component/CircularButton/CircularButton"
import NavBar from '../../../Component/NavBar/NavBar';
import Footer from "../../../Component/Footer/Footer";
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/joy/FormControl';
import TextField from '@mui/material/TextField';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Autocomplete from '@mui/material/Autocomplete';
import InfosEntreprise from "./../../../Assets/informations-entreprise.svg"
import inforsDirigeants from "./../../../Assets/informations-dirigeants.svg"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Image from 'next/image';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },

    },
});

const InfosClient = () => {
    const router = useRouter()
    const [siren, setSiren] = useState(null)
    const [objet_social, setObjet_social] = useState('')
    const [naf, setNaf] = useState('')
    const [adresse_ligne_1, setAdresse_ligne_1] = useState('')
    const [domaine_activite, setDomaine_activite] = useState('')
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [societeValide, setSocieteValide] = useState(false);
    const [dataValid, setDataValid] = useState(false)
    const [champSociete, setChampSociete] = useState(true)
    const [loading, setLoading] = useState(false);
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [email, setEmail] = useState('')
    const [fixe, setFixe] = useState('')
    const [mobile, setMobile] = useState('')
    const [codePostale, setCodePostale] = useState('')
    const [ville, setVille] = useState('')
    const [civilite, setCivilite] = useState('')
    const [signataire, setSignataire] = useState(null)
    const [decisionnaire, setDecisionnaire] = useState(null)
    const [nomEntreprise, setNomEntreprise] = useState('')
    const [formJuridique, setFormJuridique] = useState('')
    const [nomClient, setNomClient] = useState('')
    const [prenomClient, setPrenomClient] = useState('')
    const [resultatPapers, setResultatPapers] = useState([])
    const [allResult, setAllResult] = useState([])

    const handleChangeSiren = (_, newValue) => {

        if (newValue) {

            const infosEntreprise = allResult.filter(entreprise => entreprise.nom_entreprise == newValue)
            setSiren(infosEntreprise[0] ? infosEntreprise[0].nom_entreprise : '')
            setNomEntreprise(infosEntreprise[0] ? infosEntreprise[0].nom_entreprise : '')
            setObjet_social(infosEntreprise[0] ? infosEntreprise[0].siren : '')
            setNaf(infosEntreprise[0] ? infosEntreprise[0].code_naf : '')
            setAdresse_ligne_1(infosEntreprise[0] ? `${infosEntreprise[0].siege.adresse_ligne_1} - ${infosEntreprise[0] ? infosEntreprise[0].siege.ville : ''}` : '')
            setDomaine_activite(infosEntreprise[0] ? infosEntreprise[0].domaine_activite : '')
            setCodePostale(infosEntreprise[0] ? infosEntreprise[0].siege.code_postal : '')
            setVille(infosEntreprise[0] ? infosEntreprise[0].siege.ville : '')
            setFormJuridique(infosEntreprise[0] ? infosEntreprise[0].forme_juridique : '')
            setSocieteValide(true)



        } else {
            setSocieteValide(false)
            setObjet_social('')
            setNaf('')
            setAdresse_ligne_1('')
            setDomaine_activite('')
        }

    }

    const handleChange = async (e) => {
        setNomEntreprise(e.target.value)
        const formData = {
            nomEntreprise: e.target.value
        }

        try {
            if (e.target.value != '') {
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
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleBack = () => {
        setDataValid(false)
        setChampSociete(true)
    }
    const handleEtude = async (e) => {

        e.preventDefault()
        if (!siren || !objet_social || !naf || !adresse_ligne_1 || !domaine_activite || !nom || !prenom || !fonction || !email || !fixe || !mobile) {
            alert("Vous devez renseigner tous les champs avant !")
        } else {

            const formDataClient = {
                siret: objet_social,
                raison_sociale: siren,
                code_naf: naf,
                adresse_postal: adresse_ligne_1,
                secteur_activite: domaine_activite,
                code_postal: codePostale,
                ville,
                nom_entreprise: nomEntreprise,
                forme_juridique: formJuridique
            }

            const formDataDirigeant = {
                civilite,
                nom,
                prenom,
                email,
                mobile,
                fixe,
                fonction,
                signataire,
                decisionnaire,
            }

            try {
                const res = await fetch("/api/crud/clients/create", {
                    method: "POST",
                    "Content-Type": "application/json",
                    body: JSON.stringify(formDataClient)
                })

                if (res.ok) {
                    const data = await res.json()

                    const client_id = data.id_client

                    const secondRes = await fetch(`/api/crud/dirigeants/create/${client_id}`, {
                        method: "POST",
                        "Content-Type": "application/json",
                        body: JSON.stringify(formDataDirigeant)
                    })

                    if (secondRes.ok) {
                        const dataDirigeant = await secondRes.json()

                        const formDataEtude = {
                            nom_etude: `étude-${dataDirigeant.nom_dirigeant}-${dataDirigeant.id_dirigeant}-${siren}-${naf}`,
                            type: `${dataDirigeant.fonction}-${siren}`
                        }

                        const resEtude = await fetch(`/api/crud/etude/create/${client_id}`, {
                            method: "POST",
                            "Content-Type": "application/json",
                            body: JSON.stringify(formDataEtude)
                        })

                        if (resEtude.ok) {
                            const dataEtude = await resEtude.json()
                            const etude_id = dataEtude.etude_id
                            router.push(`/protected/user/questionnaire/${etude_id}`)
                        } else {
                            console.log("erreur")
                        }

                    } else {
                        console.log("erreur")
                    }


                }
                else {
                    console.log("erreur")
                }

            } catch (error) {
                console.log(error)
            }

        }

    }

    const validateData = async () => {
        if (!nomEntreprise) {
            alert('Vous devez completer le champ Nom entreprise !')
        } else {
            setDataValid(true)
            setChampSociete(false)
        }


    }


    return (
        <section className={styles.section} >
            <div>
                <NavBar accueil={false} accueilClient={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
                {champSociete ? (
                <section className={styles.parentContainer}>
                    <div className={styles.imagesContainer}>
                        <div className={styles.imageSection}>
                            <Image src={InfosEntreprise} height={300} width={300} alt='image-Access-OptiScore-connexion' priority />
                        </div>
                    </div>
                    <section className={styles.champsSociete}>
                        <h1>INFORMATIONS DE LA SOCIÉTÉ</h1>
                        <div className={styles.inputGroup}>
                            <Autocomplete
                                onChange={handleChangeSiren}
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
                                    color: "black",
                                    width: "100%",
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            border: "2px solid black",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "black",
                                            color: "black"
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "black",
                                            color: "black"
                                        },
                                    }
                                }}
                                renderInput={(params) => <TextField
                                    placeholder="Commencez a taper le nom de l'entreprise ici.."
                                    autoComplete={'off'}
                                    onChange={handleChange}
                                    {...params}
                                    label="Nom Entreprise"
                                    InputLabelProps={{
                                        style: { color: 'black' },
                                    }}
                                    inputProps={{
                                        ...params.inputProps,
                                        style: { color: 'black' }
                                    }}
                                />}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type='text'
                                id='raison_social'
                                name='raison_social'
                                value={objet_social}
                                onChange={(e) => setObjet_social(e.target.value)}
                                className={`${styles.inputGroupInput} ${objet_social ? styles.active : ''}`}
                                required
                                readOnly={isReadOnly}
                            />
                            <label htmlFor="raison_social" className={styles.inputGroupLabel}>SIREN/SIRET</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type='text'
                                id='naf'
                                name='naf'
                                value={naf}
                                onChange={(e) => setNaf(e.target.value)}
                                className={`${styles.inputGroupInput} ${naf ? styles.active : ''}`}
                                required
                                readOnly={isReadOnly}
                            />
                            <label htmlFor="naf" className={styles.inputGroupLabel}>CODE NAF</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type='text'
                                id='adresse'
                                name='adresse'
                                value={adresse_ligne_1}
                                onChange={(e) => setAdresse_ligne_1(e.target.value)}

                                className={`${styles.inputGroupInput} ${adresse_ligne_1 ? styles.active : ''}`}
                                required
                                readOnly={isReadOnly}
                            />
                            <label htmlFor="adresse" className={styles.inputGroupLabel}>ADRESSE</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input
                                type='text'
                                id='activite'
                                name='activite'
                                value={domaine_activite}
                                onChange={(e) => setDomaine_activite(e.target.value)}

                                className={`${styles.inputGroupInput} ${domaine_activite ? styles.active : ''}`}
                                required
                                readOnly={isReadOnly}
                            />
                            <label htmlFor="activite" className={styles.inputGroupLabel}>Secteur d'activité</label>
                        </div>
                        {(

                            <Button className={styles.btn} onClick={validateData}>
                                Valider les données
                            </Button>


                        )}

                    </section> </section>) : null}

                {

                    dataValid ? (
                        <div className={styles.bigDiv}>
                            <div className={styles.back}>
                                <KeyboardBackspaceIcon sx={{ fontSize: "50px", cursor: "pointer" }} onClick={handleBack} />
                            </div>
                            <section className={styles.parentContainer2}>
                                <div className={styles.imagesContainer}>
                                    <div className={styles.imageSection}>
                                        <Image src={inforsDirigeants} height={300} width={300} alt='image-Access-OptiScore-connexion' priority />
                                    </div>
                                </div>
                                <section className={styles.champsSignataire}>
                                    <div className={styles.signataireSection}>
                                        <h1>INFORMATIONS DU SIGNATAIRE </h1>
                                        <div className={styles.inputGroup}>

                                            <Box sx={{ minWidth: "100%" }}>
                                                <FormControl>
                                                    <InputLabel id="demo-simple-select-label">Civilité :</InputLabel>
                                                    <Select
                                                        labelId={`civilite-label`}
                                                        id={`civilite`}
                                                        value={civilite}
                                                        label={"civilite"}
                                                        onChange={(e) => { setCivilite(e.target.value) }}
                                                        color='secondary'
                                                        name={`civilite`}
                                                        className={styles.inputCivilite}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                "& > fieldset": {

                                                                    border: "2px solid black !important",
                                                                    borderRadius: 4
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem value={"Monsieur"}>Monsieur</MenuItem>
                                                        <MenuItem value={"Madame"}>Madame</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <input type='text' id='nom' name='nom' onChange={(e) => { setNom(e.target.value) }} className={styles.inputGroupInput} required />
                                            <label htmlFor="nom" className={styles.inputGroupLabel}  >Nom</label>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <input type='text' id='prenom' name='prenom' onChange={(e) => { setPrenom(e.target.value) }} className={styles.inputGroupInput} required />
                                            <label htmlFor="prenom" className={styles.inputGroupLabel}  >Prénom</label>

                                        </div>
                                        <div className={styles.inputGroup}>
                                            <input type='text' id='fonction' name='fonction' onChange={(e) => { setFonction(e.target.value) }} className={styles.inputGroupInput} required />
                                            <label htmlFor="fonction" className={styles.inputGroupLabel}>Fonction</label>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <input type='text' id='email' name='email' onChange={(e) => { setEmail(e.target.value) }} className={styles.inputGroupInput} required />
                                            <label htmlFor="email" className={styles.inputGroupLabel}  >Email</label>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <input type='text' id='fixe' name='fixe' onChange={(e) => { setFixe(e.target.value) }} className={styles.inputGroupInput} required />
                                            <label htmlFor="fixe" className={styles.inputGroupLabel}  >Télephone Fixe</label>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <input type='text' id='mobile' name='mobile' onChange={(e) => { setMobile(e.target.value) }} className={styles.inputGroupInput} required />
                                            <label htmlFor="mobile" className={styles.inputGroupLabel}  >Télephone Mobile</label>
                                        </div>
                                        <div className={styles.questionsRadio}>

                                            <p>Êtes-vous Signataire ?</p>
                                            <div className={styles.radio}>
                                                <FormControl className={styles.fromControl}>
                                                    <RadioGroup className={styles.groupedRadio} name="radio-buttons-group">
                                                        <Radio
                                                            checked={signataire === true}
                                                            name="signataire"
                                                            onChange={() => {
                                                                setSignataire(true);
                                                            }}
                                                            value="true"
                                                            label="OUI"
                                                            variant="outlined"
                                                            color="success"
                                                            size="lg"
                                                        />
                                                        <Radio
                                                            checked={signataire === false}
                                                            name="signataire"
                                                            onChange={() => {
                                                                setSignataire(false);
                                                            }}
                                                            value="false"
                                                            label="NON"
                                                            variant="outlined"
                                                            color="neutral"
                                                            size="lg"
                                                            className={styles.no}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>

                                        <div className={styles.questionsRadio}>
                                            <p>Êtes-vous Décisionnaire ?</p>
                                            <div className={styles.radio}>

                                                <FormControl className={styles.fromControl} >
                                                    <RadioGroup className={styles.groupedRadio} defaultValue="outlined" name="radio-buttons-group">
                                                        <Radio checked={decisionnaire === true} name={`decisionnaire`} onChange={() => { setDecisionnaire(true) }} value={signataire} label="OUI" variant="outlined" color='success' size="lg" />
                                                        <Radio checked={decisionnaire === false} name={`decisionnaire`} onChange={() => { setDecisionnaire(false) }} className={styles.no} value={signataire} label="NON" variant="outlined" color='neutral' size="lg" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>


                                        {dataValid ? (
                                            <>


                                                <Button onClick={handleEtude} className={styles.btn} variant="outlined">Démarrer l'étude</Button>

                                            </>
                                        ) : null}

                                    </div>

                                </section>
                            </section>
                        </div>


                    ) : null
                }

            </div>


        </section>

    )
}

export default InfosClient