import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Logo from '../../assets/images/codersense_logo.png'
import LoginForm from '../../components/LoginForm'
import { HashLink as Link } from 'react-router-hash-link'
import {
    Container,
    Grid,
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    container: {
        padding: "20px 15px"
    },
    grid_container: {
        height: "100vh"
    },
    loginform_container: {
        backgroundColor: "#ffffff",
        textAlign: "center",
        padding: "50px",
        borderRadius: "15px",
        border: "1px rgba(0, 0, 0, 0.23) solid"
    }
}));

function Login() {
    const styles = useStyles();

    return (
        <Container className={styles.container}>
            <Link to="/">
                <img alt="CoderSense Logo" src={Logo} height="35px" style={{marginRight:"20px", cursor:"pointer"}} href="/"/>
            </Link>
            <Grid container alignItems="center" justify="center" className={styles.grid_container}>
                <Grid item className={styles.loginform_container} xs={6}>
                    <LoginForm />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;