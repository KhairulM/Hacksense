import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter } from "react-router-dom";

import { defaultAPIURL } from 'config';
import Axios from "axios";
import Cookie from "universal-cookie";

const cookie = new Cookie();

const useStyles = makeStyles(theme => ({
  noMarginPadding: {
    padding: 0,
    margin: 0
  },
  subForm: {
    height: "100%"
  },
  input: {
    width: "80%",
    marginTop: theme.spacing(4)
  },
  primary: {
    backgroundColor: "#f50057"
  },
  secondary: {
    backgroundColor: "#e67e22"
  },
  tertiary: {
    backgroundColor: "#f1c40f"
  },
  cvNameContainer: {
    width: "50%",
    marginTop: theme.spacing(4)
  },
  cvButtonContainer: {
    width: "30%",
    marginTop: theme.spacing(4)
  },
  registerContainer: {
    marginTop: theme.spacing(5),
    width: "90%"
  },
  register: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff"
  },
  hidden: {
    display: "none"
  }
}));

function SignUpForm(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [formData, setFormData] = useState({
    loading: false,
    error: false
  });

  const handleDateChange = date => {
    setSelectedDate(date);
    setFormData({ ...formData, birth_date: Date.parse(date) });
  };

  const handleFullNameChange = event => {
    setFormData({ ...formData, full_name: event.target.value });
  };

  const handleEmailChange = event => {
    setFormData({ ...formData, email: event.target.value });
  };

  const handlePhoneNumberChange = event => {
    setFormData({ ...formData, phone_number: event.target.value });
  };
  const handleIDNumberChange = event => {
    setFormData({ ...formData, ktp_number: event.target.value });
  };
  const handleAddressChange = event => {
    setFormData({ ...formData, address: event.target.value });
  };

  const handlePasswordChange = event => {
    setFormData({ ...formData, password: event.target.value });
  };

  const handleLinkedInURLChange = event => {
    setFormData({ ...formData, linkedin_url: event.target.value });
  };

  const handleUsernameChange = event => {
    setFormData({ ...formData, username: event.target.value });
  };

  const postFormData = () => {
    return Axios({
      url: `${defaultAPIURL}user`,
      data: formData,
      method: "POST"
    });
  };

  const postCVData = user => {
    return Axios({
      url: `${defaultAPIURL}user/${user.id_user}/cv`,
      data: { cv: cv },
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  };

  const register = async () => {
    try {
      setFormData({ ...formData, loading: true });

      const response = await postFormData();
      console.log(response.data.data);

      await setTimeout(async function() {
        setFormData({
          ...formData,
          id_user: response.data.data.id_user,
          loading: false
        });
        // const sa = await postCVData(response.data.data);

        console.log(formData);

        const res = await Axios({
          url: `${defaultAPIURL}auth`,
          data: { username: formData.username, password: formData.password },
          method: "POST"
        });

        cookie.set("token", res.data.data.token);
        cookie.set("type", res.data.data.type);
        cookie.set("id", res.data.data.id);

        await props.history.push("/projects");
      }, 3000);
    } catch (e) {
      setFormData({ ...formData, error: true });
    }
  };

  const [cv, setCv] = React.useState(null);

  const handleSubmitForm = async e => {
    e.preventDefault();
    await register();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
        <Grid container item xs={12} className={classes.subForm}>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-name"
              label="Full name"
              placeholder="John Doe"
              value={formData && formData.fullname}
              onChange={handleFullNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-address"
              label="Address"
              value={formData && formData.address}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              className={classes.noMarginPadding}
            >
              <KeyboardDatePicker
                className={classes.input}
                id="form-date"
                label="Date of Birth"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                variant="inline"
                inputVariant="outlined"
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-password"
              label="Password"
              type="password"
              value={formData && formData.password}
              onChange={handlePasswordChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-email"
              label="Email"
              placeholder="example@mail.com"
              value={formData && formData.email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="username"
              label="Username"
              value={formData && formData.username}
              onChange={handleUsernameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-phone"
              label="Phone Number"
              placeholder="0123456789"
              value={formData && formData.phone_number}
              onChange={handlePhoneNumberChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-linkedin"
              label="Linkedin URL"
              value={formData && formData.linkedin_url}
              onChange={handleLinkedInURLChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              className={classes.input}
              variant="outlined"
              id="form-ktp"
              label="No KTP"
              placeholder="0000000000000000"
              value={formData && formData.ktp_number}
              onChange={handleIDNumberChange}
            />
          </Grid>
          <Grid container item xs={6}>
            <Grid
              container
              item
              justify="flex-start"
              alignItems="center"
              className={classes.cvNameContainer}
            >
              <TextField
                id="form-cv"
                label="CV Name"
                value={cv ? cv.name : "Upload CV"}
                InputProps={{
                  readOnly: true
                }}
              />
            </Grid>
            <Grid
              container
              item
              justify="flex-end"
              alignItems="center"
              className={classes.cvButtonContainer}
            >
              <React.Fragment>
                <input
                  accept="application/pdf"
                  className={classes.hidden}
                  id="contained-button-file"
                  type="file"
                  onChange={e => {
                    setCv(e.target.files[0]);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="outlined" component="span">
                    Choose File
                  </Button>
                </label>
              </React.Fragment>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="flex-end"
            item
            className={classes.registerContainer}
          >
            {formData.loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                className={classes.register + " " + classes.primary}
              >
                Register
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default withRouter(SignUpForm);
