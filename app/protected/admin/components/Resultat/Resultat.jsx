import React from 'react'
import styles from "./resultat.module.css"
import TableRowAllClientsResultat from './../TableRowAllClientsResultat/TableRowAllClientsResultat'
const Resultat = () => {
    return (
        <div className={styles.resultats}>
            <TableRowAllClientsResultat />
        </div>
    )
}

export default Resultat