import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    full: {
        width: '15em',
        height: '15em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primary: {
        backgroundColor: '#f50057'
    },
    secondary: {
        backgroundColor: '#e67e22'
    },
    tertiary: {
        backgroundColor: '#f1c40f'
    },
}));

function SignUpType(props) {
    const classes = useStyles();
    return (
        <Link to={["/signup/", props.type].join('')}>
            <Button variant="outlined" className={classes.full}>
                {props.type}
            </Button>
        </Link>
    );
}

export default SignUpType;
