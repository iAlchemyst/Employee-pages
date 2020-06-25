import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useState, useEffect } from "react";
import { Link, TextField, Button } from "@material-ui/core/";
import { useStyles } from "../styles";

function Home(){
    const classes = useStyles();

    return(
        <div className={classes.homeButton}><Button variant="outlined" color="primary">
        Create Employee
      </Button>
      <hr />
      </div>
    )
}

export default Home;