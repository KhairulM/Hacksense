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

import Axios from "axios";
import Cookie from "universal-cookie";
import { defaultAPIURL } from 'config';

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

function ProjectForm(props) {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        loading: false,
        error: false
    });

    const handleNameChange = event => {
        setFormData({ ...formData, name: event.target.value });
    };

    const handleSummaryChange = event => {
        setFormData({ ...formData, summary: event.target.value });
    };

    const handleDetailChange = event => {
        setFormData({ ...formData, detail: event.target.value });
    };

    const handleStatusChange = event => {
        setFormData({ ...formData, status: event.target.value });
    };

      const postFormData = () => {
        return Axios({
          url: defaultAPIURL + "/project",
          data: formData,
          method: "POST"
        });
      };

      const postImageData = project => {
        return Axios({
          url: defaultAPIURL + "/project/" + project.id_project + "/image",
          data: { image:  image},
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      };

      const registerProject = async () => {
        try {
          setFormData({ ...formData, loading: true });

          const response = await postFormData();
          const response2 = await postImageData();
          console.log(response.data.data);
          console.log(response2.data.data);

          await setTimeout(async function() {
            setFormData({
              ...formData,
              id_user: response.data.data.id_user,
              loading: false
            });
          }, 3000);
        } catch (e) {
          setFormData({ ...formData, error: true });
        }
      };

    const [image, setImage] = React.useState(null);

    const handleSubmitForm = async e => {
        e.preventDefault();
        await registerProject();
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <form className={classes.noMarginPadding} onSubmit={handleSubmitForm}>
                <Grid container item xs={12} className={classes.subForm}>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="form-name"
                            label="Project name"
                            placeholder="Project A"
                            value={formData && formData.name}
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            className={classes.input}
                            variant="outlined"
                            id="form-summary"
                            label="Project Summary"
                            placeholder="Sumary"
                            value={formData && formData.summary}
                            onChange={handleSummaryChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            className={classes.input}
                            variant="outlined"
                            id="form-detail"
                            label="Project Detail"
                            placeholder="Detail"
                            value={formData && formData.detail}
                            onChange={handleDetailChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            id="form-status"
                            label="Project Status"
                            placeholder="Status"
                            value={formData && formData.status}
                            onChange={handleStatusChange}
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid
                            container
                            item
                            justify="flex-start"
                            alignItems="center"
                            className={classes.cvNameContainer}
                        >
                            <TextField
                                id="form-image"
                                label="Image Name"
                                value={image ? image.name : "Upload Image"}
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
                                    accept="image/*"
                                    className={classes.hidden}
                                    id="contained-button-file"
                                    type="file"
                                    onChange={e => {
                                        setImage(e.target.files[0]);
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
                                    Add
              </Button>
                            )}
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
}

export default withRouter(ProjectForm);
