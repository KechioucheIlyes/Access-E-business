import React from 'react'
import styles from "./dirigeant.module.css"
import TableRowAllDirigeant from "./../TableRowAllDirigeants/TableRowAllDirigeants"
const Dirigeants = () => {
    return (
        <div className={styles.etudes}>
            <TableRowAllDirigeant />
        </div>
    )
}

export default Dirigeants