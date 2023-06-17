import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import API_ENDPOINT from "./apiEndpoint";
import axios from "axios";
import { useState } from "react";
import {
  logout,
  isAuthenticated,
  refreshAccessToken,
  getUserData,
  setAuthHeader,
} from "./auth";

const Validation = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(0);

  const handleSubmit = async (values) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    try {
      const response = await axios.post(
        `${API_ENDPOINT}api/individual/login/`,
        loginData
      );
      if (response.status === 200) {
        const accessToken = response.data.data.access_token;
        const refreshToken = response.data.data.refresh_token;
        // Store the tokens in local storage

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        // Set the access token in the Axios Authorization header
        setAuthHeader(accessToken);
        setSubmitted(1);
        setError("");
      } else if (response.status === 401) {
        setError("Invalid Credentials");
        setSubmitted(1);
      } else {
        setError(response.data.message);
        setSubmitted(1);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        try {
          // Attempt to refresh the access token

          await refreshAccessToken();
          // Retry the login request
          return handleSubmit(values);
        } catch (refreshError) {
          setError("An error occurred during login. Please try again.");
          setSubmitted(1);
          console.error(refreshError);
        }
      } else {
        setError("An error occurred during login. Please try again.");
        setSubmitted(1);
        console.error(err);
      }
    }
  };


  const handleLogout = () => {
    logout();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!submitted ? (
          <>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main", p: 3 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Login
            </Typography>
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={Validation}
              sx={{ mt: 3 }}
            >
              {(props) => {
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          label="Email"
                          type="Email"
                          name="email"
                          fullWidth
                          helperText={<ErrorMessage name="email" />}
                          error={props.errors.email && props.touched.email}
                          inputProps={{
                            style: {
                              height: "25px",
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          label="Password"
                          name="password"
                          type="password"
                          fullWidth
                          variant="outlined"
                          helperText={<ErrorMessage name="password" />}
                          error={
                            props.errors.password && props.touched.password
                          }
                          inputProps={{
                            style: {
                              height: "25px",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Grid
                      container
                      justifyContent="flex-end"
                      sx={{ fontSize: " 20px" }}
                    >
                      <Grid item>
                        <Link to="/signup" className="link_default">
                          Don't have an account? Sign Up
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          <>
            {error ? (
              <>
                <h3 className="text-center">Something went wrong</h3>
                <p className="text-center">please try again later</p>
              </>
            ) : (
              <>
                <h3 className="text-center">Submitted Successfully!</h3>
                <p className="text-center">hello User</p>
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Login;
