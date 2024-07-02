import * as React from 'react';
import { Transition } from 'react-transition-group';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
const steps = [
    'Étape de création du Client',
    'Étape de création du Dirigeant',
    'Étape de réponse questionnaire',
    'Étape de vue sur le Resultat',
    'Étape de Génération des CPP',
];
export default function FadeModalDialog({ stepper }) {
    
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <Button variant="soft" color='primary' onClick={() => setOpen(true)}>
                <VisibilityIcon />
            </Button>
            <Transition in={open} timeout={400}>
                {(state) => (
                    <Modal
                        keepMounted
                        open={!['exited', 'exiting'].includes(state)}
                        onClose={() => setOpen(false)}
                        slotProps={{
                            backdrop: {
                                sx: {
                                    opacity: 0,
                                    backdropFilter: 'none',
                                    transition: `opacity 400ms, backdrop-filter 400ms`,
                                    ...{
                                        entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                                        entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                                    }[state],
                                },
                            },
                        }}
                        sx={{
                            visibility: state === 'exited' ? 'hidden' : 'visible',
                        }}
                    >
                        <ModalDialog
                            sx={{
                                opacity: 0,
                                transition: `opacity 300ms`,
                                ...{
                                    entering: { opacity: 1 },
                                    entered: { opacity: 1 },
                                }[state],
                            }}
                        >
                            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>Suivis de votre Étude</DialogTitle>
                            <Stepper activeStep={stepper} alternativeLabel>
                                {steps.map((label) => (
                                    <Step   key={label}>
                                        <StepLabel >{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </ModalDialog>
                    </Modal>
                )}
            </Transition>
        </React.Fragment>
    );
}
