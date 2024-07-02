'use client'
import React, { useState } from 'react'
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import styles from './confirmation.module.css'
import Image from 'next/image';
import valid from "../Assets/validation.png"
import danger from "../Assets/danger.png"
import coche from "../Assets/coche.png"
import { useRouter } from 'next/navigation';
const confirmation = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [confirmationStatus, setConfirmationStatus] = useState(null);
    const [countdown, setCountdown] = useState(5);
    if (!token) {
        setConfirmationStatus('NO_TOKEN');
    } else {
        useEffect(() => {
            (async () => {
                try {
                    const data = await getUrl(token);
                    if (data.alredyConfirmed) {
                        setConfirmationStatus('Already')
                    }
                    else if (data.confirmedWithSuccess) {
                        setConfirmationStatus('CONFIRMED')
                    } else {
                        setConfirmationStatus('NOT_CONFIRMED')
                    }
                } catch (error) {
                    console.error(error);
                    setConfirmationStatus('ERROR')
                }
            })();
        }, [token]);
    }

    
    let message;
    let statusClass;
    let pic;

    switch (confirmationStatus) {
        case 'CONFIRMED':
            message = 'Mail confirmé avec Succes !';
            statusClass = styles.confirmed;
            pic = valid
            break;
        case 'NOT_CONFIRMED':
            message = 'Confirmation échouée, revenez plus tard !';
            statusClass = styles.notConfirmed;
            pic = danger
            break;
        case 'NO_TOKEN':
            message = 'Aucun token trouvé , veuillez réessayez plus tard ! ';
            statusClass = styles.noToken;
            pic = danger
            break;
        case 'Already':
            message = 'Email déja confirmé !';
            statusClass = styles.alreadyConfirmed;
            pic = coche
            break;
        case 'ERROR':
            message = 'Une erreur est survenue, veuillez réessayer plus tard';
            statusClass = styles.error;
            pic = danger
            break;
        default:
            message = '';

    }

    return (
        <div className={`${styles.message} ${statusClass}`}>

            {pic ? <Image src={pic} width={320} height={320} /> : null}
            <h1>{message}</h1>
            <h2>Vous allez être rediriger vers la page de connexion dans 5 secondes</h2>

        </div>
    )

}
async function getUrl(token) {
    try {
        const response = await fetch(`/api/confirmation/${token}`);
        if (!response.ok) {
            throw new Error('La requête a échoué');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default confirmation