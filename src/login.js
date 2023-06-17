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

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

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

  const handleSubmit = (values) => {
    var formdata = new FormData();

    formdata.append("email", values.email);
    formdata.append("password", values.password);

    axios
      .post(API_ENDPOINT + "api/individual/login/", formdata, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status !== 200) {
          setError(res.message);
          setSubmitted(1);
        } else if(res.status === 401){
          setError("Invalid Credentials");
          setSubmitted(1);
        }
        else {
          setSubmitted(1);
          setError("");
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
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
                <p className="text-center">
                  hello User
                </p>
              </>
            )}
          </>
        )}
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
};

export default Login;
