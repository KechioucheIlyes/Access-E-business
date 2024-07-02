import React from 'react'
import NavBar from '../../../Component/NavBar/NavBar'
import TableRowAllFilleuls from "../../../Component/TableRowAllFilleuls/TableRowAllFilleuls"
import styles from "./filleuls.module.css"

const page = () => {
    return (
        <>
            <NavBar accueil={false} accueilClient={true} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />
            <div className={styles.test} >
                <div className={styles.tableContainer}>
                    <TableRowAllFilleuls />

                </div>
            </div>
        </>
    )
}

export default page