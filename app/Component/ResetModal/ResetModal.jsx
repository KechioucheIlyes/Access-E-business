import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Input } from '@mui/joy';
import "./style.css"
export default function BasicModal({ userID }) {
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async () => {
        
        if ((password === confirmPassword) && (password !== "" && confirmPassword !== "")) {

            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ passwordRes: password, id: userID })

            })

            setPassword('');
            setConfirmPassword('');
            setOpen(false);



        } else {

            alert("Les mots de passe ne correspondent pas !");
        }
    };


    return (
        <React.Fragment>
            <Button className='btn-reset'  sx={{ color: "white", backgroundColor: "#2c8444", width: "230px" }}  onClick={() => setOpen(true)}>
                Modifier le mot de passe
            </Button>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , width:"100%" }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Vous êtes sur le point de modifier votre mot de passe
                    </Typography>
                    <div className='form'>
                        <div id="modal-desc" className='typo'  >
                            <Input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Mot de passe"
                            />
                        </div>
                        <div id="modal-desc-2" className='typo' >
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                placeholder="Confirmer le mot de passe"
                            />
                        </div>
                        <div id="modal-desc-3" className='typo-btn' >
                            <Button  variant="outlined" color="neutral" onClick={handleSubmit}>
                                Modifier
                            </Button>
                        </div>
                    </div>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
