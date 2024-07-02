import React from 'react'
import NavBar from '../../../Component/NavBar/NavBar'
import TableRowCommision from "./../../../Component/TableRowCommission/TableRowCommission"
import styles from "./commission.module.css"
const Commission = () => {

    return (
        <>
            <NavBar accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
            <div className={styles.tableContainer}>
                <h1>Vous trouverez ici toutes les commissions de vos clauses gagnées </h1>
                <TableRowCommision />
            </div>
        </>
    )
}

export default Commission