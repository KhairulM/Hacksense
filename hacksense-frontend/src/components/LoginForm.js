import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashLink as Link } from 'react-router-hash-link';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Cookie from "universal-cookie";
import config from '../config'
import { 
    Typography,
    Grid,
    Button,
    TextField,
    Snackbar
} from '@material-ui/core';
import { register } from 'serviceWorker';

const useStyles = makeStyles(theme => ({
    textfield_container:{
        alignSelf: "center"
    },
    textfield: {
        width: "80%",
        marginTop: theme.spacing(2)
    },
    buttons_container: {
        marginTop: "5vh"
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

function LoginForm(props) {
    const styles = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFailed, setOpenFailed] = useState(false)
    const cookie = new Cookie();

    const handleSubmitForm = async e => {
        e.preventDefault()
        const response = await postFormData();
        
        if (response) {
            if (response.status === 200){
                //snackbar
                setOpenSuccess(true)

                //simpan cookie
                cookie.set("token", response.data.data.token);
                cookie.set("type", response.data.data.type);
                cookie.set("id", response.data.data.id);

                //redirect
                if (response.data.data.type === 'admin'){
                    props.history.push("/projects")    
                }else {
                    props.history.push("/projects")
                }
                
            } else {
                //redirect to users page
                setOpenFailed(true)
            }
        }

          
    }

    const handleCloseFailed = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenFailed(false)
    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSuccess(false)
    }

    const postFormData = async () => {
        try {
            const response = await Axios({
                url: config.defaultAPIURL + "auth",
                data: {username, password},
                method: "POST"
            })

            return response
        } catch (e) {
            setOpenFailed(true)
            console.log(e); 
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Typography variant="h5" className={styles.title}>
                Login
            </Typography>
            <form noValidate autoComplete="on" onSubmit={handleSubmitForm}>
                <Grid container item direction="column" justify="center" alignItems="center" className={styles.textfield_container}>
                    <TextField className={styles.textfield} id="form-username" value={username} onChange={(e) => setUsername(e.target.value)} label="Username" placeholder="johndoe" variant="outlined"></TextField>
                    <TextField className={styles.textfield} id="form-password" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="outlined"></TextField>
                </Grid>
                <Grid container className={styles.buttons_container} direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <Link to="/signup" style={{ textDecoration: "none" }}>
                            <Button variant="text">Sign up</Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="secondary" disableElevation>Login</Button>   
                    </Grid>
                </Grid>
            </form>
            <Snackbar 
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={openFailed}
                autoHideDuration={5000}
                onClose={handleCloseFailed}>
                <Alert onClose={handleCloseFailed} severity="error">Username or password does not match!</Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                open={openSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">Account verified</Alert>
            </Snackbar>
        </React.Fragment>
    );
}
export default withRouter(LoginForm);