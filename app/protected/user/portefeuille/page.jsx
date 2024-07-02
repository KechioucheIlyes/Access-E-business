'use client'
import React from 'react'
import NavBar from '../../../Component/NavBar/NavBar'
import Table from '@mui/joy/Table';
import styles from "./portefeuille.module.css"
import TableRow from "./../../../Component/TableRow/TableRow"

const Portefeuille = () => {

    return (
        <>

            <NavBar accueilClient={true} accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
            <div className={styles.test} >

                <div className={styles.tableContainer}>
                    <h1>Vous trouverez ici toutes les informations relatives à une étude que vous avez menée.</h1>
                    <TableRow />
                </div>

            </div>
        </>
    )
}

export default Portefeuille