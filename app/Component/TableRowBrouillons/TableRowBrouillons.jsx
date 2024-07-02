"use client"
import * as React from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import styles from "./tablerowbrouillons.module.css"
import { Input } from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ModalBrouillonsView from "./../../Component/ModalBrouillonsView/ModalBrouillonsView"
import ModalBrouillonsDelete from "./../../Component/ModalBrouillonsDelete/ModalBrouillonsDelete"
import Link from 'next/link';
import { useMyContext } from "./../../Context/resultContext/Context"
import Loader from '../Loader/Loader';
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function TableColumnPinning() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;
    const [rows, setRows] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('');
    const [steps, setSteps] = React.useState(0)
    const { setIdEtude, setIdClient } = useMyContext()
    const [deleteData, setDeleteData] = React.useState(null);


    const handleDeleteSuccess = (data) => {

        setDeleteData(data);
    }


    let filteredRows = rows
        .map(row => {
            return {
                Etudes: row.Etudes,
                Dirigeants: row.Dirigeants.filter(dirigeant => dirigeant.nom.toLowerCase().includes(searchTerm.toLowerCase()))
            };
        })
        .filter(row => row.Etudes.some(r => r.nom_etude.toLowerCase().includes(searchTerm.toLowerCase())) || row.Dirigeants.length > 0);
    React.useEffect(() => {
        const fetchingBrouillons = async () => {
            const res = await fetch('/api/crud/brouillons', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data.arrayBrouillons)
                setRows(data.arrayBrouillons)

                if (data.arrayBrouillons) {
                    for (let etudes of data.arrayBrouillons) {
                        console.log("etudes", etudes.Etudes[0])
                        if (etudes.Etudes[0].resultats.length > 0) {
                            setSteps(2)
                        } else if (etudes.Etudes[0].contrats.length == 0) {

                        }
                    }
                }
            } else {
                return
            }
        }
        fetchingBrouillons()
    }, [deleteData])


    const handleView = () => {
        alert("View")
    }
    const handleEdit = () => {
        alert("Edit")
    }
    const handleDelete = () => {
        alert("Delete")
    }


    return (
        <div className={styles.tableContainer}>
            {rows.length > 0 ? (<>  <Input startDecorator={<SearchIcon />} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Recherche..." type="search" sx={{ borderRadius: "20px", backgroundColor: "transparent", color: "#1a2528", border: "2px solid grey" }} />

                <Box sx={{ width: '100%', marginTop: "10px", backgroundColor: "transparent" }}>

                    <Sheet
                        variant="outlined"
                        sx={{
                            '--TableCell-height': '40px',
                            // the number is the amount of the header rows.
                            '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                            '--Table-firstColumnWidth': '80px',
                            '--Table-lastColumnWidth': '144px',
                            // background needs to have transparency to show the scrolling shadows
                            '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                            '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                            overflow: 'auto',

                            backgroundSize:
                                '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'local, local, scroll, scroll',
                            backgroundPosition:
                                'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                            backgroundColor: '#f0f2f5',
                        }}
                    >
                        <Table
                            borderAxis="bothBetween"
                            stripe="odd"
                            hoverRow
                            sx={{

                                '& tr > *:first-of-type': {
                                    position: 'sticky',
                                    left: 0,
                                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                                    bgcolor: '#f0f2f5',
                                },
                                '& tr > *:last-child': {
                                    position: 'sticky',
                                    right: 0,
                                    bgcolor: 'var(--TableCell-headBackground)',
                                },
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: 200 }}>Études</th>
                                    <th style={{ width: 200 }}>Clients</th>
                                    <th style={{ width: 200 }}>Dirigeants</th>
                                    <th style={{ width: 200 }}>Résultats</th>
                                    <th style={{ width: 200 }}>Contrats</th>
                                    <th
                                        aria-label="last"
                                        style={{ width: 200 }}
                                    >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRows.map((row) =>
                                (
                                    row.Etudes.map(r => (
                                        <tr key={r.id} >
                                            <td>{r.nom_etude}</td>
                                            <td>{r.nom_etude.split('-')[3]}</td>
                                            <td>{r.nom_etude.split('-')[1]}</td>
                                            <td>{r.resultats.length > 0 ? 'Terminé' : 'en cours'}</td>
                                            <td>{r.contrats.length > 0 ? 'Terminé' : 'en cours'}</td>

                                            <td>
                                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-around' }}>
                                                    {
                                                        r.resultats.length > 0 && r.contrats.length > 0 ? <ModalBrouillonsView stepper={4} /> : <ModalBrouillonsView stepper={2} />
                                                    }
                                                    <Link onClick={() => {
                                                        if (r.resultats.length > 0 && r.contrats.length > 0) {
                                                            setIdEtude(r.id);
                                                            setIdClient(r.ID_clients);
                                                        }
                                                    }} className={styles.linked} style={{ paddingInline: "1rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "9px", backgroundColor: 'rgba(85, 26, 139, 0.2)', color: '#551a8b' }} href={r.resultats.length > 0 && r.contrats.length > 0 ? "/protected/user/resultat" : `/protected/user/questionnaire/${r.id}`} >
                                                        <EditIcon />
                                                    </Link>

                                                    <ModalBrouillonsDelete idEtude={r.id} idClient={r.ID_clients} onDeleteSuccess={handleDeleteSuccess} />

                                                </Box>
                                            </td>
                                        </tr>
                                    ))


                                )
                                )}
                            </tbody>
                        </Table>
                    </Sheet>
                </Box >

            </>
            )
                : <div className={styles.loader}>
                    <Loader />
                </div>
            }

        </div >
    );
}
