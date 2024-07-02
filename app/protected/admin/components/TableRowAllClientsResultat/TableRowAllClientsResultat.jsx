"use client"

import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Icon } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./tablerowalletudes.module.css"
import { Input } from '@mui/joy';
import pdf from "./../../../../Assets/pdf.svg"
import pdfGrey from "./../../../../Assets/pdf-grey.svg"
import Validation from "./../../../../Assets/check.png"
import No from "./../../../../Assets/close.png"
function createData(name, calories, fat, carbs, protein, price, global, history) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        global,
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
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }}><Image src={row.price === 'true' ? Validation : No} alt="validation" height={20} width={20} /> </td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }}>{row.global}</td>
            </tr>
            <tr style={{ backgroundColor: 'transparent', color: "white" }}>
                <td style={{ height: 0, padding: 0, backgroundColor: 'transparent' }} colSpan={6}>
                    {open && (
                        <div>
                            <Sheet
                                variant="outlined"
                                sx={{ p: 1, pl: 6, backgroundColor: "rgba(146, 151, 179, 0.13)", border: "none", width: '126%' }}
                            >
                                <Typography sx={{ color: "white", textAlign: "center", backgroundColor: "#2ecc71" }} level="body-lg" component="div">
                                    Details Du Resultat
                                </Typography>
                                <Table
                                    size="sm"
                                    aria-label="purchases"
                                    sx={{
                                        '& > thead > tr > th:nth-of-type(n + 3), & > tbody > tr > td:nth-of-type(n + 3)':
                                            { textAlign: 'center' },
                                        '--TableCell-paddingX': '0.5rem',
                                        textAlign: 'center',

                                    }}
                                >

                                    {
                                        row.history.map((historyRow) => (
                                            <thead key={historyRow.id}>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>N° ctr Gaz</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>N° ctr Elec</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>ARENH</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Puissance Souscrite (36KVA)</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>ec_reduc_consom</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Adheresion Tertiaire</th>

                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }} > <p >{historyRow.nb_ctr_gaz}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }} > <p >{historyRow.nb_ctr_elec}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <Image src={historyRow.nb_ctr_Arenh ? Validation : No} alt="validation" height={20} width={20} /></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.tx_puissance_souscrite}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <Image src={historyRow.ec_reduc_consom ? Validation : No} alt="validation" height={20} width={20} /></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <Image src={historyRow.rg_adheresion_tertiaire_1 ? Validation : No} alt="validation" height={20} width={20} /> </th>


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
                const response = await fetch('/api/crud/admin/get-all/resultats');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const resultat = data
                        const resultatArray = resultat.resultats
                        const newData2 = resultatArray.map(resultat => {

                            const historyData2 = {
                                nb_ctr_gaz: resultat.ctr_nb_compteur_gaz,
                                nb_ctr_elec: resultat.ctr_nb_compteur_elec,
                                nb_ctr_Arenh: resultat.ctr_ARENH,
                                tx_puissance_souscrite: resultat.tx_puissance_souscrite,
                                ec_reduc_consom: resultat.ec_reduc_consom,
                                rg_adheresion_tertiaire_1: resultat.rg_adheresion_tertiaire_1,
                            }

                            return createData(
                                `${resultat.etude.nom_etude}`,
                                `${resultat.noteCategorieAnalyse}`,
                                `${resultat.noteCategorieTaxes}`,
                                `${resultat.noteCategorieEconomiesEnergie}`,
                                `${resultat.noteCategorieReglementaire}`,
                                `${resultat.CSPE}`,
                                `${resultat.noteGlobal}`,
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
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white", width: '20%' }}>Nom Étude</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Note  Analyse</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Note Taxes</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Note Economies Energie</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Note Reglementaire</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>CSPE</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Note Globale</th>
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