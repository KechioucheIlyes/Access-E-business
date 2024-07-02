import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import styles from "./modalselectedclient.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const style = {
    color: 'white',
    position: 'absolute',
    borderRadius: '1rem',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(62, 68, 94, 0.99)',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,

};




const styleBtn = {
    color: "white",
    border: "1px solid white",
    width: "100%",
    marginTop: "20px"

}
const styleBtnValidate = {
    color: "#5fcf65",
    border: "1px solid #5fcf65",

}
const styleBtnCancel = {
    color: "#f96057",
    border: "1px solid #f96057",

}

export default function TransitionsModal({ user, id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [age, setAge] = React.useState('');
    const [activated, setActivated] = React.useState('');
    const [name, setName] = React.useState('')
    const [prenom, setPrenom] = React.useState('')
    const [role, setRole] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [tel, setTel] = React.useState('')
    const [fenction, setFenction] = React.useState('')
    const [raisonSociale, setRaisonSociale] = React.useState('')
    const [siren, setSiren] = React.useState('')
    const [activateInput, setActivateInput] = React.useState('')


    const handleClose = () => {
        setOpen(false);
        setActivateInput('')
    }


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleChangeActivated = (event) => {
        setActivated(event.target.value);
    };


    const firstLetterName = user.name.charAt(0)
    const firstLetterPrenom = user.prenom.charAt(0)

    return (
        <div>
            <Button onClick={handleOpen}>{user.name} {user.prenom}</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography className={styles.typo} id="transition-modal-title" variant="h6" component="h2">
                            <div className={styles.Avatar} ><Avatar>{firstLetterName}{firstLetterPrenom}</Avatar></div>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    alert(JSON.stringify(formJson));
                                }}
                            >
                                {/* <Stack spacing={1}>
                                    <Input placeholder="Try to submit with no text!" required />
                                    <Input placeholder="It is disabled" disabled />
                                    <Button type="submit">Submit</Button>
                                </Stack> */}
                            </form>
                            <div className={styles.btn}>

                                {activateInput === user.name ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setName(e.target.value) }} placeholder={user.name} name='name' required />
                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.name}</p> : null}  </Button>

                                }
                                {activateInput === user.prenom ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setPrenom(e.target.value) }} placeholder={user.prenom} required />

                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.prenom}</p> : null}  </Button>

                                }
                                {activateInput === user.role ?
                                    (
                                        <div className={styles.btns}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{user.role}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={age}
                                                    label="Role"

                                                >
                                                    <MenuItem value={user.role === "user" ? "admin" : 'user'}>{user.role === "user" ? "admin" : 'user'}</MenuItem>
                                                </Select>
                                            </FormControl>


                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.role}</p> : null}  </Button>

                                }
                                {activateInput === user.email ?
                                    (
                                        <div className={styles.btns}>
                                            <Input type='email' placeholder={user.email} required />
                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.email}</p> : null}  </Button>

                                }
                                {activateInput === user.numero ?
                                    (
                                        <div className={styles.btns}>
                                            <Input placeholder={user.numero} required />
                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.numero}</p> : null}  </Button>

                                }
                                {activateInput === user.fonction ?
                                    (
                                        <div className={styles.btns}>
                                            <Input placeholder={user.fonction} required />

                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.fonction}</p> : null}  </Button>

                                }
                                {activateInput === user.raison_social ?
                                    (
                                        <div className={styles.btns}>
                                            <Input placeholder={user.raison_social} required />

                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.raison_social}</p> : null}  </Button>

                                }
                                {activateInput === (user.activated ? "oui" : "non") ?
                                    (
                                        <div className={styles.btns}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">{user.activated ? "oui" : "non"}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={activated}
                                                    label="activated"
                                                >
                                                    <MenuItem value={user.activated ? "non" : "oui"}>{user.activated ? "non" : "oui"}</MenuItem>
                                                </Select>
                                            </FormControl>

                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.activated ? "oui" : "non"}</p> : null}  </Button>

                                }


                                {activateInput === user.siren ?
                                    (
                                        <div className={styles.btns}>
                                            <Input placeholder={user.siren} required />

                                        </div>
                                    ) :
                                    <Button sx={styleBtn}>  {user ? <p>{user.siren}</p> : null}  </Button>

                                }
                                {

                                    user.affiliation_id !== null ?
                                        activateInput === user.affiliated_by ?
                                            (
                                                <div className={styles.btns}>
                                                    <Input placeholder={user.affiliated_by} required />

                                                </div>
                                            ) :
                                            <Button sx={styleBtn}>  {user ? <p>{user.affiliated_by}</p> : null}  </Button>

                                        : null}
                                {

                                    user.affiliation_id !== null ?

                                        activateInput === user.affiliation_id ?
                                            (
                                                <div className={styles.btns}>
                                                    <Input placeholder={user.affiliation_id} required />

                                                </div>
                                            ) :
                                            <Button sx={styleBtn}>  {user ? <p>{user.affiliation_id}</p> : null}  </Button>

                                        : null}
                            </div>

                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}