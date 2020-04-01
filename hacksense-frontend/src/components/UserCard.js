import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  mb10: {
    marginBottom: '10px',
  },
  updateProfile: {
    fontSize: '10px'
  },
  projectPhoto: {
    height: '100%',
    width: 'auto'
  }
}));

const UserCard = () => {
  const styles = useStyles();


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
              {userState.full_name}
            </Typography>
          </Grid>
          <Grid item xs={3} md={12} className={styles.mb20}>
            <Typography className={styles.center}>
              {userState.point} points
            </Typography>
          </Grid>
          <Grid item xs={3} md={12} className={styles.mb20}>
            <Button variant="contained" className={`${styles.center} ${styles.updateProfile}`} size="medium">
              Update Profile
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
};

export default UserCard;