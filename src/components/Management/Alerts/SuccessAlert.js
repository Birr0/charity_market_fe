import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
//import {useStyles} from "./styles.js";

export default function SuccessAlert({ message }) {
  //const classes = useStyles();
  //className={classes.root}
  return (
    <div>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {message}
      </Alert>
    </div>
  );
}
