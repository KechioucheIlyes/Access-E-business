'use client'
import React, { useEffect, useState } from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import styles from "./TabsCategorie.module.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';


const TabsCategorie = ({ tabs, index }) => {
    const [questions, setQuestions] = useState([]);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#a2e8da',
                dark: '#14b497;',

                test: "#14b497"
            },
        },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/questions');
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        const question = data.questions.categories;
                        setQuestions(question);
                    }
                } else {
                    console.log('erreur veuillez reessayer plus tard');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <Tabs
            
            className={styles.tabs}
            aria-label="tabs"
            value={index}
            sx={{ bgcolor: 'transparent' }}
        >
            {questions ? <TabList
                
                sx={{
                    p: 0.5,
                    gap: 0.5,
                    borderRadius: 'xl',
                    bgcolor: theme.palette.primary.main,
                    boxShadow: 'xl',
                    bgcolor: theme.palette.primary.main,
                    [`& .${tabClasses.root}[aria-selected="false"]`]: {
                        boxShadow: "lg",
                        bgcolor: theme.palette.primary.main
                    }

                }}
            >
                {questions.map((categorie, index) => (
                    <Tab key={index} disableIndicator  >
                        {categorie.categorie}
                    </Tab>
                ))}
            </TabList> : null
            }
        </Tabs>
    )
}

export default TabsCategorie