"use client"
import styles from "./profile.module.css"
import NavBar from '../../../Component/NavBar/NavBar'
import BioCard from '../../../Component/CardForProfile/CardForProfile'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/joy/Avatar';
import Image from "next/image";
import certified from "./../../../Assets/certified.png"
import { useSession } from 'next-auth/react';
import { Skeleton } from "@mui/material";
import { CircularProgress } from "@mui/joy";
import Loader from "../../../Component/Loader/Loader"

const Profile = () => {

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
    const [datas, setData] = useState(false)
    const [userInfos, setUserInfos] = useState([])

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
                        setData(true);
                        setUserInfos(user)
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
    }, [id])


    return (
        <>
            <NavBar accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
            {datas ? <div className={styles.profileContainer} >

                <div className={styles.profileRight} >

                    <BioCard
                        nomA={nom.charAt(0).toLocaleUpperCase()}
                        prenomA={prenom.charAt(0).toLocaleUpperCase()}
                        nom={nom}
                        prenom={prenom}
                        siren={siren}
                        fonction={fonction}
                        commissions={commissionNumber ? commissionNumber : null}
                        clients={clientNumber ? clientNumber : null}
                        filleuls={filleulNumber ? filleulNumber : null}
                        email={email ? email : null}
                        numero={numero ? numero : null}
                        raisonSocial={raisonSociale ? raisonSociale : null}
                        fixe={fixe ? fixe : null}
                        createdAt={creerLe ? new Date(creerLe).toLocaleString('fr-FR') : null}
                        updatedAt={modifierLe ? new Date(modifierLe).toLocaleString('fr-FR') : null}
                        confirmed={confirmed}
                        activated={activated}
                    />


                </div>

            

            </div> : <div className={styles.profileLoader}>

                <Loader />
            </div>
            }

        </>
    )
}

export default Profile