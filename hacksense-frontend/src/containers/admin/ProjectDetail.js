import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import DummyFoto from 'assets/images/designstudio.png';
import Authenticated from 'layouts/Authenticated';

import AdminCard from 'components/AdminCard';
import ProjectDetailCard from 'components/ProjectDetailCard';

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
    marginBottom: '20px !important',  
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
  },
  carouselImage: {
    borderRadius: '10px',
    height: '250px',
    margin: 'auto',
    display: 'block',
  },
  backIcon: {
    marginRight: '10px',
    width: '50px'
  },
  solidBorderBottom: {
    borderBottom: 'solid 1px gray',
    marginBottom: '10px',
    borderRadius: '0px'
  },
  active: {
    borderBottom: 'none'
  }
}));

const AdminProjectDetail = (props) => {
  const styles = useStyles();

  const [selection, setSelection] = useState(0);
  const [projectData, setProjectData] = useState({data: false, loading: true, error: false});
  const [requestData, setRequestData] = useState({data: false, loading: true, error: false});
  const [accData, setAccData] = useState({data: false, loading: true, error: false});

  const carouselItems = [
    {src: DummyFoto},
    {src: DummyFoto}
  ]

  const renderDesc = (title, desc) => (
    <Fragment>
      <Typography variant="h5" className={`${styles.mb20} ${styles.bold}`} >
        {title}
      </Typography>
      <p className={styles.mb20}>
      {desc || `Lorem Ipsum is simply dummy text of the printing 
      and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown 
        printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, 
        but also the leap into electronic typesetting, remaining essentially 
        unchanged. It was popularised in the 1960s with the release of Letraset sheets 
        containing Lorem Ipsum passages, and more recently with desktop publishing 
        software like Aldus PageMaker including versions of Lorem Ipsum`}
      </p>
    </Fragment>
  )

  const renderRequest = () => <Fragment></Fragment>;
  const renderAcc = () => <Fragment></Fragment>

  return (
    <Authenticated>
      <Grid container spacing={6} justify="center">
        <Grid item md={2} xs={12}>
          <AdminCard username="User name" points={1} location={props.location} />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h4" className={`${styles.title}`}>
            <ArrowBack className={styles.backIcon} /> Project detail
          </Typography>
          <ProjectDetailCard carouselItems={carouselItems}>
            <Grid container justify="center">
              <Grid item xs={4}>
                <Button fullWidth className={selection !== 0 && styles.solidBorderBottom} onClick={(e) => setSelection(0)}>Description</Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth className={selection !== 1 && styles.solidBorderBottom} onClick={(e) => setSelection(1)}>Request</Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth className={selection !== 2 && styles.solidBorderBottom} onClick={(e) => setSelection(2)}>Accepted</Button>
              </Grid>
            </Grid>
            {selection === 0 && renderDesc('Project A')}
            {selection === 1 && renderRequest()}
            {selection === 2 && renderAcc()}
          </ProjectDetailCard>
        </Grid>
      </Grid>
    </Authenticated>
  )
};

export default AdminProjectDetail;