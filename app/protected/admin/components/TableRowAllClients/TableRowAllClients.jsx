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
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Utilisateur</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Dirigeant</th>

                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Nom</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }} > <p >{historyRow.user_nom}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.dirigeant_nom}</p> </th>

                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Prenom</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_prenom}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.dirigeant_prenom}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Fonction</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_fonction}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.dirigeant_fonction}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Email</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.user_email}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.dirigeant_email}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>N°Tel</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.user_numero}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p >{historyRow.dirigeant_numero}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>N°Fixe</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_fixe}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.dirigeant_fixe}</p> </th>
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
                const response = await fetch('/api/crud/admin/get-all/clients/all');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const clients = data
                        const clientArray = clients.clients
                        const newData2 = clientArray.map(client => {

                            const historyData2 = {
                                id: client.id,
                                user_nom: client.User.name,
                                user_prenom: client.User.prenom,
                                user_email: client.User.email,
                                user_numero: client.User.numero,
                                user_fixe: client.User.fix,
                                user_fonction: client.User.fonction,
                                dirigeant_nom: client.Dirigeants[0] ? client.Dirigeants[0].nom : '/',
                                dirigeant_prenom: client.Dirigeants[0] ? client.Dirigeants[0].prenom : '/',
                                dirigeant_email: client.Dirigeants[0] ? client.Dirigeants[0].email : '/',
                                dirigeant_numero: client.Dirigeants[0] ? client.Dirigeants[0].mobile : '/',
                                dirigeant_fixe: client.Dirigeants[0] ? client.Dirigeants[0].fixe : '/',
                                dirigeant_fonction: client.Dirigeants[0] ? client.Dirigeants[0].fonction : '/',

                            }


                            return createData(
                                `${client.nom_entreprise ? client.nom_entreprise : "-"}`,
                                `${client.siret ? client.siret : "-"}`,
                                `${client.adresse_postal ? client.adresse_postal : "-"}`,
                                `${client.ville ? client.ville : "-"}`,
                                `${client.secteur_activite ? client.secteur_activite : "-"}`,
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
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white", width: '20%' }}>Nom Client</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Siren/Siret</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Adresse postale</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Ville</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Secteur d'activité</th>

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