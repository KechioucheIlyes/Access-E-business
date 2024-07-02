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
import styles from "./tablerowallcontrats.module.css"
import { Input } from '@mui/joy';
import pdf from "./../../../../Assets/pdf.svg"
import pdfGrey from "./../../../../Assets/pdf-grey.svg"
import Link from 'next/link';
function createData(name, calories, fat, carbs, protein, price, statut, history) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        statut,
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
                <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }} scope="row"  >{row.name ? row.name : null}</th>
                <td style={{ backgroundColor: 'transparent', textAlign: "end", borderBottom: "2px solid white" }}>{row.calories}</td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }} >{row.fat}</td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }}>{row.carbs}</td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", textAlign: "right" }}  ><span className={row.protein === "completed" ? styles.completed : row.protein === "pending" ? styles.pending : styles.null}>
                    {row.protein}
                </span> </td>
                <td style={{ backgroundColor: 'transparent', borderBottom: "2px solid white" }}>{row.price}</td>
            </tr>
            <tr style={{ backgroundColor: 'transparent', color: "white", }}>
                <td style={{ height: 0, padding: 0, backgroundColor: 'transparent' }} colSpan={7}>
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
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Client</th>

                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Nom entreprise</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }} > <p >{historyRow.user_nom}</p> </th>


                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Raison sociale</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_prenom}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Secteur d'activite</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_fonction}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Siret</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.user_email}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Adresse postal</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.user_numero}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Ville & Code postal</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_fixe}</p></th>
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
    const [noContrat, setNoContrat] = useState(false)
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
                const response = await fetch('/api/crud/admin/get-all/contrats');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const contrats = data;
                        const contratArray = contrats.allContrats;
                        const newData2 = await Promise.all(contratArray.map(async (contrat) => {
                            const historyData2 = {
                                id: contrat.id,
                                reference: contrat.reference_contrat,
                                user_nom: contrat.etude.Clients.nom_entreprise,
                                user_prenom: contrat.etude.Clients.raison_sociale,
                                user_fonction: contrat.etude.Clients.secteur_activite,
                                user_email: contrat.etude.Clients.siret,
                                user_numero: contrat.etude.Clients.adresse_postal,
                                user_fixe: `${contrat.etude.Clients.ville} - ${contrat.etude.Clients.code_postal} `,

                            };

                            let pdfContent = null;
                            if (contrat.pdfID) {
                                try {
                                    const pdfResponse = await fetch(`/api/esign?id=${contrat.pdfID}`);
                                    if (pdfResponse.ok) {
                                        pdfContent = await pdfResponse.json();

                                    } else {
                                        console.log('Erreur lors du chargement du PDF');
                                    }
                                } catch (error) {
                                    console.error('Erreur lors de la récupération du PDF :', error);
                                }
                            }

                            return createData(
                                `${contrat.reference_contrat}`,
                                `${contrat.nom_site}`,
                                `${contrat.etude.nom_etude}`,
                                `${contrat.fournisseur}`,
                                `${pdfContent && pdfContent.status ? pdfContent.status : null}`,
                                pdfContent && pdfContent.sub && pdfContent.sub.length > 0 ? (
                                    <Link href={pdfContent.sub[0].url} target="_blank" rel="noopener noreferrer">
                                        <Image className={styles.pdf} src={pdf} alt='pdf' height={30} width={30} />
                                    </Link>
                                ) : (
                                    <Image className={styles.nopdf} src={pdfGrey} alt='pdf' height={30} width={30} />
                                ),
                                "1.99",
                                historyData2
                            );
                        }));
                        setRows((prevRows) => [...prevRows, ...newData2]);
                    }
                } else {
                    console.log('Erreur veuillez réessayer plus tard');
                }
            }
            catch (error) {
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
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>REFERENCE</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white", width: '20%' }}>CONTRAT</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>ÉTUDE</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>FOURNISSEUR</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>STATUS</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>PDF</th>
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