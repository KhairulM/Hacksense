import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Button,
} from '@material-ui/core'
import SignUpForm from '../../components/SignUpForm';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles(theme => ({
    fullHeightVH: {
        height: '100vh'
    },
    fullHeightPer: {
        height: '80%',
        width: '80%'
    },
    signUpText: {
        width: '90%',
        paddingBottom: theme.spacing(2),
        borderBottom: 'solid 2px #f50057',
    },
    primary: {
        backgroundColor: '#f50057'
    },
    secondary: {
        backgroundColor: '#e74c3c'
    },
    arrowContainer: {
        width: '5%',
    },
    textContainer: {
        width: '95%',
    }
}));

function SignUpAs(props) {
    const classes = useStyles();
    const params = props.match.params;
    return (
        <Grid container justify='center' alignItems='center' className={classes.fullHeightVH}>
            <Grid item container className={classes.fullHeightPer}>
                <Grid container item xs={12}>
                    <Grid item className={classes.arrowContainer}>
                        <Link to={"/signup"}>
                            <ArrowBackIcon style={{ fontSize: 45 }} />
                        </Link>
                    </Grid>
                    <Grid item className={classes.textContainer}>
                        <Typography variant='h4' className={classes.signUpText}>
                            Signup as {params.type}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <SignUpForm />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SignUpAs;
