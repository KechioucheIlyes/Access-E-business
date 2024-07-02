import React from 'react'
import styles from "./filleuls.module.css"
import TableRowAllFilleuls from "./../TableRowAllFilleuls/TableRowAllFilleuls"

const Filleuls = () => {
    return (
        <div className={styles.etudes}>
            <TableRowAllFilleuls />
        </div>
    )
}

export default Filleuls