import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
export default function BioCard({ nom_entreprise, adresse, siret, nom_du_contact, prenom_du_contact, email, tel, gender }) {
    return (
        <Card
            sx={{
                width: 620,
                maxWidth: '100%',
                boxShadow: 'lg',
                border: "3px solid #2c8443"
            }}
        >
            <CardContent sx={{display:'flex', alignItems: 'center', textAlign: 'center' }}>
                <Avatar src={gender === "Monsieur" ? "/homme.svg" : "/femme.svg"} sx={{ '--Avatar-size': '4rem' }} />
                <Chip
                    size="md"
                    variant="soft"
                    sx={{
                        color: '#1D5F31',
                        mt: -1,
                        mb: 1,
                        border: '3px solid',
                        borderColor: '#E9F1DC',
                        backgroundColor: '#E9F1DC',
                    }}
                >
                    {siret}
                </Chip>
                <Typography level="title-lg">Nom et Prenom : {nom_du_contact} {prenom_du_contact}</Typography>
                <Typography level="title-lg">Raison sociale : {nom_entreprise}</Typography>
                <Typography level="title-lg">Adresse : {adresse}</Typography>
                <Typography level="title-lg">Email : {email}</Typography>
                <Typography level="title-lg">N°tel : {tel}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mt: 2,
                        '& > button': { borderRadius: '2rem' },
                    }}
                >

                </Box>
            </CardContent>

        </Card>
    );
}