import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useState } from "react";
import { Alert } from "@material-ui/lab";
import { Link, TextField, Button } from "@material-ui/core/";
import axios from "axios";
import { useStyles } from "../styles";
import { withRouter } from "react-router-dom";

const baseapi = "https://devfrontend.gscmaven.com/wmsweb/webapi/";

function Login(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    email: "",
    password: "",
    showMessage: "Please enter details",
    eError: "",
    pError: "",
    flag: false,
  });

  const handleChange = (event) => {
    state.eError = "";
    state.pError = "";
    const { id, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (event) => {
    const pwd = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;

    if (state.email.length > 3 && state.email.includes("@")) {
      if (state.password.match(pwd)) {
        const payload = {
          email: state.email,
          password: state.password,
        };
        const AuthStr = 'clientld:175';
        axios
          .post(
            baseapi +
              `user/login?email=${payload.email}&password=${payload.password}`,{ 'headers': { 'Authorization': AuthStr } }
          )

          .then(function (response) {
            if (response.data.code === 200) {
              setState((prevState) => ({
                ...prevState,
                showMessage: "Login successful. Redirecting to home page..",
              }));
              //   redirectToHome();
              props.showError(null);
            } else if (response.data.code === 204) {
              props.showError("Username and password do not match");
            } else {
              props.showError("Username does not exists");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setState((prevState) => ({
          ...prevState,
          pError:
            "Password has atleast 1 Numeric, 1 Captital letter, 1 Special character and is of min 8 in length",
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        eError: "Please enter correct Email ID",
      }));
    }
  };

  //   const redirectToHome = () => {
  //     props.updateTitle("Home");
  //     props.history.push("/home");
  //   };
  const redirectToRegister = () => {
    props.history.push("/register");
  };

  return (
    <div className={classes.root}>
      <MuiThemeProvider>
        <div>
          <TextField
            id="email"
            type="email"
            placeholder="Enter your EmailID"
            label="Email"
            helperText={state.eError}
            onChange={handleChange}
          />
          <br />
          <TextField
            id="password"
            type="password"
            placeholder="Enter your Password"
            label="Password"
            helperText={state.pError}
            onChange={handleChange}
          />
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
            Sign In
          </Button>
          <br />
          <div className="registerMessage">
            <span>Dont have an account? </span>
            <br/>
            <Link
              component="button"
              variant="body1"
              onClick={() => redirectToRegister()}
            >
              Register
            </Link>
          </div>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default withRouter(Login);
