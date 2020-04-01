import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  Typography, 
  Card,
  CardContent,
  Avatar,
  Button,
} from '@material-ui/core';

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

const ProjectCard = (props) => {
  const styles = useStyles();
  const { title, desc } = props;

  return (
    <Card variant="outlined" className={styles.mb20}>
      <Grid container spacing={2}>
        <Grid item md={2} xs={12}>
          <Avatar alt="project-image" className={styles.projectPhoto} variant="square"/>
        </Grid>
        <Grid item md={10} xs={12}>
          <Typography variant="h6" className={styles.bold}>
            {title || 'Project A'}
          </Typography>
          <Typography variant="p">
            {desc || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"}
          </Typography>
        </Grid>
      </Grid>  
    </Card>
  )
};

export default ProjectCard;