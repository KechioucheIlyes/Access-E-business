'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import fourniturElec from "../../../Assets/green-elec.svg"
import acheminement from "../../../Assets/acheminement-2.svg"

import cspe from "../../../Assets/money-pig.svg"
import ecoEnergie from "../../../Assets/eco-energy-2.svg"
import decretReglementaire from "../../../Assets/decret-reglementaire.svg"
import styles from "./resultat.module.css"
import NavBar from '../../../Component/NavBar/NavBar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation'
import { useMyContext } from "../../../Context/resultContext/Context"
import Box from '@mui/joy/Box';
import Snackbar from '@mui/joy/Snackbar';
import BioCard from "./../../../Component/BioCard/BioCard"
import GaugeChart from "react-gauge-chart";
import { AnimatedCounter } from 'react-animated-counter';
import Loader from "./../../../Component/Loader/Loader"

const page = () => {
    const router = useRouter()
    const [client, setClient] = useState(null)
    const [resultat, setResultat] = useState(null)
    const [etudes, setEtudes] = useState(null)
    const { data: session, status } = useSession()
    const [redi, setRedi] = useState(false)
    const [notificationValid, setNotificationValid] = useState(false)
    const [notificationError, setNotificationError] = useState(false)
    const [messageValid, setMessageValid] = useState('')
    const [messageError, setMessageError] = useState('')
    const [dataReceived, setDataReceived] = useState(false)
    const handleCloseValid = () => {
        setNotificationValid(false);
    };

    const handleCloseError = () => {
        setNotificationError(false);
    };

    const handleGenerate = async () => {
        const result = { result: resultat, client: client, etudes: etudes }
        try {
            const res = await fetch("/api/generatecpp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            })

            if (!res.ok) {
                setNotificationValid(false)
                setNotificationError(true)
                setMessageError("Une erreur s'est produite veuillez reessayer plus tard !")
            } else {
                const data = await res.json()
                setNotificationValid(true)
                setNotificationError(false)
                setMessageValid(data.message)
                console.log(data.message, data.statut)

            }
        } catch (error) {
            setNotificationValid(false)
            setNotificationError(true)
            setMessageError("Une erreur s'est produite veuillez reessayer plus tard !")
        }

    }

    const { idEtude, idClient } = useMyContext();

    if (!idEtude || !idClient) {
        redirect("/protected/user/accueil")
    }
    if (redi) {
        redirect("/protected/user/accueil")
    }
    useEffect(() => {

        const encodedIdEtude = btoa(`${idEtude}`);
        const encodedIdClient = btoa(`${idClient}`);
        async function fetchData() {
            const res = await fetch(`/api/crud/etude/allinf/${encodedIdEtude}/${encodedIdClient}`)

            if (!res.ok) {

                setRedi(true)
                console.log(res)

            } else {
                const data = await res.json()
                setDataReceived(true)
                setClient(data.client)
                setResultat(data.resultat)
                setEtudes(data.etude)
            }
        }
        fetchData()
    }, [])


    return (

        <div>
            <NavBar accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
            <Box sx={{ width: 500, backgroundColor: "red" }}>
                <Snackbar
                    variant='soft'
                    sx={{
                        color: '#1a252a',
                        fontWeight: "bolder",
                        backgroundColor: '#f0f2f5',
                        border: "2px solid #1a252a"
                    }}
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
            {dataReceived ? (
                <>
                    <div className={styles.infosResult}>
                        <div className={styles.nameAndSiret}>
                            <h1>Raison sociale : {client ? client.nom_entreprise : null} </h1>
                            <h1>Siren/Siret : {client ? client.siret : null}</h1>
                        </div>

                    </div>
                    <div className={styles.AccordionsContainer}>
                        <Accordion defaultExpanded className={styles.Accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: '#2c8442',
                                    color: "#fff"
                                }}
                            >
                                Résultat et optimisation de votre étude
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.CardContainer}>
                                    <div className={`${styles.cardRes} ${resultat
                                        ? resultat.noteGlobal > 11 ? styles.vert :
                                            resultat.noteGlobal <= 9 ? styles.rouge :
                                                styles.orange
                                        : ''}`}>
                                        <div className={styles.titleCard}>
                                            <p>Resultat</p>
                                        </div>
                                        {resultat ? <div className={styles.test}>


                                            <AnimatedCounter includeDecimals={false} value={resultat ? resultat.noteGlobal : 0} color="black" fontSize="30px" />

                                            <p>
                                                /20
                                            </p>
                                        </div> : null}
                                    </div>




                                    <div className={styles.cardRes}>
                                        <div className={styles.titleCard}>
                                            <p>Optimisation</p>
                                        </div>
                                        <GaugeChart
                                            id="gauge-chart3"
                                            nrOfLevels={5}
                                            colors={["#EA4228", "#e6db2a", "#5BE12C"]}
                                            arcWidth={0.3}
                                            percent={resultat ? ((resultat.noteGlobal * 100) / 20) / 100 : 0}
                                            textColor={'black'}
                                        />
                                    </div>





                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded className={styles.Accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: '#2c8442',
                                    color: "#fff"
                                }}
                            >
                                Score par composante de vos factures
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.CardContainerScore}>
                                    <div className={`${styles.cardScore} ${resultat
                                        ? resultat.noteCategorieAnalyse > 6 ? styles.vert :
                                            resultat.noteCategorieAnalyse <= 4 ? styles.rouge :
                                                styles.orange
                                        : ''}`}
                                    >
                                        <div className={styles.titleCard}>
                                            <p>Contrat</p>
                                        </div>
                                        {resultat ? <div className={styles.test}>


                                            <AnimatedCounter includeDecimals={false} value={resultat ? resultat.noteCategorieAnalyse : 0} color="black" fontSize="30px" />
                                            <p>
                                                /10
                                            </p>
                                        </div> : null}

                                    </div>
                                    <div className={`${styles.cardScore} ${resultat
                                        ? resultat.noteCategorieTaxes > 6 ? styles.vert :
                                            resultat.noteCategorieTaxes <= 4 ? styles.rouge :
                                                styles.orange
                                        : ''}`}>
                                        <div className={styles.titleCard}>

                                            <p>Acheminement</p>
                                        </div>
                                        {resultat ? <div className={styles.test}>

                                            <AnimatedCounter includeDecimals={false} value={resultat ? resultat.noteCategorieTaxes : 0} color="black" fontSize="30px" />
                                            <p>
                                                /10
                                            </p>
                                        </div> : null}

                                    </div>
                                    <div className={`${styles.cardScore} ${resultat
                                        ? resultat.CSPE ? styles.vert :
                                            styles.rouge
                                        : ''}`}>
                                        <div className={styles.titleCard}>

                                            <p>CSPE</p>

                                        </div>
                                        <p>{resultat ? `${resultat.CSPE ? "Assujeti" : "NON SOUMIS"}` : null}</p>
                                    </div>
                                    <div className={`${styles.cardScore} ${resultat
                                        ? resultat.noteCategorieEconomiesEnergie > 6 ? styles.vert :
                                            resultat.noteCategorieEconomiesEnergie <= 4 ? styles.rouge :
                                                styles.orange
                                        : ''}`}>
                                        <div className={styles.titleCard}>

                                            <p>Economie D'energies</p>
                                        </div>

                                        {resultat ? <div className={styles.test}>

                                            <AnimatedCounter includeDecimals={false} value={resultat ? resultat.noteCategorieEconomiesEnergie : 0} color="black" fontSize="30px" />
                                            <p>
                                                /10
                                            </p>
                                        </div> : null}

                                    </div>


                                    <div className={`${styles.cardScore} ${resultat && (resultat.rg_operate_tertiaire_oui_01 || resultat.rg_oblig_obj_tertiaire_oui_01 || resultat.rg_bis_1k_tertiaire_non_01) ? styles.vert : styles.rouge}   `}>
                                        <div className={styles.titleCard}>
                                            <p>Decret tertiare</p>
                                        </div>

                                        <p>{(resultat && (resultat.rg_operate_tertiaire_oui_01 || resultat.rg_oblig_obj_tertiaire_oui_01 || resultat.rg_bis_1k_tertiaire_non_01) ? "SOUMIS" : "-")}</p>
                                    </div>

                                    <div className={`${styles.cardScore} ${resultat && resultat.rg_bacs_outils_oui_01 ? styles.vert : styles.rouge}`}>
                                        <div className={styles.titleCard}>
                                            <p>Decret Bacs</p>
                                        </div>
                                        <p>{resultat && resultat.rg_bacs_outils_oui_01 ? "SOUMIS" : "-"}</p>
                                    </div>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded className={styles.Accordion}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: '#2c8442',
                                    color: "#fff"
                                }}
                            >
                                Part représentative de votre facture optimisable
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.CardContainer}>
                                    {resultat && resultat.noteCategorieAnalyse <= 5 ? <div className={styles.card}>
                                        <Image src={fourniturElec} alt='fourniture-elec' height={80} width={80} priority />
                                        <p> Fourniture d'électricité</p>
                                        <p> 38% </p>
                                    </div> : null

                                    }

                                    {
                                        resultat && resultat.noteCategorieTaxes <= 5 ? <div className={styles.card}>
                                            <Image src={acheminement} alt='acheminement' height={80} width={80} priority />
                                            <p>Acheminement</p>
                                            <p>38%</p>
                                        </div>
                                            : null
                                    }

                                    {
                                        resultat && resultat.CSPE ? <div className={styles.card}>
                                            <Image src={cspe} alt='cspe' height={80} width={80} priority />
                                            <p>C.S.P.E</p>
                                            <p>30%</p>
                                        </div> : null
                                    }

                                    {
                                        resultat && resultat.noteCategorieEconomiesEnergie <= 5 ? <div className={styles.card}>
                                            <Image src={ecoEnergie} alt='economie-energie' height={80} width={80} priority />
                                            <p>Economies d'énergie</p>
                                            <p>11%</p>
                                        </div>
                                            : null
                                    }

                                    {resultat && (resultat.rg_operate_tertiaire_oui_01 || resultat.rg_oblig_obj_tertiaire_oui_01 || resultat.rg_bis_1k_tertiaire_non_01) || (resultat && resultat.rg_bacs_outils_oui_01) ? <div className={styles.card}>
                                        <Image src={decretReglementaire} alt='decret-reglementaire' height={80} width={80} priority />
                                        <p>Decret Reglementaire</p>
                                        <p>38%</p>
                                    </div> : null}

                                </div>
                            </AccordionDetails>
                        </Accordion>


                        <Accordion defaultExpanded className={styles.Accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: '#2c8442',
                                    color: "#fff"
                                }}
                            >Informations relatives au signataire</AccordionSummary>
                            <AccordionDetails>
                                <div className={styles.infosClient}>
                                    <BioCard
                                        nom_entreprise={client ? client.nom_entreprise : null}
                                        adresse={client ? client.adresse_postal : null}
                                        siret={client ? client.siret : null}
                                        nom_du_contact={client ? (client.Dirigeants[0].nom).toUpperCase() : null}
                                        prenom_du_contact={client ? client.Dirigeants[0].prenom.toUpperCase() : null}
                                        email={client ? client.Dirigeants[0].email : null}
                                        tel={client ? client.Dirigeants[0].mobile : null}
                                        gender={client ? client.Dirigeants[0].civilite : null}
                                    />
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={true} defaultExpanded={true} className={styles.Accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: '#2c8442',
                                    color: "#fff"
                                }}
                            >Recapitulatif</AccordionSummary>
                            <AccordionDetails className={styles.recapContainer}>
                                {resultat && resultat.noteCategorieAnalyse <= 5 ? <div className={styles.recapReponse}>
                                    <div className={styles.titleCard}>
                                        <h2>Analyse contractuelle</h2>
                                    </div>
                                    <div className={styles.details}>
                                        <h3>Note de {resultat ? `${resultat.noteCategorieAnalyse}/10` : null} dont au moins une réponse nécessite une stratégie d'achat et la mise en concurrence des fournisseurs.</h3>
                                    </div>
                                </div> : null}

                                {resultat && resultat.noteCategorieTaxes <= 5 ? <div className={styles.recapReponse}>
                                    <div className={styles.titleCard}>
                                        <h2>Optimisation de l'acheminement</h2>
                                    </div>
                                    <div className={styles.details}>
                                        <h3>Note de {resultat ? `${resultat.noteCategorieTaxes}/10` : null} dont au moins une réponse nécesite le calibrage de la puissance et la formule tarifaire d'acheminemt et la puissance</h3>
                                    </div>
                                </div> : null}

                                {resultat && resultat.CSPE ? <div className={styles.recapReponse}>
                                    <div className={styles.titleCard}>
                                        <h2>Remboursement de la CSPE</h2>
                                    </div>
                                    <div className={styles.details}>
                                        <h3>
                                            Après avoir minutieusement examiné les réponses relatives à la CSPE, il est fortement recommandé de déposer une demande de remboursement. Il est essentiel de souligner qu'un test d'éligibilité est requis pour constituer un dossier de remboursement.</h3></div>
                                </div> : null}

                                {resultat && resultat.noteCategorieEconomiesEnergie <= 5 ? <div className={styles.recapReponse}>
                                    <div className={styles.titleCard}>
                                        <h2>Réduire sa consommation</h2>
                                    </div>
                                    <div className={styles.details}>
                                        <h3>Note de {resultat ? `${resultat.noteCategorieEconomiesEnergie}/10` : null} dont au moins une réponse nécessite de déterminer les leviers afin de réduire votre consommation.</h3>
                                    </div>
                                </div> : null}

                                {resultat && (resultat.rg_operate_tertiaire_oui_01 || resultat.rg_oblig_obj_tertiaire_oui_01 || resultat.rg_bis_1k_tertiaire_non_01) || (resultat && resultat.rg_bacs_outils_oui_01) ? <div className={styles.recapReponse}>
                                    <div className={styles.titleCard}>
                                        <h2>Se mettre en conformité</h2>
                                    </div>
                                    <div className={styles.details}>
                                        <h3>Vos réponses nécessitent une mise en conformité avec l'impact de réduire sa consommation.</h3>
                                    </div>
                                </div> : null}
                            </AccordionDetails>
                        </Accordion>
                        <div className={styles.btnContainer}>
                            <button onClick={handleGenerate} className={styles.buttonCpp}>Generer CPP</button>
                        </div>

                    </div>

                </>
            )
                :
                <div className={styles.testing}><Loader /></div>}





        </div>
    )
}

export default page