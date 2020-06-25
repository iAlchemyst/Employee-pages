import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useState, useEffect } from "react";
import { Alert } from "@material-ui/lab";
import {
  Link,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core/";
import { useStyles } from "../styles";
import axios from "axios";
import { withRouter } from "react-router-dom";

const baseapi = "https://devfrontend.gscmaven.com/wmsweb/webapi/";


function RegisterForm(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    role: [],
    email: "",
    password: "",
    confirmPassword: "",
    showMessage: "* Details required. Please fill in your details",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    const AuthStr = 'clientld:175';
    axios.get(baseapi + `user/role`,  { 'headers': { 'Authorization': AuthStr } }).then((res) => {
      const role = res.data;
      console.log(role);
    }
    ).catch((error)=>{console.log(error)})
  },[]);

  const handleSubmitClick = (event) => {
    if (state.email.length > 3 && state.email.includes("@")) {
      const pwd = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;
      if (state.password.match(pwd)) {
        if (state.password === state.confirmPassword) {
          setState((prevState) => ({
            ...prevState,
            showMessage: "SignUp Successful. Redirecting to Login Page..",
          }));
          redirectToLogin();
          // sendDetailsToServer()
        } else {
          setState((prevState) => ({
            ...prevState,
            showMessage: "Password do not match with confirm password",
          }));
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          showMessage:
            "Password has atleast 1 Numeric, 1 Captital letter, 1 Special character and is of min 8 in length",
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        showMessage: "Invalid Email ID",
      }));
    }
  };

  const redirectToLogin = () => {
    props.history.push("/login");
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider>
        <div>
          {/* <AppBar
            title={() => redirectToLogin()}
            position="static"
            showMenuIconButton={false}
          /> */}
          <TextField
            required
            id="name"
            placeholder="Enter your Name"
            label="Name"
            helperText={state.eError}
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="email"
            type="email"
            placeholder="Enter your EmailID"
            label="Email"
            helperText={state.eError}
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="password"
            type="password"
            placeholder="Enter your Password"
            label="Password"
            helperText={state.pError}
            onChange={handleChange}
          />
          <br />
          <TextField
            required
            id="confirmPassword"
            type="password"
            placeholder="Enter Confirm Password"
            label="Confirm Password"
            helperText={state.pError}
            onChange={handleChange}
          />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel>Roles</InputLabel>
            <Select id="roles" onChange={handleChange}>
              <MenuItem value={10}>Engineer</MenuItem>
              <MenuItem value={20}>Manager</MenuItem>
              <MenuItem value={30}>Tester</MenuItem>
            </Select>
          </FormControl>
          <br />
          <div role="alert">
            {!state.flag && (
              <Alert severity="info" className={classes.alert}>
                {state.showMessage}
              </Alert>
            )}
          </div>
          <Button
            variant="contained"
            className={classes.buttonStyle}
            label="Sign In"
            size="medium"
            onClick={handleSubmitClick}
          >
            Sign Up
          </Button>
          <br />
          <div>
            <span>Already have an account? </span>
            <br />
            <Link
              component="button"
              variant="body1"
              onClick={() => redirectToLogin()}
            >
              Login
            </Link>
          </div>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default withRouter(RegisterForm);
