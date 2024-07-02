'use client'
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import styles from './prestationtype.module.css';
import { useRouter } from 'next/navigation';

const PrestationType = () => {
    const [value, setValue] = useState(0);
    const [url, setUrl] = useState();
    const [disableTabs, setDisableTabs] = useState(false); // Ajout de l'état pour désactiver les onglets

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const href = document.location.href;
        setUrl(href);
    }, []);

    const splitedUrl = url ? url.split("/questions/") : null;

    useEffect(() => {
        if (splitedUrl && splitedUrl[1] === "economies-denergies") {
            setDisableTabs(true); // Désactiver les onglets lorsque l'URL correspond
        } else {
            setDisableTabs(false); // Activer les onglets pour les autres URL
        }
    }, [splitedUrl]);

    return (
        <>
            <div>PrestationType</div>
            <Tabs value={value} onChange={handleChange} aria-label="tabs example">
                <Tab label="Contractuelle" disabled={disableTabs} />
                <Tab label="Taxes" disabled={disableTabs} />
                <Tab label="Economies d'énergies" />
                <Tab label="Réglementaire" disabled={disableTabs} />
            </Tabs>
            {url}
        </>
    );
};

export default PrestationType;
