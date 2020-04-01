import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import DummyFoto from "assets/images/designstudio.png";
import Authenticated from "layouts/Authenticated";

import UserCard from "components/UserCard";
import ProjectDetailCard from "components/ProjectDetailCard";

import { defaultAPIURL } from 'config';
import Axios from "axios";

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
    marginBottom: "20px !important"
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
  },
  carouselImage: {
    borderRadius: "10px",
    height: "250px",
    margin: "auto",
    display: "block"
  },
  backIcon: {
    marginRight: "10px",
    width: "50px"
  }
}));

const UserProjectDetail = props => {
  const styles = useStyles();

  const params = props.match.params;
  const projectId = params.idProject;

  const [project, setProject] = useState({
    data: null,
    loading: true,
    error: false
  });

  const getProjectData = async id =>
    await Axios.get(`${defaultAPIURL}project/${id}`);

  const [carouselItems, setCarouselItems] = useState({ data: [] });

  const fetchProjectData = async () => {
    try {
      setProject({ ...project, loading: true });
      const response = await getProjectData(projectId);
      console.log(response.data.data);
      setTimeout(async function() {
        setProject({
          ...project,
          details: response.data.data.detail,
          name: response.data.data.name,
          loading: false
        });

        const res = await Axios.get(
          `${defaultAPIURL}project/${projectId}/image`
        );

        const items = [];

        res.data.data.map(image => {
          items.push({
            src: `${defaultAPIURL}${image.imagepath}`
          });
        });

        setCarouselItems({ data: items });
      }, 1000);
    } catch (e) {
      setProject({ ...project, error: true });
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
          <UserCard username="User name" points={1} />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h4" className={`${styles.title}`}>
            <ArrowBack className={styles.backIcon} /> Project detail
          </Typography>
          <ProjectDetailCard carouselItems={carouselItems.data}>
            <Typography
              variant="h5"
              className={`${styles.mb20} ${styles.bold}`}
            >
              {project.name}
            </Typography>
            <p className={styles.mb20}>{project.details}</p>
            <Grid item className={styles.center}>
              <Button variant="contained">Apply To Project</Button>
            </Grid>
          </ProjectDetailCard>
        </Grid>
      </Grid>
    </Authenticated>
  );
};

export default UserProjectDetail;
