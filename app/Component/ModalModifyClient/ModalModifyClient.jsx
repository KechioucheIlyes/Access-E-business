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
import styles from "./ModalModifyClient.module.css"
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

export default function TransitionsModal({ user, id, onCallback }) {
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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    };

    const handleClose = () => {
        setOpen(false);
        setActivateInput('')
    }
    const [activateInput, setActivateInput] = React.useState('')

    const handlecLick = (input) => {

        setActivateInput(input)

    }

    const handleModify = async (name, id) => {

        try {
            const res = await fetch("/api/crud/admin/update/name", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    id
                })
            })

            if (res.ok) {
                const data = await res.json()
                onCallback(data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const handleModifyPrenom = async (prenom, id) => {

        try {
            const res = await fetch("/api/crud/admin/update/prenom", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prenom,
                    id
                })
            })

            if (res.ok) {
                const data = await res.json()

                onCallback(data)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleModifyRole = async (role, id) => {

        try {
            const res = await fetch("/api/crud/admin/update/role", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()
                
                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleModifyRaisonSociale = async (raisonSociale, id) => {
        try {
            const res = await fetch("/api/crud/admin/update/raison-sociale", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    raisonSociale,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()

                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleModifyFonction = async (fonction, id) => {

        try {
            const res = await fetch("/api/crud/admin/update/fonction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fonction,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()

                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleModifyTel = async (tel, id) => {

        try {
            const res = await fetch("/api/crud/admin/update/telephone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tel,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()
                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleModifyEmail = async (email, id) => {
        
        
        if (!validateEmail(email)) {
            return;
        }
        try {
            const res = await fetch("/api/crud/admin/update/email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()
                
                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleActivated = async (activated, id) => {
        

        try {
            const res = await fetch("/api/crud/admin/update/activated", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    activated,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()
                
                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleClickSiren = async (siren, id) => {
        console.log(siren)
        

        try {
            const res = await fetch("/api/crud/admin/update/siren", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    siren,
                    id
                })
            })
            if (res.ok) {
                const data = await res.json()
                
                onCallback(data)
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleCancel = () => {
        setActivateInput(false)
    }

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleChangeActivated = (event) => {
        setActivated(event.target.value);
    };
    const firstLetterName = user.name[0]
    const firstLetterPrenom = user.prenom[0]

    return (
        <div className={styles.modalContainer}>
            <Button onClick={handleOpen}>Modifier</Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                className={styles.modal}
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className={styles.box} sx={style}>

                        <Typography className={styles.typo} id="transition-modal-title" variant="h6" component="h2">
                            <div className={styles.Avatar} >

                                <Avatar>{firstLetterName}{firstLetterPrenom} </Avatar></div>
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
                                            <Input className={style.input} onChange={(e) => { setName(e.target.value) }} placeholder={user.name} name='name' required />
                                            <Button className={style.btnValidate} sx={styleBtnValidate} onClick={() => { handleModify(name, user.id) }} >✓</Button>
                                            <Button className={style.btnCancel} onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.name) }} sx={styleBtn}>  {user ? <p>{user.name}</p> : null}  </Button>

                                }
                                {activateInput === user.prenom ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setPrenom(e.target.value) }} placeholder={user.prenom} required />
                                            <Button sx={styleBtnValidate} onClick={() => { handleModifyPrenom(prenom, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.prenom) }} sx={styleBtn}>  {user ? <p>{user.prenom}</p> : null}  </Button>

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
                                                    onChange={handleChange}
                                                    className={styles.select}
                                                >
                                                    <MenuItem value={user.role === "user" ? "admin" : 'user'}>{user.role === "user" ? "admin" : 'user'}</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button sx={styleBtnValidate} onClick={() => { handleModifyRole(age, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.role) }} sx={styleBtn}>  {user ? <p>{user.role}</p> : null}  </Button>

                                }
                                {activateInput === user.email ?
                                    (
                                        <div className={styles.btns}>
                                            <Input type='email' onChange={(e) => { setEmail(e.target.value) }} placeholder={user.email} required />
                                            <Button sx={styleBtnValidate} onClick={() => { handleModifyEmail(email, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.email) }} sx={styleBtn}>  {user ? <p>{user.email}</p> : null}  </Button>

                                }
                                {activateInput === user.numero ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setTel(e.target.value) }} placeholder={user.numero} required />
                                            <Button sx={styleBtnValidate} onClick={() => { handleModifyTel(tel, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.numero) }} sx={styleBtn}>  {user ? <p>{user.numero}</p> : null}  </Button>

                                }
                                {activateInput === user.fonction ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setFenction(e.target.value) }} placeholder={user.fonction} required />
                                            <Button sx={styleBtnValidate} onClick={() => { handleModifyFonction(fenction, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.fonction) }} sx={styleBtn}>  {user ? <p>{user.fonction}</p> : null}  </Button>

                                }
                                {activateInput === user.raison_social ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setRaisonSociale(e.target.value) }} placeholder={user.raison_social} required />
                                            <Button sx={styleBtnValidate} onClick={() => { handleModifyRaisonSociale(raisonSociale, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.raison_social) }} sx={styleBtn}>  {user ? <p>{user.raison_social}</p> : null}  </Button>

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
                                                    onChange={handleChangeActivated}
                                                >
                                                    <MenuItem value={user.activated ? "non" : "oui"}>{user.activated ? "non" : "oui"}</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button sx={styleBtnValidate} onClick={() => { handleActivated(activated, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.activated ? "oui" : "non") }} sx={styleBtn}>  {user ? <p>{user.activated ? "oui" : "non"}</p> : null}  </Button>

                                }


                                {activateInput === user.siren ?
                                    (
                                        <div className={styles.btns}>
                                            <Input onChange={(e) => { setSiren(e.target.value) }} placeholder={user.siren} required />
                                            <Button sx={styleBtnValidate} onClick={() => { handleClickSiren(siren, user.id) }}>✓</Button>
                                            <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                        </div>
                                    ) :
                                    <Button onClick={() => { handlecLick(user.siren) }} sx={styleBtn}>  {user ? <p>{user.siren}</p> : null}  </Button>

                                }
                                {

                                    user.affiliation_id !== null ?
                                        activateInput === user.affiliated_by ?
                                            (
                                                <div className={styles.btns}>
                                                    <Input placeholder={user.affiliated_by} required />
                                                    <Button sx={styleBtnValidate}>✓</Button>
                                                    <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                                </div>
                                            ) :
                                            <Button onClick={() => { handlecLick(user.affiliated_by) }} sx={styleBtn}>  {user ? <p>{user.affiliated_by}</p> : null}  </Button>

                                        : null}
                                {

                                    user.affiliation_id !== null ?

                                        activateInput === user.affiliation_id ?
                                            (
                                                <div className={styles.btns}>
                                                    <Input placeholder={user.affiliation_id} required />
                                                    <Button sx={styleBtnValidate}>✓</Button>
                                                    <Button onClick={handleCancel} sx={styleBtnCancel}>X</Button>
                                                </div>
                                            ) :
                                            <Button onClick={() => { handlecLick(user.affiliation_id) }} sx={styleBtn}>  {user ? <p>{user.affiliation_id}</p> : null}  </Button>

                                        : null}
                            </div>

                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}