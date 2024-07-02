import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green, red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { useEffect } from 'react';
const theme = createTheme({
    palette: {
        primary: {
            main: '#009688',
            light: "#00d062",
            dark: '#069b4b'

        },
    },
});

function CircularButton({ onClick, loading, success, label }) {
    const buttonSx = {
        ...(success && {

            bgcolor: theme.palette.primary.light,
            '&:hover': {
                bgcolor: theme.palette.primary.dark,
            },
        }
        ),
    };

    const [labelColor, setLabelColor] = useState('#009688');


    useEffect(() => {
        if (success) {
            setLabelColor('white');
        } else {
            setLabelColor('#009688');
        }
    }, [success]);

    const labelStyle = {
        color: labelColor,
    };

    return (
        <ThemeProvider theme={theme}>
            <Button onClick={onClick} variant='outlined' sx={buttonSx} disabled={loading}>
                <span style={labelStyle}>{label}</span>
                {loading ? (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: theme.palette.primary.light,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                ) : null}
            </Button>
        </ThemeProvider>
    );
}

export default CircularButton;
