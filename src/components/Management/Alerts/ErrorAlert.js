import React from "react";
//import {useStyles} from "./styles.js";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function ErrorAlert({ message }) {
  //const classes = useStyles();
  //className={classes.root}
  return (
    <div >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}
