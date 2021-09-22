/* eslint-disable complexity */
import { Typography, Grid, Breadcrumbs, Divider, Paper, Link, Box, TextField, Button } from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { NavLink as RouterNavLink } from "react-router-dom";
import * as Yup from "yup";

import { ICameraDataModel } from "models/cameraData.model";
import { translationService } from "services/translation/translation.service";
import * as actions from "store/camera/camera.actions";
import { getCamera } from "store/camera/camera.selector";
import { getRedirectTo } from "store/redirect/redirect.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

const NavLink = React.forwardRef((props, ref) => <RouterNavLink innerRef={ref} {...props} />);

interface IDispatchToProps {
  registerCameraRequest: typeof actions.registerCameraRequest;
  getCameraRequest: typeof actions.getCameraRequest;
  updateCameraRequest: typeof actions.updateCameraRequest;
}

interface IStateToProps {
  redirectTo: string;
  camera: ICameraDataModel;
}

interface IProps
  extends IStateToProps,
    IDispatchToProps,
    WithStyles<typeof styles>,
    RouteComponentProps<{ id: string }> {}

const CameraComponent: React.FC<IProps> = ({
  classes,
  getCameraRequest,
  updateCameraRequest,
  registerCameraRequest,
  redirectTo,
  camera: cameraInfo,
  match: {
    params: { id }
  }
}) => {
  const isAddMode = !id;
  const [camera, setCamera] = useState({
    name: "",
    description: "",
    cameraType: "",
    brand: "",
    model: "",
    streamUrl: "",
    passPhrase: "",
    location: "",
    installationDate: ""
  });
  useEffect(() => {
    !isAddMode && getCameraRequest({ publicId: id });
  }, [getCameraRequest, id, isAddMode]);
  useEffect(() => {
    setCamera(cameraInfo);
  }, [cameraInfo]);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  const handleRegister = (params: ICameraDataModel) => {
    if (isAddMode) {
      registerCameraRequest(params);
    } else {
      const updatedParams = {
        ...cameraInfo,
        ...params
      };
      updateCameraRequest(updatedParams);
    }
  };

  return (
    <>
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            {isAddMode ? "Add Camera" : "Edit Camera"}
          </Typography>

          <Breadcrumbs>
            <Link component={NavLink} exact to="/cameras">
              Camera List
            </Link>
            <Typography>{isAddMode ? "Add Camera" : "Edit Camera"}</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />
      <Paper className={classes.form}>
        <Formik
          className={classes.root}
          initialValues={camera}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .max(255)
              .required("Name is required"),
            description: Yup.string()
              .max(255)
              .required("Description is required"),
            cameraType: Yup.string()
              .max(255)
              .required("Camera Type is required"),
            brand: Yup.string()
              .max(255)
              .required("Brand is required"),
            model: Yup.string()
              .max(255)
              .required("Model is required"),
            // installationDate: Yup.date().required("Installation Date is required"),
            streamUrl: Yup.string().required("Stream URL is required"),
            location: Yup.string()
              .max(255)
              .required("Location is required"),
            passPhrase: Yup.string()
              .max(255)
              .required("Pass Phrase is required")
          })}
          onSubmit={handleRegister}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => {
            useEffect(() => {
              if (!isAddMode && cameraInfo?.publicId) {
                const fields = [
                  "name",
                  "description",
                  "cameraType",
                  "brand",
                  "model",
                  "streamUrl",
                  "passPhrase",
                  "location",
                  "installationDate"
                ];
                fields.forEach(field => setFieldValue(field, cameraInfo[field], false));
                setCamera(cameraInfo);
              }
            }, [cameraInfo]);
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    className={classes.textfield}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    className={classes.textfield}
                    label="Description"
                    margin="normal"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.description}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    error={Boolean(touched.cameraType && errors.cameraType)}
                    helperText={touched.cameraType && errors.cameraType}
                    className={classes.textfield}
                    label="Camera Type"
                    margin="normal"
                    name="cameraType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.cameraType}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.brand && errors.brand)}
                    helperText={touched.brand && errors.brand}
                    className={classes.textfield}
                    label="Brand"
                    margin="normal"
                    name="brand"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.brand}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    error={Boolean(touched.model && errors.model)}
                    helperText={touched.model && errors.model}
                    className={classes.textfield}
                    label="Model"
                    margin="normal"
                    name="model"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.model}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.installationDate && errors.installationDate)}
                    helperText={touched.installationDate && errors.installationDate}
                    className={classes.textfield}
                    name="installationDate"
                    label="Installation Date"
                    type="datetime-local"
                    margin="normal"
                    onChange={handleChange}
                    value={values.installationDate}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div>
                  <TextField
                    error={Boolean(touched.streamUrl && errors.streamUrl)}
                    helperText={touched.streamUrl && errors.streamUrl}
                    className={classes.textfield}
                    label="Stream Url"
                    margin="normal"
                    name="streamUrl"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.streamUrl}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                    className={classes.textfield}
                    label="Location"
                    margin="normal"
                    name="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.location}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    error={Boolean(touched.passPhrase && errors.passPhrase)}
                      helperText={touched.passPhrase && errors.passPhrase}
                      className={classes.textfield}
                      label="Pass Phrase"
                      margin="normal"
                      name="passPhrase"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.passPhrase}
                      variant="outlined"
                    />
                  </div>
                  <Box mt={2}>
                    <Button color="primary" size="large" type="submit" variant="contained" className={classes.submitButton}>
                      {isAddMode
                        ? translationService.getMessageTranslation("save-label", "Save")
                        : translationService.getMessageTranslation("update-label", "Update")}
                    </Button>
                  </Box>
                </form>
              );
            }}
          </Formik>
      </Paper>
    </>
  );
};

const mapDispatchToProps = {
  registerCameraRequest: actions.registerCameraRequest,
  getCameraRequest: actions.getCameraRequest,
  updateCameraRequest: actions.updateCameraRequest
};

const mapStateToProps = (state: IApplicationState) => ({
  camera: getCamera(state),
  redirectTo: getRedirectTo(state)
});

export const Camera = withRouter(
  withStyles(styles)(connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(CameraComponent))
);
