import React, { useEffect, useContext } from 'react';
import Logo from 'assets/images/codersense_logo.png'
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, 
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

import { defaultAPIURL } from 'config';
import { DispatchUserContext, StateUserContext } from 'reducers/user';
import Cookie from "universal-cookie";
import { Link } from 'react-router-dom';

const cookie = new Cookie();

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
  mb20: {
    marginBottom: '20px',
  }
}));
const Authenticated = ({ children, ...props }) => {
  const styles = useStyles();

  const userState = useContext(StateUserContext);
  const userDispatch = useContext(DispatchUserContext);
  const idUser = cookie.get('id');

  const fetchUserData = async (idUser) => {
    try {
      await userDispatch({type: 'get_user'});
      const response = await Axios({
        url: `${defaultAPIURL}user/${idUser}`,
        method: 'GET'
      })
      console.log("========",response.data);
      if (response.data) {
        console.log("asda");
        await userDispatch({type: 'get_user_success', payload: response.data.data})
      }
      console.log(userState);

      // const responseImage = await Axios({
      //   url: `${defaultAPIURL}user/${idUser}/picture`,
      //   method: 'GET'
      // })

      // if (responseImage.data) {
      //   await userDispatch({type: 'set_user_avatar', payload: responseImage.data.picture})
      // }

    } catch (e) {
      userDispatch({type: 'get_user_error', payload: e.message})
    }
  }

  useEffect(() => {
    if (idUser) {
      fetchUserData(idUser);
    } else {
      // props.history.push('/')
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser])

  return (
    <div className={styles.root}>
      <AppBar position='sticky' className={styles.navbar}>
        <Toolbar variant="dense">
          <Link to="/">
            <img alt="CoderSense Logo" src={Logo} height="35px" style={{marginRight:"20px", cursor:"pointer"}} href="localhost:3000"/>
          </Link>
          <Typography variant="subtitle1" className={styles.end_item}>
          </Typography>
          <Button variant="outlined" onClick={(e) => {cookie.remove('id'); cookie.remove('type'); cookie.remove('token'); props.history.push('/')}} color="secondary" className={styles.nav_button}>Sign Out</Button>
        </Toolbar>
      </AppBar>
      <div className={styles.mb20}></div>
      { children }
    </div>
  )
};

export default withRouter(Authenticated);