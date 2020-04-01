import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    Grid,
    Button,
    Avatar,
    Typography
} from '@material-ui/core';
import axios from 'axios';
import { defaultAPIURL } from 'config';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    padding: {
        padding: theme.spacing(3),
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

function RequestCard(props) {
    const classes = useStyles();
    const [isDisplay, setDisplay] = useState(true);

    const backend = defaultAPIURL;

    const accept = async () => {
        axios.put(backend + "/project/" + props.project.id + "/request", {
            id_request: props.requestId,
            id_user: props.user.id,
            id_project: props.project.id,
            status: "accepted"
        }).then(() => {
            setDisplay(false);
        });
    };

    const reject = async () => {
        axios.put(backend + "/project/" + props.project.id + "/request", {
            id_request: props.requestId,
            id_user: props.user.id,
            id_project: props.project.id,
            status: "rejected"
        }).then(() => {
            setDisplay(false);
        });
    };
    if (isDisplay) {
        return (
            <Card variant="outlined" className={classes.root}>
                <Grid container className={classes.root + " " + classes.padding}>
                    <Grid container alignItems="center" justify="center" item md={1} xs={12}>
                        <Avatar alt={props.user.name} src={props.profilePic} />
                    </Grid>
                    <Grid container alignItems="center" justify="flex-start" item md={7} xs={12}>
                        <Typography>
                            <b>{props.user.name}</b> requested to apply to <b>{props.project.name}</b>
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center" justify="center" item md={2} xs={6}>
                        <Button variant="contained" color="primary" disableElevation onClick={accept}>
                            Accept
                    </Button>
                    </Grid>
                    <Grid container alignItems="center" justify="center" item md={2} xs={6}>
                        <Button variant="contained" color="secondary" disableElevation onClick={reject}>
                            Reject
                    </Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }else{
        return (
            <div/>
        )
    }
}

export default RequestCard;
