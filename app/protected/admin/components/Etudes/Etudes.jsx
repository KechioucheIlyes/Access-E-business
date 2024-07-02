import React from 'react'
import styles from "./etudes.module.css"
import DataCommission from "./../DataCommissions/DataCommissions"
import TableRowAllEtudes from "./../TableRowAllEtudes/TableRowAllEtudes"
const Etudes = () => {

    return (
        <div className={styles.etudes}>
            <TableRowAllEtudes />
        </div>
    )
}

export default Etudes