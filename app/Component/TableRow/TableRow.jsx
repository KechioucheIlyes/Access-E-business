"use client"

import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from "./tablerow.module.css"
import check from "./../../Assets/check-mark.png"
import close from "./../../Assets/close.png"
import ReactPaginate from 'react-paginate';
import { Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../Loader/Loader';
function createData(name, lastName, firstName, startDate, endDate, history) {
    return {
        name,
        lastName,
        firstName,
        startDate,
        endDate,
        history: [history],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(props.initialOpen || false);

    return (
        <>
            <tr  >
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}>
                    <IconButton
                        aria-label="expand row"
                        variant="outlined"
                        color="neutral"
                        size="small"
                        sx={{
                            border: "2px solid black",
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} >{row.name ? row.name : '/'}</td>
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }}  >{row.lastName}</td>
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} >{row.firstName}</td>
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} >{row.startDate}</td>
                <td className={styles.td} style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey" }} >{row.endDate}</td>
            </tr>
            <tr>
                <td style={{ backgroundColor: '#f0f2f5', borderBottom: "2px solid grey", height: 0, padding: 0 }} colSpan={6}>
                    {open && (
                        <Sheet sx={{ boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)', backgroundColor: "#f0f2f5", borderBottom: "2px solid grey" }}>
                            <Typography className={styles.typo}>
                                Details
                            </Typography>
                            <Table size="small">
                                <thead>
                                    <tr>
                                        <th className={styles.headers} >Courtage</th>
                                        <th className={styles.headers}>T.U.R.P.E</th>
                                        <th className={styles.headers}>C.S.P.E</th>
                                        <th className={styles.headers}>Logiciel</th>
                                        <th className={styles.headers}>GTB</th>
                                        <th className={styles.headers}>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row.history.map((historyRow, index) => (
                                        <tr key={index}>
                                            <td className={styles.boolean} >{historyRow.date}</td>
                                            <td className={styles.boolean} >{historyRow.customerId}</td>
                                            <td className={styles.boolean} >{historyRow.amount}</td>
                                            <td className={styles.boolean} >{historyRow.logiciel}</td>
                                            <td className={styles.boolean} >{historyRow.GTB}</td>
                                            <td className={styles.boolean}  >
                                                <p className={historyRow.statut === "terminé" || historyRow.statut === "clause gagnée" ? styles.terminado : historyRow.statut === "en cours" ? styles.encours : historyRow.statut === "clause perdue" ? styles.perdue : null}>{historyRow.statut}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    )}
                </td>
            </tr>
        </>
    );
}


export default function TableCollapsibleRow() {

    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const getFilteredRows = () => {
        if (!searchQuery) return rows;
        return rows.filter((row) =>
            row.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };


    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await fetch("/api/crud/clients/get-all");
                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setLoading(false)
                    const newData = data.allClients.map((client) => {
                        if (client.Etudes[0]) {
                            const historyData = {
                                date: client.Etudes[0].resultats[0] && client.Etudes[0].resultats[0].noteCategorieAnalyse <= 5 ?
                                    <Image src={check} height={30} width={30} alt='alt' priority /> :
                                    <Image src={close} height={20} width={20} alt='alt' priority />,
                                customerId: client.Etudes[0].resultats[0] && client.Etudes[0].resultats[0].noteCategorieTaxes <= 5 ?
                                    <Image src={check} height={30} width={30} alt='alt' priority /> :
                                    <Image src={close} height={20} width={20} alt='alt' priority />,
                                amount: client.Etudes[0].resultats[0] && client.Etudes[0].resultats[0].CSPE ?
                                    <Image src={check} height={30} width={30} alt='alt' priority /> :
                                    <Image src={close} height={20} width={20} alt='alt' priority />,
                                statut: client.Etudes[0].statut,
                                logiciel: client.Etudes[0].resultats[0] && (client.Etudes[0].resultats[0].rg_operate_tertiaire_oui_01 || client.Etudes[0].resultats[0].rg_oblig_obj_tertiaire_oui_01 || client.Etudes[0].resultats[0].rg_bis_1k_tertiaire_non_01) ? <Image src={check} height={30} width={30} alt='alt' priority /> : <Image src={close} height={20} width={20} alt='alt' priority />,
                                GTB: client.Etudes[0].resultats[0] && client.Etudes[0].resultats[0].rg_bacs_outils_oui_01 ? <Image src={check} height={30} width={30} alt='alt' priority /> : <Image src={close} height={20} width={20} alt='alt' priority />,
                            };
                            return createData(
                                client.nom_entreprise,
                                client.Dirigeants[0].nom.toUpperCase(),
                                client.Dirigeants[0].prenom.toUpperCase(),
                                new Date(client.Etudes[0].date_debut).toLocaleDateString("fr-FR"),
                                new Date(client.Etudes[0].date_fin).toLocaleDateString("fr-FR"),
                                historyData
                            );
                        }
                        return null;
                    }).filter(item => item !== null);
                    setRows(newData);
                }
            } catch (error) {
                setLoading(false)
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (selectedPage) => {
        setCurrentPage(selectedPage);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const offset = currentPage * itemsPerPage;
    const currentRows = getFilteredRows().slice(offset, offset + itemsPerPage);


    return (
        <div>
            {loading ? <div className={styles.loader}>
                <Loader />
            </div> : (<>
                <Input startDecorator={<SearchIcon />} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Recherche par Nom..." type="search" sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "#1a2528", border: "2px solid #1a2528" }} />

                <Sheet sx={{ minHeight: "70vh" , backgroundColor:"transparent"}} >
                    <Table >
                        <thead >
                            <tr  >
                                <th className={styles.tr} style={{ backgroundColor: '#f0f2f5' }} />
                                <th className={styles.tr} style={{ backgroundColor: '#f0f2f5' }}>Raison social</th>
                                <th className={styles.tr} style={{ backgroundColor: '#f0f2f5' }}>Nom</th>
                                <th className={styles.tr} style={{ backgroundColor: '#f0f2f5' }}>Prénom</th>
                                <th className={styles.tr} style={{ backgroundColor: '#f0f2f5' }}>Date de création</th>
                                <th className={styles.tr} style={{ backgroundColor: '#f0f2f5' }}>Date de fin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row, index) => (
                                <Row key={index} row={row} initialOpen={index === 0} />
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
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
            </>)}

        </div>
    );
}