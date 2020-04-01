import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core'

import SignUpType from '../../components/SignUpType';

const useStyles = makeStyles(theme => ({
  fullHeightVH: {
    height: '100vh'
  },
  fullHeightPer: {
    height: '100%'
  },
  primary: {
    backgroundColor: '#f50057'
  },
  signUpBox: {
    height: '30%',
    width: '50%',
  },
  choice: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(2),
    paddingLeft: 0
  }
}));

function SignUpChoice() {
  const classes = useStyles();
  return (
    <Grid container className={classes.fullHeightVH}>
      <Grid item xs={2} className={[classes.fullHeightPer, classes.primary].join(' ')} />
      <Grid container
      alignItems='center'
      justify='center'
      item xs={10} className={classes.fullHeightPer}>
        <Grid container 
        justify='flex-start'
        alignItems='center'
        className={[classes.signUpBox, classes.secondary].join(' ')}>
          <Grid container alignItems='center' item xs={12}>
            <Typography variant='h3'>Signup as</Typography>
          </Grid>
          <Grid item xs={4} className={classes.choice}>
            <SignUpType type='Coder'/>
          </Grid>
          <Grid item xs={4} className={classes.choice}>
            <SignUpType type='Designer'/>
          </Grid>
          <Grid item xs={4} className={classes.choice}>
            <SignUpType type="Project Manager"/>
          </Grid>  
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SignUpChoice;
