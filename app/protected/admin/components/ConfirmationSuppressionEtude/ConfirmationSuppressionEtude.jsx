import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ResponsiveDialog({ open, handleClose, handleDisagree, handleAgree }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle sx={{ textAlign: 'center' }} id="responsive-dialog-title">
                {"Êtes-vous sur de vouloir supprimer cette Etude ?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ textAlign: 'center' }}>
                    La suppression de cette étude entrainera la suppression de tout les <strong>contrats</strong> les <strong>resultats</strong> et toutes les <strong>commissions</strong> qui lui sont directement <strong>rattaché</strong>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleDisagree}>
                    Annuler
                </Button>
                <Button sx={{ color: 'red' }} onClick={handleAgree} autoFocus>
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ResponsiveDialog;
