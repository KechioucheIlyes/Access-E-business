import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import certified from "./../../Assets/certified.png"
import Image from 'next/image';
export default function BioCard({ nomA, prenomA, nom, prenom, siren, fonction, commissions, clients, filleuls, email, numero, fixe, raisonSocial, createdAt, updatedAt, confirmed, activated }) {
    return (
        <Card
            sx={{
                width: 320,
                maxWidth: '100%',
                boxShadow: 'lg',
            }}
        >
            <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Avatar sx={{ border: "2px solid black", padding: "25px", fontSize: "30px", backgroundColor: "#fff", color: "#14b497" }}>{nomA}{prenomA}</Avatar>
                <Chip
                    size="lg"
                    variant="soft"

                    sx={{
                        mt: -1,
                        mb: 1,
                        border: '3px solid',
                        borderColor: 'background.surface',
                        backgroundColor: "#14b497",
                        color: "white"
                    }}
                >
                    {siren}
                </Chip>
                <Typography level="title-lg">{nom} {prenom}</Typography>

                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {fonction}
                </Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {email}
                </Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {numero}
                </Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {fixe}
                </Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    {raisonSocial}
                </Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    Créer le  : {createdAt}
                </Typography>
                <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                    Modifier le  :{updatedAt}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        width: "100%",
                        gap: 2,
                        mt: 2,
                        justifyContent: "space-around",
                        '& > button': { borderRadius: '2rem' },
                    }}
                >
                    <Typography level="body-sm" sx={{ maxWidth: '24ch', display: "flex", flexDirection: "column" }}>
                        Commissions
                        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                            {commissions}

                        </Typography>
                    </Typography>
                    <Typography level="body-sm" sx={{ maxWidth: '24ch', display: "flex", flexDirection: "column" }}>
                        Clients
                        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                            {clients}

                        </Typography>
                    </Typography>
                    <Typography level="body-sm" sx={{ maxWidth: '24ch', display: "flex", flexDirection: "column" }}>
                        Filleuls
                        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                            {filleuls}

                        </Typography>
                    </Typography>
                </Box>
            </CardContent>

        </Card>
    );
}
