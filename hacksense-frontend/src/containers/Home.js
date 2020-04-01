import React from 'react';
import 'assets/css/App.css';
import NotAuthenticated from '../layouts/NotAuthenticated';
import { HashLink as Link } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';
import Empower from 'assets/images/empower.png'
import Equip from 'assets/images/equip.png'
import Focus from 'assets/images/focus.png'
import MailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import { 
  Card,
  Typography,
  Button,
  Container,
  Grid,
  CardContent,
  CardMedia,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    padding: "20px 15px",
  },
  grid_container: {
    padding: "10vh 0"
  },
  header: {
    textAlign: "center",
    minHeight: "70vh"
  },
  tagline_title: {
    fontWeight: "bold",
    marginBottom: "5vh"
  },
  signup_button: {
    marginTop: "35px",
    fontSize: "18px",
  },
  sec_title: {
    fontWeight: "500",
    marginBottom: "15px"
  },
  contact_text: {
    textAlign: "center"
  },
  mission_list: {
    marginTop: "15px"
  },
  mission_card: {
    minHeight: "300px",
    minWidth: "200px",
    width: "250px",
    textAlign: "center"
  },
  card_image: {
    height: "200px"
  },
  footer: {
    minHeight: "30vh",
    padding: "10vh 0"
  },
  contact_details: {
    marginLeft: "15px",
    marginBottom: "10px"
  }
}));

function LandingPage() {
  const styles = useStyles();

  return (
    <NotAuthenticated>
      <Container className={styles.container}>
        <Grid container id="header" direction="column" justify="space-evenly" alignItems="center" className={` ${styles.grid_container} ${styles.header}`}>
          <Grid item xs={12}>
            <Typography variant="h2" className={styles.tagline_title}>One Stop Digital Hub.</Typography>
            <Typography variant="h5">Create and apply to awesome projects. Let's jumpstart your career here with CoderSense community</Typography>
          </Grid>
          <Grid item>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button color="secondary" variant="contained" size="large" className={styles.signup_button}>Sign Up</Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container id="about-sec" direction="column" justify="flex-start" alignItems="flex-start" className={styles.grid_container}>
          <Grid item>
            <Typography variant="h3" className={styles.sec_title}>Who we are</Typography>
          </Grid>
          <Grid items xs={10} md={7} xl={6}>
            <br/><Typography>CoderSense is a new digital hub in Bandung where digital start-ups can build their first digital product in 6 weeks via collaborating with tech and design talent in Indonesia</Typography>
            <br/><Typography>Instead of developing software by existing requirements, we actually create these requirements with real validation. Our idea is to help founders to determine proper scope, approved by our advisors and the development team. Work with developers as a solid team, focused on most important - bringing the best user experience to your customers for minimal time and cost</Typography>
          </Grid>
        </Grid>
        <Grid container id="mission-sec" justify="center" alignItems="flex-start" className={styles.grid_container}>
          <Grid item>
            <Typography variant="h3" className={styles.sec_title}>
              Our mission
            </Typography>
          </Grid>
          <Grid container direction="row" alignItems="center" justify="center" spacing={5} className={styles.mission_list}>
            <Grid item>
              <Card className={styles.mission_card}>
                <CardMedia
                  className={styles.card_image}
                  image={Empower}
                  title="Empowering"/>
                <CardContent>
                  <Typography>
                    <b>Empower students</b> that have programming or designing skills with the latest technology
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={styles.mission_card}>
                <CardMedia
                  className={styles.card_image}
                  image={Equip}
                  title="Equipping"/>
                <CardContent>
                  <Typography>
                    <b>Equipping the community</b> with the right tools and the right mindset
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card className={styles.mission_card}>
                <CardMedia
                  className={styles.card_image}
                  image={Focus}
                  title="Focus"/>
                <CardContent>
                  <Typography>
                    <b>Focusing on new trends</b> such as Remote and no-code movement
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container id="contact-sec" direction="column" justify="space-evenly" className={styles.footer}>
          <Grid item>
            <Typography variant="h3" className={styles.sec_title}>
              Contact us at
            </Typography>
          </Grid>
          <Grid item className={styles.contact_details}>
            <Typography>
              <MailIcon /> : hacksense@codersense.io
            </Typography>
          </Grid>
          <Grid item className={styles.contact_details}>
            <Typography>
              <CallIcon /> : 81315175703
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </NotAuthenticated>
  );
}

export default LandingPage;
