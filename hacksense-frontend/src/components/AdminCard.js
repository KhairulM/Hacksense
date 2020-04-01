import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { 
  Grid, 
  Typography, 
  Card,
  CardContent,
  Avatar,
  Button,
} from '@material-ui/core';

import { StateUserContext } from 'reducers/user';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold !important',
    marginBottom: '20px',
  },
  bold: {
    fontWeight: 'bold !important'
  },
  center: {
    margin: 'auto',
    textAlign: 'center',
  },
  cardContainer: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  mb20: {
    marginBottom: '20px',  
  },
  mb5: {
    marginBottom: '5px',
  },
  ml: {
    paddingLeft: '10px',
  },
  updateProfile: {
    fontSize: '10px'
  },
  projectPhoto: {
    height: '100%',
    width: 'auto'
  },
  active: {
    borderBottom: 'solid 1px gray', 
    borderTop: 'solid 1px gray',
    color: 'secondary'
  }
}));

const AdminCard = (props) => {
  const styles = useStyles();
  const { location } = props;

  
  const userState = useContext(StateUserContext);

  return (
    <Card variant="outlined">
      <CardContent className={styles.cardContainer}>
        <Grid container align="center" justify="center">
          <Grid item xs={3} md={12} className={styles.mb20}>
            <Avatar
              className={`${styles.center}`} 
              alt="Remy Sharp" 
              src={userState.avatar && userState.avatar.picturepath} 
            />
          </Grid>
          <Grid item xs={3} md={12} className={styles.mb5}>
            <Typography className={`${styles.bold} ${styles.center}`} >
              {userState.username}
            </Typography>
          </Grid>
          <Grid item xs={3} md={12} className={styles.mb20}>
            <Typography className={styles.center}>
              {userState.points} points
            </Typography>
          </Grid>
          <Grid item xs={3} md={12} className={styles.mb20}>
            <Button variant="contained" className={`${styles.center} ${styles.updateProfile}`} size="medium">
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Grid container>
        <Grid item xs={3} md={12} className={`${styles.mb5} ${styles.ml} ${location.pathname.includes('/projects') ? styles.active: ''}`}>
          <Button fullWidth component={Link} to="/projects">Projects</Button>
        </Grid>
        <Grid item xs={3} md={12} className={`${styles.mb5} ${styles.ml} ${location.pathname.includes('/requests') ? styles.active: ''}`}>
          <Button fullWidth component={Link} to="/requests">Request</Button>
        </Grid>
        <Grid item xs={3} md={12} className={`${styles.mb5} ${styles.ml} ${location.pathname.includes('/teams') ? styles.active: ''}`}>
          <Button fullWidth component={Link} to="/teams">Teams</Button>
        </Grid>
        <Grid item xs={3} md={12} className={`${styles.mb5} ${styles.ml} ${location.pathname.includes('/finances') ? styles.active: ''}`}>
          <Button fullWidth component={Link} to="/finance">Finance</Button>
        </Grid>
      </Grid>
    </Card>
  )
};

export default AdminCard;