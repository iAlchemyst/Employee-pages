import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import { withRouter } from "react-router-dom";

function Header(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  return (
    <div>
    <MuiThemeProvider>
      <AppBar
        title={props.title || title}
        position="static"
        showMenuIconButton={false}
      />
      </MuiThemeProvider>
{/* 
      <span className="h3">{props.title || title}</span> */}
    </div>
  );
}
export default withRouter(Header);
