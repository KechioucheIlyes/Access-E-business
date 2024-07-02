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
import styles from "./tablerowallfilleuls.module.css"
import { Input } from '@mui/joy';
import { useSession } from 'next-auth/react';
import yes from "./../../Assets/check-mark.png"
import no from "./../../Assets/close.png"
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../Loader/Loader';
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

            <tr style={{ backgroundColor: 'transparent', color: "#1a2528" }}>
                <td className={styles.td} style={{ backgroundColor: 'transparent', color: "#1a2528" }} >
                    <IconButton
                        className={styles.tdIcon}
                        aria-label="expand row"
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        sx={{
                            border: "2px solid black",
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon sx={{ color: "#1a2528" }} /> : <KeyboardArrowDownIcon sx={{ color: "#1a2528" }} />}
                    </IconButton>
                </td>
                <th className={styles.td} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }} scope="row"  >{row.name}</th>
                <td className={styles.td} style={{ backgroundColor: 'transparent', textAlign: "end", borderBottom: "2px solid #1a2528" }}>{row.calories}</td>
                <td className={styles.td} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528" }} >{row.fat}</td>
                <td className={styles.td} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528" }}>{row.carbs}</td>
                <td className={styles.td} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528" }}>{row.protein}</td>
            </tr>
            <tr style={{ backgroundColor: 'transparent', color: "#1a2528", }}>
                <td style={{ height: 0, padding: 0 }} colSpan={6}>
                    {open && (

                        <Sheet
                            variant="outlined"
                            sx={{ backgroundColor: "rgba(146, 151, 179, 0.13)", border: "none" }}
                        >
                            <Typography className={styles.typo} sx={{ color: "#000", textAlign: "center", backgroundColor: "rgba(146, 151, 179, 0.13)" }} level="body-lg" component="div">
                                Commissions filleul
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
                                    row.history.length === 0 || row.history.every(historyRow => historyRow.length === 0) ? (
                                        <div className={styles.typoText} style={{ textAlign: 'center' }}>Aucune commission n'a été éffectué pour le moment</div>
                                    ) : (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>Montant de la commission </th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>Votre gain</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>Courtage</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>T.U.R.P.E</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>CSPE</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>Logiciel</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>GTB</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>Date de signature</th>
                                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', borderBottom: "2px solid #1a2528", color: "#1a2528", textAlign: "center" }}>Statut Paiement</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {row.history.map((historyRow) => (
                                                    historyRow.map(commission => (
                                                        <tr key={commission.id}>
                                                            <td className={styles.headers} style={{ textAlign: "center" }}>{commission.montant_commission_filleul} €</td>
                                                            <td className={styles.headers} style={{ textAlign: "center" }}>{commission.montant_commission_parrain} €</td>
                                                            <td className={styles.headers} style={{ textAlign: "center" }}>{new Date(commission.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                                            <td className={styles.boolean} style={{ textAlign: "center" }}>{commission.courtage ? <Image src={yes} height={20} width={20} alt='yes' /> : <Image src={no} height={15} width={15} alt='no' />}</td>
                                                            <td className={styles.boolean} style={{ textAlign: "center" }}>{commission.TURP ? <Image src={yes} height={20} width={20} alt='yes' /> : <Image src={no} height={15} width={15} alt='no' />}</td>
                                                            <td className={styles.boolean} style={{ textAlign: "center" }}>{commission.CSPE ? <Image src={yes} height={20} width={20} alt='yes' /> : <Image src={no} height={15} width={15} alt='no' />}</td>
                                                            <td className={styles.boolean} style={{ textAlign: "center" }}>{commission.logiciel ? <Image src={yes} height={20} width={20} alt='yes' /> : <Image src={no} height={15} width={15} alt='no' />}</td>
                                                            <td className={styles.boolean} style={{ textAlign: "center" }}>{commission.GTB ? <Image src={yes} height={20} width={20} alt='yes' /> : <Image src={no} height={15} width={15} alt='no' />}</td>
                                                            <td className={styles.headers} style={{ textAlign: "center" }}>{commission.statut_paiement ? <div className={styles.paye}>Payé</div> : <div className={styles.attente}>En attente de paiement</div>}</td>
                                                        </tr>
                                                    ))
                                                ))}
                                            </tbody>
                                        </>
                                    )
                                }








                            </Table>
                        </Sheet>

                    )}
                </td>
            </tr>
        </React.Fragment >

    );
}





export default function TableCollapsibleRow() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [rows, setRows] = useState([

    ]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loader, setLoader] = useState(false)
    const getFilteredRows = () => {
        if (!searchQuery) return rows;
        return rows.filter((row) =>
            row.name.toLowerCase().includes(searchQuery.toLowerCase())

        );
    };

    const { data: session, status } = useSession()

    const id = session?.user?.id

    useEffect(() => {

        const fetchinClients = async () => {
            setLoader(true)
            try {
                const response = await fetch(`/api/crud/filleuls/get-all`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {

                    const data = await response.json();
                    setLoader(false)
                    if (data) {
                        const filleuls = data
                        const filleulArray = filleuls.filleuls.filleul
                        const newData2 = filleulArray.map(filleul => {
                            const commissions = filleul.Commission_filleul.map(commission => ({
                                id: commission.id,
                                montant_commission_filleul: commission.montant_commission_filleul,
                                montant_commission_parrain: commission.montant_commission_parrain,
                                date: commission.date,
                                statut_paiement: commission.statut_paiement,
                                courtage: commission.courtage,
                                TURP: commission.TURP,
                                CSPE: commission.CSPE,
                                logiciel: commission.logiciel,
                                GTB: commission.GBT,
                            }));

                            return createData(
                                filleul.raison_sociale,
                                filleul.nom,
                                filleul.prenom,
                                filleul.email,
                                new Date(filleul.date_expiration_avantage).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                                "1.99",
                                commissions
                            );
                        });
                        setRows((prevRows) => [...prevRows, ...newData2]);

                    }
                } else {
                    setLoader(false)
                    alert('Erreur veuillez reessayer plus tard');
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
        <div  >
            {loader ? <div className={styles.bodyFilleul}><Loader /></div> : (
                <>
                    <Input startDecorator={<SearchIcon />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Recherche..." type="search" sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "#1a2528", border: "2px solid #1a2528" }} />
                    <Sheet sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "#1a2528" }} >
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
                                color: "#1a2528",
                                backgroundColor: "transparent"
                            }}
                        >
                            <thead style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }}>
                                <tr style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }}>
                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528", width: 40 }} aria-label="empty" />
                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528", width: '20%' }}>Raison Sociale</th>
                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }}>Nom</th>
                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }}>Prenom</th>
                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }}>Email</th>
                                    <th className={styles.headers} style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }}>Actif jusqu'a</th>
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: 'transparent', color: "#1a2528", borderBottom: "2px solid #1a2528" }} >
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
                </>
            )}

        </div>
    );
}