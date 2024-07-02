"use client"
import React from 'react'
import styles from "./dashboard.module.css"
import Link from 'next/link'
import AppIcons from "./icons/AppIcons/AppIcons"
import { DocIcon } from './icons/DocIcon'
import { UpdatesIcon } from './icons/UpdatesIcon'
import { ArIcon } from './icons/ArIcon'
import Pic from "../components/Pic"
import { useState } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import Avatar from '@mui/joy/Avatar';
import agg from "./../../../Assets/agrandir.png"
import Image from "next/image"
import ModalModifyClient from "./../../../Component/ModalModifyClient/ModalModifyClient"
import BookIcon from '@mui/icons-material/Book';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import WalletIcon from '@mui/icons-material/Wallet';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import Dashboard from "./../components/Dashboard/Dashboard"
import Modification from "./../components/Modification/Modification"
import Commission from "./../components/Commission/Commission"
import Etudes from "./../components/Etudes/Etudes"
import Reglages from "./../components/Reglages/Reglages"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Creer from "./../components/Commission/Creer/Creer"
import Modifier_COM from "./../components/Commission/Modifier/Modifier"
import Creer_etude from "./../components/Etudes/Creer/Creer"
import Modifier_etude from "./../components/Etudes/Modifier/Modifier"
import Supprimer_etude from "./../components/Etudes/Supprimer/Supprimer"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Client from "./../components/Clients/Clients"
import CreerClient from "./../components/Clients/Creer/Creer"
import ModifierClient from "./../components/Clients/Modifier/Modifier"
import SupprimerClient from "./../components/Clients/Supprimer/Supprimer"
import Dirigeants from "./../components/Dirigeants/Dirigeants"
import CreerDIRIGEANTS from "./../components/Dirigeants/Creer/Creer"
import ModifierDIRIGEANTS from "./../components/Dirigeants/Modifier/Modifier"
import SupprimerDIRIGEANTS from "./../components/Dirigeants/Supprimer/Supprimer"
import Contrats from "./../components/Contrats/Contrats"
import CreerContrats from "./../components/Contrats/Creer/Creer"
import ModifierContrats from "./../components/Contrats/Modifier/Modifier"
import SupprimerContrats from "./../components/Contrats/Supprimer/Supprimer"
import Resultats from "./../components/Resultat/Resultat"
import CreerResultat from "./../components/Resultat/Creer/Creer"
import ModifierResultat from "./../components/Resultat/Modifier/Modifier"
import SupprimerResultat from "./../components/Resultat/Supprimer/Supprimer"
import Filleuls from "./../components/Filleuls/Filleuls"
import CreerFilleuls from "./../components/Filleuls/Creer/Creer"
import ModifierFilleuls from "./../components/Filleuls/Modifier/Modifier"
import SupprimerFilleuls from "./../components/Filleuls/Supprimer/Supprimer"
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import MenuItem from '@mui/joy/MenuItem';
import { signOut } from "next-auth/react"
import EjectIcon from '@mui/icons-material/Eject';
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import Utilisateur from "./../components/Utilisateurs/Utilisateurs"
import CreerUtilisateur from "./../components/Utilisateurs/Creer/Creer"
import ModifierUtilisateur from "./../components/Utilisateurs/Modifier/Modifier"
import SupprimerUtilisateur from "./../components/Utilisateurs/Supprimer/Supprimer"
const dashboard = () => {
    const OPTIONS = {
        DASHBOARD: 'dashboard',
        MODIF: 'modif',
        COMMISSIONS: 'commissions',
        REGLAGES: 'reglages',
        CREER_COMMISSION: 'Creer_com',
        MODIFIER_COMMISSION: 'Modify_com',
        ETUDES: "etudes",
        CREER_ETUDES: "creer_etudes",
        MODIFIER_ETUDES: "modifier_etudes",
        SUPPRIMER_ETUDES: "supprimer_etudes",
        CLIENTS: "clients",
        CREER_CLIENTS: "creer_client",
        MODIFIER_CLIENTS: "modifier_client",
        SUPPRIMER_CLIENTS: "supprimer_client",
        DIRIGEANTS: "dirigeants",
        CREER_DIRIGEANTS: "creer_dirigeant",
        MODIFIER_DIRIGEANTS: "modifier_dirigeant",
        SUPPRIMER_DIRIGEANTS: "supprimer_dirigeant",
        CONTRATS: 'contrats',
        CREER_CONTRATS: "creer_contrat",
        MODIFIER_CONTRATS: "modifier_contrat",
        SUPPRIMER_CONTRATS: "supprimer_contrat",
        RESULTATS: 'resultats',
        CREER_RESULTATS: "creer_resultat",
        MODIFIER_RESULTATS: "modifier_resultat",
        SUPPRIMER_RESULTATS: "supprimer_resultat",
        FILLEULS: 'Filleuls',
        CREER_FILLEULS: "creer_Filleul",
        MODIFIER_FILLEULS: "modifier_Filleul",
        SUPPRIMER_FILLEULS: "supprimer_Filleul",
        UTILISATEUR: "Utilisateur",
        CREER_UTILISATEUR: "creer_Utilisateur",
        MODIFIER_UTILISATEUR: "modifier_Utilisateur",
        SUPPRIMER_UTILISATEUR: "supprimer_Utilisateur",
    };
    const { data: session, status } = useSession()
    const [selectedOption, setSelectedOption] = useState(OPTIONS.DASHBOARD)
    const [asideOpen, setAsideOpen] = useState(true)
    const handleChoice = (choice) => {
        setSelectedOption(choice);
    }
    const toggleAside = () => {
        setAsideOpen(!asideOpen);
    }

    return (
        <section className={styles.sectionContainer}>
            <div className={styles.dashboardContainer}>
                <button className={`${styles.btnToggleAside} ${asideOpen ? null : styles.test}`} onClick={toggleAside}> {asideOpen ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />} </button>
                {asideOpen && (<aside className={`${styles.asides} ${asideOpen ? styles.ouverture : styles.fermeture}`} >
                    <div className={styles.btnsMacContainer} >
                        <div className={styles.btnsMac}>
                            <div className={styles.btns}>

                            </div>
                        </div>

                        <ul>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Vu d'ensemble
                                    </div>
                                    <div className={styles.linksContainer}>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.DASHBOARD ? styles.focus : null}`}>

                                            <div className={styles.icons}>  <AppIcons /> </div> <p className={styles.links} onClick={() => handleChoice(OPTIONS.DASHBOARD)} >Dashboard</p>
                                        </div>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIF ? styles.focus : null}`}>
                                            <div className={styles.icons}><UpdatesIcon />  </div><p className={`${styles.links} `} onClick={() => handleChoice(OPTIONS.MODIF)} >Essentiels</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Utilisateurs
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_UTILISATEUR ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_UTILISATEUR)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_UTILISATEUR ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_UTILISATEUR)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_UTILISATEUR ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_UTILISATEUR)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Etudes
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.ETUDES ? styles.focus : null}`}>
                                            <div className={styles.icons}> <RemoveRedEyeIcon />  </div> <p className={styles.links} onClick={() => handleChoice(OPTIONS.ETUDES)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_ETUDES ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_ETUDES)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_ETUDES ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_ETUDES)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_ETUDES ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_ETUDES)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Commissions
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.COMMISSIONS ? styles.focus : null}`}>
                                            <div className={styles.icons}> <RemoveRedEyeIcon />  </div> <p className={styles.links} onClick={() => handleChoice(OPTIONS.COMMISSIONS)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_COMMISSION ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_COMMISSION)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_COMMISSION ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_COMMISSION)} >Modifier</p>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Clients
                                    </div>
                                    <div className={styles.linksContainer}>


                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CLIENTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><RemoveRedEyeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CLIENTS)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_CLIENTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_CLIENTS)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_CLIENTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_CLIENTS)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_CLIENTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_CLIENTS)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Contrats
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CONTRATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><RemoveRedEyeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CONTRATS)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_CONTRATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_CONTRATS)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_CONTRATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_CONTRATS)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_CONTRATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_CONTRATS)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Resultats
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.RESULTATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><RemoveRedEyeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.RESULTATS)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_RESULTATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_RESULTATS)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_RESULTATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_RESULTATS)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_RESULTATS ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_RESULTATS)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Dirigeants
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.DIRIGEANTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><RemoveRedEyeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.DIRIGEANTS)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_DIRIGEANTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_DIRIGEANTS)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_DIRIGEANTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_DIRIGEANTS)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_DIRIGEANTS ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_DIRIGEANTS)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>


                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Filleuls
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.FILLEULS ? styles.focus : null}`}>
                                            <div className={styles.icons}><RemoveRedEyeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.FILLEULS)} >Voir tout</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.CREER_FILLEULS ? styles.focus : null}`}>
                                            <div className={styles.icons}><AutoAwesomeIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.CREER_FILLEULS)} >Creer</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.MODIFIER_FILLEULS ? styles.focus : null}`}>
                                            <div className={styles.icons}><ModeEditOutlineIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.MODIFIER_FILLEULS)} >Modifier</p>
                                        </div>
                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.SUPPRIMER_FILLEULS ? styles.focus : null}`}>
                                            <div className={styles.icons}><DeleteForeverIcon />  </div><p className={styles.links} onClick={() => handleChoice(OPTIONS.SUPPRIMER_FILLEULS)} >Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Reglages
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons} ${selectedOption === OPTIONS.REGLAGES ? styles.focus : null}`}>
                                            <div className={styles.icons}>  <AppIcons /> </div> <p className={styles.links} onClick={() => handleChoice(OPTIONS.REGLAGES)} >Mon compte</p>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={styles.AppContainer}>
                                    <div className={styles.AppTitle}>
                                        Deconnexion
                                    </div>
                                    <div className={styles.linksContainer}>

                                        <div className={`${styles.linksAndIcons}`}>
                                            <div className={styles.icons}>  <HomeIcon /> </div> <Link className={styles.links} href={"/"} >Accueil</Link>
                                        </div>
                                        <div className={`${styles.linksAndIcons}`}>
                                            <div className={styles.icons}>  <EjectIcon /> </div><Button sx={{ color: "white" }} onClick={() => signOut({ callbackUrl: "http://localhost:3000/connexion" })} className={styles.deconnexion}>Deconnexion </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>

                        </ul>

                    </div>

                </aside>)}
                <div className={styles.infoContainer}>
                    <header>
                        <div className={styles.headerContainer}>
                            <div className={styles.navbar}>
                                <div className={styles.generalContainer}>
                                    <div className={styles.firstContainer}>
                                        <button type='button' aria-label='Ouvrir le menu'  >≡</button>
                                    </div>
                                    <div className={styles.secondContainer}>
                                        <input placeholder='Rechercher' />
                                        <div className={styles.plus}>+</div>
                                    </div>
                                    <div className={styles.thirdContainer}>
                                        <span>
                                            <ArIcon />
                                            <span className={styles.numbNotif}>0</span>
                                        </span>
                                        <span className={styles.profilePic}>
                                            <div className={styles.pic}>

                                                <Dropdown className={styles.dropdown}  >
                                                    <MenuButton className={styles.dropdown}><div className={styles.pic}><Avatar>{session?.user?.name[0]}</Avatar></div></MenuButton>
                                                    <Menu className={styles.menuItem} >
                                                        <MenuItem><Link className={styles.link} href={"/protected/user/accueil"}>Accueil</Link></MenuItem>
                                                        <MenuItem><Link className={styles.link} href={"/protected/user/accueil"}>Reglage</Link> </MenuItem>
                                                        <MenuItem onClick={() => signOut({ callbackUrl: "http://localhost:3000/connexion" })} className={styles.deconnexion}>Deconnexion </MenuItem>
                                                    </Menu>
                                                </Dropdown>
                                            </div>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </header>
                    {selectedOption === OPTIONS.DASHBOARD ? (<Dashboard />)
                        : selectedOption === OPTIONS.MODIF ? <Modification /> :
                            selectedOption === OPTIONS.COMMISSIONS ? <Commission /> :
                                selectedOption === OPTIONS.CONTRATS ? <Contrats /> :
                                    selectedOption === OPTIONS.ETUDES ? <Etudes /> :
                                        selectedOption === OPTIONS.REGLAGES ? <Reglages /> :
                                            selectedOption === OPTIONS.CREER_COMMISSION ? <Creer /> :
                                                selectedOption === OPTIONS.MODIFIER_COMMISSION ? <Modifier_COM /> :
                                                    selectedOption === OPTIONS.CREER_ETUDES ? <Creer_etude /> :
                                                        selectedOption === OPTIONS.MODIFIER_ETUDES ? <Modifier_etude /> :
                                                            selectedOption === OPTIONS.SUPPRIMER_ETUDES ? <Supprimer_etude /> :
                                                                selectedOption === OPTIONS.CLIENTS ? <Client /> :
                                                                    selectedOption === OPTIONS.CREER_CLIENTS ? <CreerClient /> :
                                                                        selectedOption === OPTIONS.MODIFIER_CLIENTS ? <ModifierClient /> :
                                                                            selectedOption === OPTIONS.SUPPRIMER_CLIENTS ? <SupprimerClient /> :
                                                                                selectedOption === OPTIONS.DIRIGEANTS ? <Dirigeants /> :
                                                                                    selectedOption === OPTIONS.CREER_DIRIGEANTS ? <CreerDIRIGEANTS /> :
                                                                                        selectedOption === OPTIONS.MODIFIER_DIRIGEANTS ? <ModifierDIRIGEANTS /> :
                                                                                            selectedOption === OPTIONS.SUPPRIMER_DIRIGEANTS ? <SupprimerDIRIGEANTS /> :
                                                                                                selectedOption === OPTIONS.CREER_CONTRATS ? <CreerContrats /> :
                                                                                                    selectedOption === OPTIONS.MODIFIER_CONTRATS ? <ModifierContrats /> :
                                                                                                        selectedOption === OPTIONS.SUPPRIMER_CONTRATS ? <SupprimerContrats /> :
                                                                                                            selectedOption === OPTIONS.RESULTATS ? <Resultats /> :
                                                                                                                selectedOption === OPTIONS.MODIFIER_RESULTATS ? <ModifierResultat /> :
                                                                                                                    selectedOption === OPTIONS.SUPPRIMER_RESULTATS ? <SupprimerResultat /> :
                                                                                                                        selectedOption === OPTIONS.CREER_RESULTATS ? <CreerResultat /> :
                                                                                                                            selectedOption === OPTIONS.FILLEULS ? <Filleuls /> :
                                                                                                                                selectedOption === OPTIONS.MODIFIER_FILLEULS ? <ModifierFilleuls /> :
                                                                                                                                    selectedOption === OPTIONS.SUPPRIMER_FILLEULS ? <SupprimerFilleuls /> :
                                                                                                                                        selectedOption === OPTIONS.CREER_FILLEULS ? <CreerFilleuls /> :
                                                                                                                                                selectedOption === OPTIONS.MODIFIER_UTILISATEUR ? <ModifierUtilisateur /> :
                                                                                                                                                    selectedOption === OPTIONS.SUPPRIMER_UTILISATEUR ? <SupprimerUtilisateur /> :
                                                                                                                                                        selectedOption === OPTIONS.CREER_UTILISATEUR ? <CreerUtilisateur /> :

                                                                                                                                                            null}
                </div>
            </div>
        </section>

    )
}

export default dashboard