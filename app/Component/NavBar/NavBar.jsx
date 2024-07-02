"use client"
import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react';
import LoaderForButton from "../../Component/LoaderForButton/LoaderForButton"
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ accueilClient = true, accueil = true, connexion = true, inscription = true, contact = true, backgroundColor = false, isAdmin = false, avatar = false, commission = false, portefeuille = false, burgerAccueil = false }) => {
    const { data: session, status } = useSession()

    const [filleul, setFilleul] = useState(false)

    const id = session?.user?.id

    useEffect(() => {
        if (id) {
            const fetchinData = async () => {
                const res = await fetch(`/api/crud/users/filleul?id=${id}`, {
                    method: "GET",

                })
                if (res.ok) {
                    const data = await res.json()
                    setFilleul(data.filleuls)
                }
            }
            fetchinData()
        }
    }, [id])

    const firstLetterName = session?.user?.name[0].toLocaleUpperCase()
    const firstLetterEmail = session?.user?.prenom[0].toLocaleUpperCase()

    const navContainerClass = backgroundColor
        ? `${styles.NavContainer} ${styles.backgroundColor}`
        : styles.NavContainer;
    return (
        <header className={`${styles.NavContainer}`}>
            <div className={styles.verticalBar}> <Link className={styles.linked} href={"/"}><h1>  <span className={styles.OptimLogo2}>Optim</span><span className={styles.OptimLogo}>Score</span> </h1>

                <div className={styles.madeBy}>
                    <span className={styles.made}>by</span> <br />
                    <span className={styles.made}><span className={styles.access}>Access</span> <span className={styles.energies}> Energies</span></span>
                </div>


            </Link>


            </div>
            <nav className={styles.nav} >
                <ul>
                    {accueil ? <li>  <Link className={`${styles.link} ${styles.menuDesktop}`} href={"/"}> ACCUEIL </Link>  </li> : null}
                    {connexion ? <li>  <Link className={`${styles.link} ${styles.menuDesktop}`} href={"/connexion"}> CONNEXION </Link>  </li> : null}
                    {inscription ? <li>  <Link className={`${styles.link} ${styles.menuDesktop}`} href={"/inscription"}> INSCRIPTION </Link>  </li> : null}
                    {portefeuille ? <li>  <Link className={`${styles.link} ${styles.menuDesktop}`} href={"/protected/user/portefeuille"}> PORTEFEUILLE </Link>  </li> : null}
                    {commission ? <li>  <Link className={`${styles.link} ${styles.menuDesktop}`} href={"/protected/user/commission"}> COMMISSIONS </Link>  </li> : null}

                    {avatar ? <Dropdown>

                        <MenuButton className={styles.menuButton}>
                            <Avatar className={styles.avatar}>{firstLetterName && firstLetterEmail ? `${firstLetterName}${firstLetterEmail}` : <LoaderForButton color={"#ffffff"} />}</Avatar>
                            <Menu className={styles.menuUser}>
                                {accueil ? <MenuItem className={`${styles.menuItem} ${styles.menuItemMobile}`}>Accueil</MenuItem> : null}
                                {accueilClient ? <MenuItem className={`${styles.menuItem}`}><Link className={styles.link} href={"/protected/user/accueil"}>Accueil</Link></MenuItem> : null}
                                {session?.user.role === "admin" ? <MenuItem className={`${styles.menuItem}`}><Link className={styles.linksAvatar} href={"/protected/admin/dashboard"}>Dashboard</Link></MenuItem> : null}
                                {<MenuItem className={`${styles.menuItem}`}><Link className={styles.linksAvatar} href={"/protected/user/brouillons"}>Brouillons </Link></MenuItem>}
                                {filleul ? <MenuItem className={`${styles.menuItem}`}><Link className={styles.linksAvatar} href={"/protected/user/filleuls"}>Filleuls</Link></MenuItem> : null}
                                {portefeuille ? <MenuItem className={`${styles.menuItem} ${styles.menuItemMobile}`}><Link className={''} href={"/protected/user/portefeuille"}>Portefeuille</Link></MenuItem> : null}
                                {filleul ? <MenuItem className={`${styles.menuItem} ${styles.menuItemMobile}`}><Link className={''} href={"/protected/user/filleuls"}>Filleuls</Link></MenuItem> : null}
                                {commission ? <MenuItem className={`${styles.menuItem} ${styles.menuItemMobile}`}><Link className={''} href={"/protected/user/commission"}>Commissions</Link></MenuItem> : null}
                                <MenuItem className={styles.menuItem}><Link className={styles.link} href={"/protected/user/profile"}>Profile</Link></MenuItem>
                                <MenuItem className={styles.menuItem}><Link className={styles.link} href={"/protected/user/reglages"}>Reglages</Link></MenuItem>
                                <MenuItem onClick={() => signOut({ callbackUrl: "http://localhost:3000/connexion" })} className={styles.menuItem}>Deconnexion</MenuItem>
                            </Menu>
                        </MenuButton>

                    </Dropdown> : null}
                    {burgerAccueil ?
                        <div className={styles.burgerContainer}>
                            <Dropdown>

                                <MenuButton className={styles.menuBurger}>
                                    <MenuIcon className={styles.menuIcon} />
                                    <Menu className={styles.menuUserBurger}>
                                        <MenuItem className={styles.menuItemBurger}><Link className={styles.link} href={"/"}>Accueil</Link></MenuItem>
                                        <MenuItem className={styles.menuItemBurger}><Link className={styles.link} href={"/connexion"}>Connexion</Link></MenuItem>
                                        <MenuItem className={styles.menuItemBurger}><Link className={styles.link} href={"/inscription"}>Inscription</Link></MenuItem>
                                    </Menu>
                                </MenuButton>

                            </Dropdown>
                        </div>
                        : null}
                </ul>
            </nav>
        </header>
    )
}



export default NavBar