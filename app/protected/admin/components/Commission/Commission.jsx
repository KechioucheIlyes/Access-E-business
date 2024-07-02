import React, { useEffect, useState } from 'react'
import styles from "./commission.module.css"
import Table from '@mui/joy/Table';
import DataCommission from "./../DataCommissions/DataCommissions"
const Commission = () => {


    return (
        <div className={styles.commission}>
            <DataCommission />
        </div>
    )
}

export default Commission