'use client'
import React, { useEffect } from 'react'
import TableRowBrouillon from "../../../Component/TableRowBrouillons/TableRowBrouillons"
import NavBar from "./../../../Component/NavBar/NavBar"
import styles from "./brouillon.module.css"
const Brouillons = () => {


    return (
        <div>
            <NavBar accueilClient={true} accueil={false} connexion={false} contact={false} inscription={false} backgroundColor={true} avatar={true} isAdmin={true} portefeuille={true} commission={true} />


            <div className={styles.information}>
                <h1>
                    Vous trouverez ici tous vos brouillons inachevés. Vous pouvez reprendre là où vous vous êtes arrêté en cliquant sur l'icône représentant un stylo.
                </h1>
            </div>

            <div>
                <TableRowBrouillon />
            </div>


        </div>
    )
}

export default Brouillons