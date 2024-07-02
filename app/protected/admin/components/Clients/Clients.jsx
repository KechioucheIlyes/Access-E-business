import React from 'react'
import styles from "./client.module.css"
import TableRowAllClients from "./../TableRowAllClients/TableRowAllClients"
const Clients = () => {
    return (
        <div className={styles.etudes}>
            <TableRowAllClients />
        </div>
    )
}

export default Clients