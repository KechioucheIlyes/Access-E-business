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
import styles from "./tablerowallcomi.module.css"
import { Input } from '@mui/joy';
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
                                    Prestation
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
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Prestation</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Statut</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Date de Signature</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Commission</th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Courtage</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }} > <p className={historyRow.date ? styles.signed : styles.noSigned}>{historyRow.date ? "Signé" : "Non signé"}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.Date_signature_courtage ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_courtage ? `/` : `${new Date(historyRow.Date_signature_courtage).toLocaleDateString("fr-FR")}`}</p> </th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.commission_courtage ? styles.noSigned : styles.signed}>{!historyRow.commission_courtage ? `0 €` : `${historyRow.commission_courtage} €`}</p> </th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>T.U.R.P.E</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p className={historyRow.customerId ? styles.signed : styles.noSigned}>{historyRow.customerId ? "Signé" : "Non signé"}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p className={!historyRow.Date_signature_TURP ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_TURP ? `/` : `${new Date(historyRow.Date_signature_TURP).toLocaleDateString("fr-FR")}`}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p className={!historyRow.montant_commission_TURP ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_TURP ? `0 €` : `${historyRow.montant_commission_TURP} €`}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>C.S.P.E</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p className={historyRow.amount ? styles.signed : styles.noSigned}>{historyRow.amount ? "Signé" : "Non signé"}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.Date_signature_CSPE ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_CSPE ? `/` : `${new Date(historyRow.Date_signature_CSPE).toLocaleDateString("fr-FR")}`}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.montant_commission_CSPE ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_CSPE ? `0 €` : `${historyRow.montant_commission_CSPE} €`}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Logiciel</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p className={historyRow.statut ? styles.signed : styles.noSigned}>{historyRow.statut ? "Signé" : "Non signé"}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.Date_signature_logiciel ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_logiciel ? `/` : `${new Date(historyRow.Date_signature_logiciel).toLocaleDateString("fr-FR")}`}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.montant_commission_logiciel ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_logiciel ? `0 €` : `${historyRow.montant_commission_logiciel} €`}</p></th>
                                                </tr>
                                                <tr>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>GTB</th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p className={historyRow.logiciel ? styles.signed : styles.noSigned}>{historyRow.logiciel ? "Signé" : "Non signé"}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.Date_signature_GBT ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_GBT ? `/` : `${new Date(historyRow.Date_signature_GBT).toLocaleDateString("fr-FR")}`}</p></th>
                                                    <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p className={!historyRow.montant_commission_GBT ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_GBT ? `0 €` : `${historyRow.montant_commission_GBT} €`}</p> </th>
                                                </tr>

                                            </thead>

                                        ))
                                    }





                                </Table>
                            </Sheet>
                            {row.history.map((historyRow) => (
                                historyRow.id_contrat ? <Sheet key={historyRow.id_contrat}
                                    variant="outlined"
                                    sx={{ p: 1, pl: 6, backgroundColor: "rgba(146, 151, 179, 0.13)", border: "none" }}
                                >
                                    <Typography sx={{ color: "white", textAlign: "center", backgroundColor: "#2ecc71" }} level="body-lg" component="div">
                                        Details de la commission
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
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Email</th>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.user_email}</p></th>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.dirigeant_email}</p></th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Telephone</th>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p>{historyRow.user_numero}</p></th>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p >{historyRow.dirigeant_numero}</p></th>
                                                    </tr>
                                                    <tr>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}>Fixe</th>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}> <p >{historyRow.user_fixe}</p></th>
                                                        <th style={{ backgroundColor: 'transparent', borderBottom: "2px solid white", color: "white", textAlign: "center" }}><p>{historyRow.dirigeant_fixe}</p> </th>
                                                    </tr>

                                                </thead>

                                            ))
                                        }





                                    </Table>
                                </Sheet> : null
                            ))}
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
            row.calories.toLowerCase().includes(searchQuery.toLowerCase())

        );
    };



    useEffect(() => {

        const fetchinCommissions = async () => {
            try {
                const response = await fetch('/api/crud/admin/get-all/commissions');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const commission = data
                        const newData2 = commission.commissions.map(com => {
                            const historyData2 = {
                                id: com.id,
                                ref: com.reference,
                                date: com.courtage,
                                customerId: com.TURP,
                                amount: com.CSPE,
                                statut: com.logiciel,
                                logiciel: com.GBT,
                                GTB: com.courtage,
                                Date_signature_courtage: com.Date_signature_courtage,
                                Date_signature_TURP: com.Date_signature_TURP,
                                Date_signature_CSPE: com.Date_signature_CSPE,
                                Date_signature_logiciel: com.Date_signature_logiciel,
                                Date_signature_GBT: com.Date_signature_GBT,
                                commission_courtage: com.montant_commission_courtage,
                                montant_commission_TURP: com.montant_commission_TURP,
                                montant_commission_CSPE: com.montant_commission_CSPE,
                                montant_commission_logiciel: com.montant_commission_logiciel,
                                montant_commission_GBT: com.montant_commission_GBT,
                                montant_commission_total: com.montant_commission_total,
                                id_contrat: com.Etudes[0] ? com.Etudes[0].contrats[0].id : null,
                                user_nom: com.User.name,
                                user_prenom: com.User.prenom,
                                user_email: com.User.email,
                                user_numero: com.User.numero,
                                user_fixe: com.User.fix,
                                dirigeant_nom: com.Etudes[0] ? com.Etudes[0].Clients.Dirigeants[0].nom : null,
                                dirigeant_prenom: com.Etudes[0] ? com.Etudes[0].Clients.Dirigeants[0].prenom : null,
                                dirigeant_email: com.Etudes[0] ? com.Etudes[0].Clients.Dirigeants[0].email : null,
                                dirigeant_numero: com.Etudes[0] ? com.Etudes[0].Clients.Dirigeants[0].mobile : null,
                                dirigeant_fixe: com.Etudes[0] ? com.Etudes[0].Clients.Dirigeants[0].fixe : null,


                            }

                            return createData(
                                `${com.reference}`,
                                `${com.Etudes[0] ? com.Etudes[0].Clients.nom_entreprise : "/"}`,
                                `${com.Etudes[0] ? `${com.Etudes[0].Clients.adresse_postal}  ${com.Etudes[0].Clients.code_postal}` : "/"}`,
                                `${new Date(com.Date_signature).toLocaleDateString("fr-FR")}`,
                                `${com.montant_commission_total} €`,
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
        fetchinCommissions()

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
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white", width: '20%' }}>Référence</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Entreprise</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Adresse</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>date de signature</th>
                            <th style={{ backgroundColor: 'transparent', color: "white", borderBottom: "2px solid white" }}>Commission Total</th>

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