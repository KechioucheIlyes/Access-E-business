"use client"
import React from 'react'
import styles from "./../../dashboard/dashboard.module.css"
import Link from 'next/link'
import AppIcons from "./../../dashboard/icons/AppIcons/AppIcons"
import { DocIcon } from './../../dashboard/icons/DocIcon'
import { UpdatesIcon } from './../../dashboard/icons/UpdatesIcon'
import { ArIcon } from './../../dashboard/icons/ArIcon'
import Pic from "./../../components/Pic"
import { useState } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import Avatar from '@mui/joy/Avatar';
import agg from "./../../../../Assets/agrandir.png"
import Image from "next/image"
import ModalModifyClient from "./../../../../Component/ModalModifyClient/ModalModifyClient"
import BookIcon from '@mui/icons-material/Book';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import WalletIcon from '@mui/icons-material/Wallet';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { Input } from '@mui/joy'

const Dashboard = () => {
    const { data: session, status } = useSession()
    let [users, setUsers] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    let [allUsers, setAllUsers] = useState([])
    let [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('')
    const itemsPerPage = 10;
    const [childrenData, setChildrenData] = useState(null)

    const handleCallback = (data) => {
        setChildrenData(data)
    };

    const getFilteredRows = () => {
        if (!searchQuery) return allUsers;
        return allUsers.filter((allUsers) =>
            allUsers.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            allUsers.prenom.toLowerCase().includes(searchQuery.toLowerCase())

        );
    };

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };


    const handleModify = (id) => {
        alert(`modify  ${id}`)
        setOpenModal(true)
    }

    const [selectedUser, setSelectedUser] = useState(null);


    const handleValidate = async (id) => {

        const res = await fetch("/api/crud/confirm", {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({
                user_id: id
            })
        })
        if (res.ok) {
            const data = await res.json()
            const updatedUserList = users.filter(user => user.id !== id);
            setUsers(updatedUserList)

        } else {
            return
        }
    }
    const handleRefuse = async (id) => {

        const res = await fetch("/api/crud/refuse", {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({
                user_id: id
            })
        })

        if (res.ok) {
            const data = await res.json()
            const updatedUserList = users.filter(user => user.id !== id);
            setUsers(updatedUserList)
        } else {
            return
        }
    }

    useEffect(() => {
        const fetchinData = async () => {
            const res = await fetch("/api/crud/newInscription", {

                method: "GET",


            })

            if (res.ok) {
                const data = await res.json()
                if (data) {

                    const newUsers = data.newUsers
                    setUsers(newUsers);
                }
            } else {
                return
            }
        }
        fetchinData()
        const fetchingAllUsers = async () => {
            const res = await fetch("/api/crud/allUsers", {
                method: "GET",

            })
            if (res.ok) {
                const data = await res.json()
                if (data) {
                    const newUsers = data.newUsers
                    setAllUsers(newUsers);
                }
            } else {
                return
            }
        }
        fetchingAllUsers()
    }, [childrenData])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleRows = getFilteredRows().slice(startIndex, endIndex);
    const hasNextPage = endIndex < allUsers.length;

    return (
        <main>
            <div>
                <div className={styles.chart}>
                    <h1>{session?.user?.name ? `${session?.user?.name}, Bienvenue dans Votre Dashbord` : null}</h1>
                    <Pic src={"/glass.png"} />
                </div>

                <div className={styles.anotherInfosContainer}>
                    <div className={styles.inscriptionContainer}>
                        <div className={styles.aggrandir}>
                            <h1>Nouvelles inscriptions</h1>
                            <div className={styles.btnsMacGreen}>
                                <div className={styles.btns} onClick={handleModalToggle}>
                                    <Image src={agg} width={10} height={10} alt="aggrandir" priority />
                                </div>
                            </div>
                        </div>
                        {modalOpen && (
                            <div className={styles.modalOverlay}>
                                <div className={styles.modalContent}>
                                    <div className={styles.redbtn}>
                                        <div className={styles.btnsMacRed}>
                                            <div className={styles.btns} onClick={handleModalToggle}>
                                                x
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.inscription}>
                                        <div className={styles.table}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th scope='col' >Utilisateur</th>
                                                        <th scope='col' >Raison Social</th>
                                                        <th scope='col' >inscription Le</th>
                                                        <th scope='col' >Message</th>
                                                        <th scope='col' >Verdict</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users ? users.map(user => {
                                                        const firstLetterName = user.name[0]
                                                        const firstLetterPrenom = user.prenom[0]

                                                        return (
                                                            <tr key={user.id} >
                                                                <td>
                                                                    <div className={styles.tdContainer}>
                                                                        <div className={styles.pic}><Avatar>{firstLetterName}{firstLetterPrenom} </Avatar></div>
                                                                        <div className={styles.infoTd}> <p>{user.name} {user.prenom}</p></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={styles.tdContainer}>

                                                                        <div className={styles.infoTd}><p>{user.raison_social}</p></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={styles.tdContainer}>
                                                                        <div className={styles.infoTd}><p>{new Date(user.create_time).toLocaleDateString()}</p></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={styles.tdContainer}>

                                                                        <div className={styles.infoTd}>
                                                                            <p>{user.commentaire}</p>

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={styles.tdContainer}>
                                                                        <div className={styles.infoTd}>
                                                                            <div className={styles.btnsVerdict}>
                                                                                <button type='button' onClick={() => { handleValidate(user.id) }} className={styles.accepte}><span><p style={{ color: "white" }}>V</p></span></button>
                                                                                <button type='button' onClick={() => { handleRefuse(user.id) }} className={styles.decline}><span><p style={{ color: "white" }}>X</p></span></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                        )


                                                    }) : <p>null</p>}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={styles.inscription}>
                            <div className={styles.table}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope='col' >Utilisateur</th>
                                            <th scope='col' >Raison Social</th>
                                            <th scope='col' >inscription Le</th>
                                            <th scope='col' >Message</th>
                                            <th scope='col' >Verdict</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users ? users.map(user => {
                                            const firstLetterName = user.name[0]
                                            const firstLetterPrenom = user.prenom[0]

                                            return (
                                                <tr key={user.id} >
                                                    <td>
                                                        <div className={styles.tdContainer}>
                                                            <div className={styles.pic}><Avatar>{firstLetterName}{firstLetterPrenom}</Avatar></div>
                                                            <div className={styles.infoTd}> <p>{user.name} {user.prenom}</p></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}><p>{user.raison_social}</p></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}><p>{new Date(user.create_time).toLocaleDateString()}</p></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}>
                                                                <p>{user.commentaire}</p>

                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}>
                                                                <div className={styles.btnsVerdict}>
                                                                    <button type='button' onClick={() => { handleValidate(user.id) }} className={styles.accepte}><span><p style={{ color: "white" }}>V</p></span></button>
                                                                    <button type='button' onClick={() => { handleRefuse(user.id) }} className={styles.decline}><span><p style={{ color: "white" }}>X</p></span></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )


                                        }) : <p>null</p>}

                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>


                </div>

                <div className={styles.usersTable}>

                    <div className={styles.userTableContainer}>
                        <Input type='search' value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} placeholder='Rechercher...' sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "white" }} />
                        <div className={styles.aggrandir}>
                            <h1>Utilisateurs</h1>
                            <div className={styles.btnsMacGreen}>
                                <div  >

                                </div>
                            </div>
                        </div>
                        <div className={styles.table}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope='col' >Utilisateur</th>
                                        <th scope='col' >Role</th>
                                        <th scope='col' >Creer Le</th>
                                        <th scope='col' >Status</th>
                                        <th scope='col' >Modification</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers ? visibleRows.map(user => {
                                            const firstLetterName = user.name[0]
                                            const firstLetterPrenom = user.prenom[0]
                                            return (
                                                <tr key={user.id}>
                                                    <td>
                                                        <div className={styles.tdContainer}>
                                                            <div className={styles.pic}><Avatar>{firstLetterName.toUpperCase()}{firstLetterPrenom.toUpperCase()}</Avatar></div>
                                                            <div className={styles.infoTd}> <p>{user.name.toUpperCase()} {user.prenom.toUpperCase()}</p></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}>{user.role === "user" ? <p>Utilisateur</p> : <p>{user.role}</p>}</div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}><p>{new Date(user.create_time).toLocaleDateString()}</p></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}>
                                                                <span className={(user.confirmed && user.activated) ? styles.actif : styles.NoActif}>
                                                                    <span aria-hidden="true" className={styles.status} >

                                                                    </span>
                                                                    <span className={(user.confirmed && user.activated) ? styles.actif : styles.NoActif}>{user.confirmed && user.activated ? "Activé" : "Non Activé"}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.tdContainer}>

                                                            <div className={styles.infoTd}>
                                                                <ModalModifyClient open={openModal && selectedUser === user} user={user} onCallback={handleCallback} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }) : null
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div className={styles.pagination}>

                    <div className={styles.paginationContainer}>
                        <div >
                            <button className={styles.btn} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                PRÉCÉDANT
                            </button>
                        </div>
                        <div style={{ margin: '0 10px' }}>Page {currentPage}</div>
                        <div >
                            {hasNextPage ? <button className={styles.btn} onClick={() => setCurrentPage((prev) => prev + 1)} disabled={!hasNextPage}>
                                SUIVANT
                            </button> : null}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard