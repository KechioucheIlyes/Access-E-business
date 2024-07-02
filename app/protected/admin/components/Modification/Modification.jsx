import React, { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import styles from "./modification.module.css"
import Avatar from '@mui/joy/Avatar';
import Image from 'next/image';
import First from "./../../../../Assets/premiere-place.png"
import Second from "./../../../../Assets/deuxieme-prix.png"
import Thrid from "./../../../../Assets/troisieme-prix.png"
const Modification = () => {
    let [users, setUsers] = useState([])
    let [topUsers, setTopUsers] = useState([])
    const [tablePlace, setTablePlace] = useState([First, Second, Thrid])
    const [lengthUsers, setLengthUsers] = useState()
    const [revenueGenerer, setRevenueGenerer] = useState()


    useEffect(() => {
        const fetchingAllUsers = async () => {
            const res = await fetch("/api/crud/allUsers", {
                method: "GET"
            })
            if (res.ok) {
                const data = await res.json()
                if (data) {
                    const newUsers = data.newUsers
                    const numberAllUsers = data.userLength
                    const revenueGenerer = data.commissionTotale
                    setUsers(newUsers);
                    setLengthUsers(numberAllUsers)
                    setRevenueGenerer(revenueGenerer)
                }
            } else {
                return
            }
        }
        const fetchingTopGunUsers = async () => {
            const res = await fetch("/api/top/users", {
                method: "GET"
            })
            if (res.ok) {
                const data = await res.json()
                if (data) {
                    setTopUsers(data.topGunUsers)

                }
            } else {
                return
            }
        }
        fetchingAllUsers()
        fetchingTopGunUsers()
    }, [])
    return (
        <div className={styles.modification}>
            <div className={styles.cardContainer}>
                <Card variant="soft" color="success" invertedColors>
                    <CardContent orientation="horizontal">
                        <CircularProgress size="lg" determinate value={20}>
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                    />
                                </svg>
                            </SvgIcon>
                        </CircularProgress>
                        <CardContent>
                            <Typography level="body-md">Revenues générés</Typography>
                            <Typography level="h2">{revenueGenerer ? revenueGenerer : 0}€</Typography>
                        </CardContent>
                    </CardContent>

                </Card>

                <Card variant="soft" color="primary" invertedColors>
                    <CardContent orientation="horizontal">
                        <CircularProgress size="lg" determinate value={20}>
                            <SvgIcon>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                                    />
                                </svg>
                            </SvgIcon>
                        </CircularProgress>
                        <CardContent>
                            <Typography level="body-md">Nombre d'utilisateur</Typography>
                            <Typography level="h2">{lengthUsers ? lengthUsers : 0}</Typography>
                        </CardContent>
                    </CardContent>
                </Card>


            </div>
            <div className={styles.title}>
                <h1>Top apporteur d'affaire</h1>

            </div>
            <div className={styles.bestSellerTable}>

                <div className={styles.table}>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col' >Place</th>
                                <th scope='col' >Utilisateur</th>
                                <th scope='col' >Revenue Généré</th>
                                <th scope='col' >inscription Le</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topUsers ? topUsers.map((user, index) => {
                                const firstLetterName = user.name[0]
                                const firstLetterPrenom = user.prenom[0]
                                return (
                                    <tr key={user.id} >
                                        <td>
                                            <div className={styles.tdContainer}>
                                                <Image src={tablePlace[index]} height={50} width={50} alt='place' priority />
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.tdContainer}>
                                                <div className={styles.infoTd}> <p>{user.name} {user.prenom}</p></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.tdContainer}>

                                                <div className={styles.infoTd}>{user.Commissions.reduce((total, commission) => total + commission.montant_commission_total, 0)} €</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.tdContainer}>
                                                <div className={styles.infoTd}><p>{new Date(user.create_time).toLocaleDateString()}</p></div>
                                            </div>
                                        </td>


                                    </tr>
                                )


                            }) : <p>null</p>}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Modification