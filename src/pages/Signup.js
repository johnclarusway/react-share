import React from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import firebase from "../firebase/firebase.utils";
import * as Yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const signUpValidationSchema = Yup.object().shape({
  displayName: Yup.string().required("Display Name is required!!"),
  email: Yup.string().email("Invalid Email").required("Email is required!!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "5rem",
    height: "calc(100vh - 9.0625rem)",
    backgroundColor : '#bdbdbd',
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
  signUp: {
    margin: "1rem",
  },
}));

function Signup() {
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      firebase.register(values.displayName, values.email, values.password);
    },
  });
  const signupStyles = stylesFunc();

  const handleGoogleButtonClick = () => {
    firebase.useGoogleProvider();
  };

  return (
    <Container className={signupStyles.wrapper} maxWidth="sm">
      <Avatar className={signupStyles.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={signupStyles.signUp} variant="h4">
        Sign Up
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="displayName"
              label="Display Name"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("displayName")}
              error={formik.touched.displayName && formik.errors.displayName}
              helperText={
                formik.touched.displayName && formik.errors.displayName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              {...formik.getFieldProps("password")}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGoogleButtonClick}
            >
              SignUp with Google
            </Button>
          </Grid>
          {/* 
            //TODO: Add sign in text & links
            */}
        </Grid>
      </form>
    </Container>
  );
}

export default Signup;
