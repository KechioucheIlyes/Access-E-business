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
import pdfIcon from "./../../Assets/pdf.svg"
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./rowCommission.module.css"
import { Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../Loader/Loader';
import ReactPaginate from 'react-paginate';
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
        <React.Fragment  >
            <tr style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid red" }}>
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} >
                    <IconButton
                        aria-label="expand row"
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpen(!open)}
                        sx={{
                            border: "2px solid black",
                        }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
                <th className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} scope="row"  >{row.name}</th>
                <td className={styles.td} style={{ textAlign: "end", borderBottom: "2px solid grey" }}>{row.calories}</td>
                <td className={styles.td} style={{ borderBottom: "2px solid grey" }} >{row.fat}</td>
                <td className={styles.td} style={{ borderBottom: "2px solid grey" }}>{row.carbs}</td>
                <td className={styles.td} style={{ borderBottom: "2px solid grey" }}>{row.protein}</td>
            </tr>
            <tr style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>
                <td style={{ height: 0, padding: 0 }} colSpan={6}>
                    {open && (
                        <Sheet
                            variant="outlined"
                            sx={{ boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', backgroundColor: "#f0f2f5", borderBottom: "2px solid grey" }}
                        >
                            <Typography className={styles.typo} level="body-lg" component="div">
                                Details
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
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>Prestation</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>Statut</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>Date de Signature</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>Commission</th>
                                            </tr>
                                            <tr>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>Courtage</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }} > <p className={historyRow.date ? styles.signed : styles.noSigned}>{historyRow.date ? "Signé" : "Non signé"}</p> </th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.Date_signature_courtage ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_courtage ? `/` : `${new Date(historyRow.Date_signature_courtage).toLocaleDateString("fr-FR")}`}</p> </th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.commission_courtage ? styles.noSigned : styles.signed}>{!historyRow.commission_courtage ? `0 €` : `${historyRow.commission_courtage} €`}</p> </th>
                                            </tr>
                                            <tr>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>T.U.R.P.E</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}> <p className={historyRow.customerId ? styles.signed : styles.noSigned}>{historyRow.customerId ? "Signé" : "Non signé"}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}> <p className={!historyRow.Date_signature_TURP ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_TURP ? `/` : `${new Date(historyRow.Date_signature_TURP).toLocaleDateString("fr-FR")}`}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}> <p className={!historyRow.montant_commission_TURP ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_TURP ? `0 €` : `${historyRow.montant_commission_TURP} €`}</p></th>
                                            </tr>
                                            <tr>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>C.S.P.E</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}> <p className={historyRow.amount ? styles.signed : styles.noSigned}>{historyRow.amount ? "Signé" : "Non signé"}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.Date_signature_CSPE ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_CSPE ? `/` : `${new Date(historyRow.Date_signature_CSPE).toLocaleDateString("fr-FR")}`}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.montant_commission_CSPE ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_CSPE ? `0 €` : `${historyRow.montant_commission_CSPE} €`}</p></th>
                                            </tr>
                                            <tr>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>Logiciel</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}> <p className={historyRow.statut ? styles.signed : styles.noSigned}>{historyRow.statut ? "Signé" : "Non signé"}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.Date_signature_logiciel ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_logiciel ? `/` : `${new Date(historyRow.Date_signature_logiciel).toLocaleDateString("fr-FR")}`}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.montant_commission_logiciel ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_logiciel ? `0 €` : `${historyRow.montant_commission_logiciel} €`}</p></th>
                                            </tr>
                                            <tr>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}>GTB</th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}> <p className={historyRow.logiciel ? styles.signed : styles.noSigned}>{historyRow.logiciel ? "Signé" : "Non signé"}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.Date_signature_GBT ? styles.noSigned : styles.signed}>{!historyRow.Date_signature_GBT ? `/` : `${new Date(historyRow.Date_signature_GBT).toLocaleDateString("fr-FR")}`}</p></th>
                                                <th className={styles.headers} style={{ borderBottom: "2px solid grey", textAlign: "center" }}><p className={!historyRow.montant_commission_GBT ? styles.noSigned : styles.signed}>{!historyRow.montant_commission_GBT ? `0 €` : `${historyRow.montant_commission_GBT} €`}</p> </th>
                                            </tr>

                                        </thead>

                                    ))
                                }





                            </Table>
                        </Sheet>
                    )}
                </td>
            </tr>
        </React.Fragment>
    );
}





export default function TableCollapsibleRow() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [rows, setRows] = useState([

    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const getFilteredRows = () => {
        if (!searchQuery) return rows;
        return rows.filter((row) =>
            row.name.toLowerCase().includes(searchQuery.toLowerCase())

        );
    };

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const res = await fetch("/api/crud/commissions/get-all")
                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json()
                    setLoading(false)
                    const commission = data.user.Commissions.map(result => {
                        return result
                    })



                    const newData = data.user.Clients.map((el, index) => {

                        if (el.Etudes[0].Commissions) {

                            const historyData = {
                                id: el.Etudes[0].Commissions.id,
                                date: el.Etudes[0].Commissions.courtage,
                                customerId: el.Etudes[0].Commissions.TURP,
                                amount: el.Etudes[0].Commissions.CSPE,
                                statut: el.Etudes[0].Commissions.logiciel,
                                logiciel: el.Etudes[0].Commissions.GBT,
                                GTB: el.Etudes[0].Commissions.courtage,
                                Date_signature_courtage: el.Etudes[0].Commissions.Date_signature_courtage,
                                Date_signature_TURP: el.Etudes[0].Commissions.Date_signature_TURP,
                                Date_signature_CSPE: el.Etudes[0].Commissions.Date_signature_CSPE,
                                Date_signature_logiciel: el.Etudes[0].Commissions.Date_signature_logiciel,
                                Date_signature_GBT: el.Etudes[0].Commissions.Date_signature_GBT,
                                commission_courtage: el.Etudes[0].Commissions.montant_commission_courtage,
                                montant_commission_TURP: el.Etudes[0].Commissions.montant_commission_TURP,
                                montant_commission_CSPE: el.Etudes[0].Commissions.montant_commission_CSPE,
                                montant_commission_logiciel: el.Etudes[0].Commissions.montant_commission_logiciel,
                                montant_commission_GBT: el.Etudes[0].Commissions.montant_commission_GBT,
                                montant_commission_total: el.Etudes[0].Commissions.montant_commission_total
                            };

                            return createData(
                                `${el.nom_entreprise ? el.nom_entreprise : "/"}`,
                                `${el.Dirigeants[0].nom.toUpperCase()}`,
                                `${el.Dirigeants[0].prenom.toUpperCase()}`,
                                `${new Date(el.Etudes[0].Commissions.Date_signature).toLocaleDateString("fr-FR")}`,
                                `${el.Etudes[0].Commissions.montant_commission_total} €`,
                                "1.99",
                                historyData
                            )
                        } else {
                            return
                        }
                    }).filter(item => item !== undefined);
                    setRows((prevRows) => [...prevRows, ...newData]);
                }
            } catch (error) {
                setLoading(false)
                console.error('Error fetching data:', error);
            }
        }
        fetchingData()
    }, [])

    const handleClick = (selectedPage) => {
        setCurrentPage(selectedPage)
    };


    const startIndex = (currentPage) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleRows = getFilteredRows().slice(startIndex, endIndex);
    const hasNextPage = endIndex < rows.length;

    return (
        <div >

            {loading ? <div className={styles.loader}>
                <Loader />
            </div> : (<>
                <Input startDecorator={<SearchIcon />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Recherche par raison social.." type="search" sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "#1a2528", border: "2px solid #1a2528" }} />
                <Sheet sx={{ minHeight: "70vh", backgroundColor: "transparent" }}>

                    <Table

                        aria-label="collapsible table"

                        sx={{
                            '& > thead > tr > th:nth-of-type(n + 3), & > tbody > tr > td:nth-of-type(n + 3)':
                                { textAlign: 'right' },
                            '& > tbody > tr:nth-of-type(odd) > td, & > tbody > tr:nth-of-type(odd) > th[scope="row"]':
                            {
                                borderBottomBottom: 0,
                            }

                        }}
                    >
                        <thead style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>
                            <tr style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>
                                <th className={styles.headers} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey", width: 40 }} aria-label="empty" />
                                <th className={styles.headers} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey", width: '20%' }}>Raison social</th>
                                <th className={styles.headers} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>Nom</th>
                                <th className={styles.headers} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>Prénom</th>
                                <th className={styles.headers} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>date de signature</th>
                                <th className={styles.headers} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>Commission Total</th>

                            </tr>
                        </thead>
                        <tbody style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} >
                            {visibleRows.map((row, index) => (
                                <Row key={index} row={row} initialOpen={index === 0} />
                            ))}
                        </tbody>
                    </Table>

                    <div>
                        <ReactPaginate
                            className={styles.oki}
                            previousLabel={"← Precedent"}
                            nextLabel={"Suivant →"}
                            pageCount={Math.ceil(rows.length / itemsPerPage)}
                            onPageChange={(selected) => {
                                handleClick(selected.selected);
                            }}
                            containerClassName={styles.pagination}
                            previousLinkClassName={styles.pagination__link}
                            nextLinkClassName={styles.pagination__link}
                            disabledClassName={styles.pagination__linkDisabled}
                            activeClassName={styles.pagination__linkActive}
                            pageLinkClassName={styles.pagination__linkPage}
                        />
                    </div>
                </Sheet>
            </>)}
        </div>
    );
}