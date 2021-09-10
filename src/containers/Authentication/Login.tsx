import { Box, Button, Container, Paper, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import * as React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { IAuthModel } from "models/user.model";
import { login } from "store/userAccount/userAccount.actions";

import { useStyles } from "./styles";

export const Login = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const handleLogin = (authParams: IAuthModel) => {
    dispatch(login(authParams));
  };

  return (
    <Paper className={classes.root} elevation={2}>
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
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Sign in on the internal platform
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
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Paper>
  );
};
