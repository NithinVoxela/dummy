import { Box, Button, Container, Paper, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as React from "react";
import Helmet from "react-helmet";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { IAuthModel } from "models/user.model";
import { translationService } from "services/translation/translation.service";
import { login } from "store/userAccount/userAccount.actions";

import { useStyles } from "./styles";

export const Login = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const handleLogin = (authParams: IAuthModel) => {
    dispatch(login(authParams));
  };

  return (
    <Paper className={classes.root}>
      <Helmet title="Login" />
      <Box display="flex" flexDirection="column" height="100%" justifyContent="center">
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              userName: "",
              userPassword: ""
            }}
            validationSchema={Yup.object().shape({
              userName: Yup.string()
                .max(255)
                .required("Username is required"),
              userPassword: Yup.string()
                .max(255)
                .required("Password is required")
            })}
            onSubmit={handleLogin}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={1} display="flex" justifyContent="center">
                  <Typography color="textPrimary" variant="h2">
                    Cortexa
                  </Typography>
                </Box>
                <Box mb={2} display="flex" justifyContent="center">
                  <Typography component="h2" variant="body1" align="center">
                    Sign in to your account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.userName && errors.userName)}
                  fullWidth
                  helperText={touched.userName && errors.userName}
                  label="Username"
                  margin="normal"
                  name="userName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.userName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.userPassword && errors.userPassword)}
                  fullWidth
                  helperText={touched.userPassword && errors.userPassword}
                  label="Password"
                  margin="normal"
                  name="userPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.userPassword}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                    {translationService.getMessageTranslation("login-header-label", "Login")}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <Box className={classes.footer}>
        <Typography color="textSecondary" variant="body2">
          {" "}
          Copyright 2021 Voxela.ai{" "}
        </Typography>
        <Typography color="textSecondary" variant="body2" className={classes.separator}>
          {" "}
          |{" "}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {translationService.getMessageTranslation("privacy-policy", "Privacy Policy")}
        </Typography>
        <Typography color="textSecondary" variant="body2" className={classes.separator}>
          {" "}
          |{" "}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {translationService.getMessageTranslation("terms-of-use", "Terms Of Use")}
        </Typography>
      </Box>
    </Paper>
  );
};
