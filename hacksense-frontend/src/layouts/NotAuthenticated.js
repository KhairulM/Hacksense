import React from 'react';
import Logo from 'assets/images/codersense_logo.png'
import { HashLink as Link } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  Toolbar,
  Typography,
  Button,
  Menu as MenuIcon,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: ""
  },
  end_item: {
    flexGrow: 1
  },
  menu_button: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    backgroundColor: "white",
    marginButton: "20px"
  },
  nav_button: {
    margin: "5px",
  },
  page_link: {
    margin: "0px 10px",
    color: "#000000",
    cursor: "pointer",
    textDecoration: "none"
  },
  title: {
    cursor: "pointer",
    color: "#f50057",
    fontWeight: "bold",
    marginRight: "20px",
  },
}));

const NotAuthenticated = ({ children }) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AppBar position='sticky' className={styles.navbar}>
        <Toolbar variant="dense">
          <Link to="/">
            <img alt="CoderSense Logo" src={Logo} height="35px" style={{marginRight:"20px", cursor:"pointer"}} href="localhost:3000"/>
          </Link>
          <Typography variant="overline">
            <Link smooth to="#about-sec" style={{ textDecoration: "none" }} className={styles.page_link}>
              Who we are
            </Link>
          </Typography>
          <Typography variant="overline">
            <Link smooth to="#mission-sec" style={{ textDecoration: "none" }} className={styles.page_link}>
              Our mission              
            </Link>
          </Typography>
          <Typography variant="overline">
            <Link smooth to="#contact-sec" style={{ textDecoration: "none" }} className={styles.page_link}>
              Contact us
            </Link>
          </Typography>
          <Typography variant="subtitle1" className={styles.end_item}>
          </Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" className={styles.nav_button}>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
      { children }
    </div>
  )
};

export default NotAuthenticated;