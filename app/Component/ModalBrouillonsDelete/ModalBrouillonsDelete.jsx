import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function AlertDialogModal({ idEtude, idClient , onDeleteSuccess }) {
    const [open, setOpen] = React.useState(false);


    const handleDeleteEtude = async () => {
        setOpen(false)
        try {
            const res = await fetch('/api/crud/etude/delete', {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ idEtude , idClient })
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                onDeleteSuccess(data);
            } else {
                console.log('erreur')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <React.Fragment>
            <Button
                variant="soft"
                color="danger"
                onClick={() => setOpen(true)}
            ><DeleteForever /></Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Êtes-vous sure de vouloir supprimé cette Étude ?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={handleDeleteEtude}>
                            Supprimer l'étude
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
