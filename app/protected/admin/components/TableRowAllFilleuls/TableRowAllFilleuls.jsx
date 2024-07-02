"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, ButtonBase, Icon } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./tablerowallfilleuls.module.css"
import { Input } from '@mui/joy';
import pdf from "./../../../../Assets/pdf.svg"
import pdfGrey from "./../../../../Assets/pdf-grey.svg"
import ModalSelectedClient from "./../../../../Component/ModalSelectedClient/ModalSelectedClient"
function createData(name, calories, fat, carbs, protein, price, history) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [history],
    };
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(props.initialOpen || false);

    return (

        <React.Fragment >

            <tr style={{ backgroundColor: 'transparent', color: "white" }}>
                <td style={{ backgroundColor: 'transparent', color: "white" }} >
                    <IconButton
                        aria-label="expand row"
                        variant="outlined"
                        color="neutral"
                        size="lg"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon sx={{ color: "grey" }} /> : <KeyboardArrowDownIcon sx={{ color: "grey" }} />}
                    </IconButton>
                </td>
                <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }} scope="row"  >{row.name}</th>
                <td style={{ backgroundColor: 'transparent', textAlign: "end", borderBottom: "2px solid white" }}>{row.calories}</td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }} >{row.fat}</td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }}>{row.carbs}</td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }}>{row.protein}</td>
            </tr>
            <tr style={{ backgroundColor: 'transparent', color: "white", }}>
                <td style={{ height: 0, padding: 0, backgroundColor: 'transparent' }} colSpan={6}>
                    {open && (
                        <div>
                            <Sheet
                                variant="outlined"
                                sx={{ p: 1, pl: 6, backgroundColor: "rgba(146, 151, 179, 0.13)", border: "none" }}
                            >
                                <Typography sx={{ color: "white", textAlign: "center", backgroundColor: "#2ecc71" }} level="body-lg" component="div">
                                    Details Du Client
                                </Typography>
                                <Table
                                    size="sm"
                                    aria-label="purchases"
                                    sx={{
                                        '& > thead > tr > th:nth-of-type(n + 3), & > tbody > tr > td:nth-of-type(n + 3)':
                                            { textAlign: 'right' },
                                        '--TableCell-paddingX': '0.5rem',
                                    }}
                                >

                                    {
                                        row.history.map((historyRow) => (
                                            <thead key={historyRow.id}>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Fonction</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Secteur D'activité</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Date expiration parrainage</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>pourcentage parrainage</th>

                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>{historyRow.fonction}</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }} > <p >{historyRow.secteur_activite}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{new Date(historyRow.date_expiration_avantage).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} </p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.pourcentage_promo} %</p> </th>

                                                </tr>

                                            </thead>

                                        ))
                                    }
                                </Table>
                            </Sheet>
                        </div>
                    )}
                </td>
            </tr>
        </React.Fragment>

    );
}





export default function TableCollapsibleRow() {
    const [currentPage, setCurrentPage] = useState(1);
    let [openModal, setOpenModal] = useState(false);
    const itemsPerPage = 10;
    const [rows, setRows] = useState([

    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const getFilteredRows = () => {
        if (!searchQuery) return rows;
        return rows.filter((row) =>
            row.name.toLowerCase().includes(searchQuery.toLowerCase())

        );
    };



    useEffect(() => {

        const fetchinClients = async () => {
            try {
                const response = await fetch('/api/crud/admin/get-all/filleuls');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const filleuls = data
                        const filleulstArray = filleuls.allFilleuls
                        const newData2 = filleulstArray.map(filleul => {

                            const historyData2 = {
                                id: filleul.id,
                                names: `${filleul.nom} ${filleul.prenom}`,
                                fonction: filleul.fonction,
                                secteur_activite: filleul.secteur_activite,
                                date_expiration_avantage: filleul.date_expiration_avantage,
                                pourcentage_promo: filleul.pourcentage_promo,

                            }


                            return createData(
                                `${filleul.raison_sociale}`,
                                `${filleul.nom} ${filleul.prenom}`,
                                `${filleul.email}`,
                                `${filleul.mobile}`,
                                <ModalSelectedClient open={openModal && selectedUser === filleul.User.name} user={filleul.User} />,
                                "1.99",
                                historyData2
                            )
                        })
                        setRows((prevRows) => [...prevRows, ...newData2]);

                    }
                } else {
                    console.log('erreur veuillez reessayer plus tard');
                }
            } catch (error) {
                console.log(error);
            }

        }
        fetchinClients()

    }, [])


    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;
    const visibleRows = getFilteredRows().slice(startIndex, endIndex);
    const hasNextPage = endIndex < rows.length;

    return (
        <div>
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Recherche..." type="search" sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "white" }} />
            <Sheet sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "white" }} >
                <Table
                    aria-label="collapsible table"

                    sx={{
                        '& > thead > tr > th:nth-of-type(n + 3), & > tbody > tr > td:nth-of-type(n + 3)':
                            { textAlign: 'right' },
                        '& > tbody > tr:nth-of-type(odd) > td, & > tbody > tr:nth-of-type(odd) > th[scope="row"]':
                        {
                            borderBottomBottom: 0,
                        },
                        width: "100%",
                        color: "white",
                        backgroundColor: "transparent"
                    }}
                >
                    <thead style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>
                        <tr style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white", width: 40 }} aria-label="empty" />
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Raison Sociale</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white", width: '20%' }}>Nom Prenom</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Email</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Mobile</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Affilié à</th>

                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }} >
                        {visibleRows.map((row, index) => (
                            <Row key={index} row={row} initialOpen={index === 0} />
                        ))}
                    </tbody>
                </Table>
                <div className={styles.pagination}>

                    <div className={styles.paginationContainer} style={{ marginTop: '10px', textAlign: 'center', backgroundColor: "transparent" }}>
                        <div className={styles.btn}>
                            {currentPage > 1 ? <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                                PRÉCÉDANT
                            </button> : null}
                        </div>
                        <div style={{ margin: '0 10px' }}>Page {currentPage}</div>
                        <div className={styles.btn}>
                            {hasNextPage ? <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={!hasNextPage}>
                                SUIVANT
                            </button> : null}
                        </div>
                    </div>
                </div>
            </Sheet>
        </div>
    );
}