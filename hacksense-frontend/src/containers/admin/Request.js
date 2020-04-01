import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Container,
    CircularProgress
} from '@material-ui/core';
import AdminCard from 'components/AdminCard';
import RequestCard from 'components/RequestCard';
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
    requestCard: {
        margin: theme.spacing(5),
    },
    requestTextContainer: {
        height: '10%',
    },
    cardContainer: {
        maxHeight: '80%',
        overflow: 'auto',
    },
    backIcon: {
        marginRight: '10px',
        width: '50px'
    },
}));

const RequestPage = (props) => {
    const classes = useStyles();
    const [requestList, setRequestList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const backend = defaultAPIURL;

    const appendUserAndProject = async (id_request, id_user, id_project) => {
        const user = await axios.get(backend + "/user/" + id_user);
        const project = await axios.get(backend + "/project/" + id_project);
        const profilePic = await axios.get(backend + "/user/" + id_user + "/picture");
        var requestCardData = {
            requestId: id_request,
            user: {
                name: user.data.data.full_name,
                id: id_user
            },
            project: {
                name: project.data.data.name,
                id: id_project
            }
        };
        if (profilePic.data.data[0] == undefined) {
            requestCardData.profilePic = "";
        } else {
            requestCardData.profilePic = backend + "/" + profilePic.data.data[0].picturepath;
        }
        return requestCardData;
    };

    const getAllRequest = async () => {
        const resp = await axios.get(backend + "/request");
        if (resp.data.data){
            return Promise.all(resp.data.data.filter(function (d) {
                return d.status == "active";
            }).map(d => {
                return appendUserAndProject(d.id_request, d.id_user, d.id_project);
            }));
        }
    };

    useEffect(() => {
        getAllRequest().then(data => {
            setLoading(false);
            setRequestList(data);
        });
    }, []);


    return (
        <Authenticated>
                <Grid container className={classes.fullHeightVH} justify="center" spacing={6}>
                    <Grid item md={2} xs={12} className={classes.fullHeightPer} >
                        <AdminCard username="User name" points={1} location={props.location} />
                    </Grid>
                    <Grid container item md={7} xs={12} className={classes.fullHeightPer + " " + classes.padding}>
                        <Grid item container alignItems='center' xs={12} className={classes.requestTextContainer}>
                            <Typography variant="h4"><ArrowBack className={classes.backIcon} />Request</Typography>
                        </Grid>
                        <Grid container alignItems='flex-start' justify='flex-start'
                            className={classes.fullHeightPer + " " + classes.cardContainer} item xs={12}>
                            {
                                isLoading ? (
                                    <CircularProgress />
                                ) : (
                                        requestList && requestList.map((req) =>
                                            (
                                                <Grid item xs={12} className={classes.requestCard}>
                                                    <RequestCard requestId={req.requestId} user={req.user} project={req.project} profilePic={req.profilePic} />
                                                </Grid>
                                            )
                                        )
                                    )
                            }
                        </Grid>
                    </Grid>
                </Grid>
        </Authenticated>
    );
};

export default RequestPage;
