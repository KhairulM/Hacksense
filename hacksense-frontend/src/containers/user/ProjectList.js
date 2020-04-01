import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Grid,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { Link } from 'react-router-dom';

import Authenticated from "layouts/Authenticated";

import UserCard from "components/UserCard";
import ProjectCard from "components/ProjectCard";
import Axios from "axios";
import { defaultAPIURL } from 'config';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: "bold !important",
    marginBottom: "20px"
  },
  bold: {
    fontWeight: "bold !important"
  },
  center: {
    margin: "auto",
    textAlign: "center"
  },
  cardContainer: {
    paddingTop: "20px",
    paddingBottom: "20px"
  },
  mb20: {
    marginBottom: "20px"
  },
  mb10: {
    marginBottom: "10px"
  },
  updateProfile: {
    fontSize: "10px"
  },
  projectPhoto: {
    height: "100%",
    width: "auto"
  }
}));

const UserProjectList = props => {
  const styles = useStyles();

  const [projects, setProjects] = useState({
    data: [],
    loading: true,
    error: false
  });

  const getProjectsData = async () =>
    await Axios.get(`${defaultAPIURL}project`);

  const fetchProjectData = async () => {
    try {
      setProjects({ ...projects, loading: true });
      const response = await getProjectsData();

      setTimeout(function() {
        setProjects({ ...projects, data: response.data.data, loading: false });
      }, 1000);
    } catch (e) {
      setProjects({ ...projects, error: true });
    }
  };

  useEffect(() => {
    fetchProjectData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Authenticated>
      <Grid container spacing={6} justify="center">
        <Grid item md={3} xs={12}>
          <UserCard username="User name" points={10} />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h4" className={`${styles.title}`}>
            Project
          </Typography>
          {projects.loading ? (
            <CircularProgress />
          ) : (
            projects.data && projects.data.map(({ name, summary, ...props }) => (
              <Link to={`/projects/${props.id_project}`}><ProjectCard title={name} desc={summary} /></Link> 
            ))
          )}
        </Grid>
      </Grid>
    </Authenticated>
  );
};

export default UserProjectList;
