'use client'
import React, { useEffect, useState } from 'react';
import styles from './../questionnaire.module.css'
import NavBar from '../../../../Component/NavBar/NavBar';
import Loader from "../../../../Component/Loader/Loader"
import { useRouter } from 'next/navigation';
import { useMyContext } from "./../../../../Context/resultContext/Context.js"
import SurveyComponent from '../../../../Component/SurveyComponent/SurveyComponent.jsx';
const Questionnaire = ({ params }) => {
    
    const [eligibleCSPE, setEligibleCSPE] = useState(false)
    const [waitingConfirm, setWaitingConfirm] = useState(true);
    const router = useRouter()
    const { setIdEtude, setIdClient } = useMyContext()
    const [etude, setEtude] = useState(0)
    const [NAF, setNAF] = useState('')

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/crud/etude/${params.slug}`, {
                    method: "GET"
                });

                if (res.ok) {
                    const dataEtude = await res.json();

                    if (dataEtude.etude.statut === 'terminé' || !dataEtude.etude.brouillon ) {
                        router.push("/protected/user/information-client");
                    }
                    setIdEtude(dataEtude.etude.id)
                    setIdClient(dataEtude.client.id)
                    setEtude(dataEtude.etude.id)
                    const codeNaf = dataEtude.client.code_naf

                    const nafNumb = parseInt(codeNaf.split(".")[0])

                    if (nafNumb >= 5 && nafNumb <= 39) {
                        setEligibleCSPE(true)
                    } else {
                        setEligibleCSPE(false)
                    }
                } else {
                    setWaitingConfirm(false)

                    router.push("/protected/user/information-client");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération des données :", error);
            }

        };

        fetchData();
    }, []);

    return (

        <>
            {waitingConfirm ? (
                <>
                    <NavBar
                        accueil={false}
                        connexion={false}
                        contact={false}
                        inscription={false}
                        backgroundColor={true}
                        avatar={true}
                        isAdmin={true}
                        portefeuille={true}
                        commission={true}
                    />
                    <div className={styles.main}>

                        <SurveyComponent CSPE={eligibleCSPE} naf={NAF} etude={etude} />

                    </div>
                </>
            ) : <div className={styles.testing}><Loader /></div>}

        </>

    );
};

export default Questionnaire;
