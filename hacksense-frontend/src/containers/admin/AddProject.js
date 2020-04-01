import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Container,
    CircularProgress
} from '@material-ui/core';
import AdminCard from 'components/AdminCard';
import ProjectForm from 'components/ProjectForm';
import Authenticated from 'layouts/Authenticated';
import axios from 'axios';
import { ArrowBack } from '@material-ui/icons';
import { defaultAPIURL } from 'config';

const useStyles = makeStyles(theme => ({
    fullHeightVH: {
        height: '94.75vh'
    },
    fullHeightPer: {
        height: '100%'
    },
    padding: {
        paddingLeft: theme.spacing(10),
    },
    primary: {
        backgroundColor: '#f50057'
    },
    secondary: {
        backgroundColor: '#e67e22'
    },
    backIcon: {
        marginRight: '10px',
        width: '50px'
    },
}));

const AddProject = (props) => {
    const classes = useStyles();
    const backend = defaultAPIURL;
    return (
        <Authenticated>
            <Grid container className={classes.fullHeightVH} justify="center" spacing={6}>
                <Grid item md={2} xs={12} className={classes.fullHeightPer} >
                    <AdminCard username="User name" points={1} location={props.location} />
                </Grid>
                <Grid container item md={7} xs={12} className={classes.fullHeightPer + " " + classes.padding}>
                    <Grid item container alignItems='center' xs={12} className={classes.requestTextContainer}>
                        <Typography variant="h4"><ArrowBack className={classes.backIcon} />Add Project</Typography>
                    </Grid>
                    <Grid container alignItems='flex-start' justify='flex-start'
                        className={classes.fullHeightPer + " " + classes.cardContainer} item xs={12}>
                        <Grid item xs={12}>
                            <ProjectForm />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Authenticated>
    );
};

export default AddProject;
