import React from 'react'
import styles from "./contrats.module.css"
import TableRowAllContrat from './../TableRowAllContrats/TableRowAllContrats'
const Contrats = () => {
    return (
        <div className={styles.contrats}>
            <TableRowAllContrat />
        </div>
    )
}

export default Contrats