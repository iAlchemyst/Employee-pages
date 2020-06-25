import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1.5),
        marginBottom: 10,
        width: 250,
      },
    },
    alert: {
      margin: 10,
      padding: 10,
      justifyContent: "center",
    },
    buttonStyle: {
      backgroundColor: "rgb(0, 188, 212)",
      color: "white",
      margin: 10,
      '&:hover':{
          backgroundColor: "rgb(0, 160, 215)"
      }
    },
    homeButton: {

      textAlign: "center",
      padding: 10,
      margin: 20

    },
    formControl:{
      width: 250
    }
  }));
