import { IconButton, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert as MuiAlert } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../../redux/snackBarRedux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar() {
  const snackBarState = useSelector((state) => state.snackBar);
  const dispatch = useDispatch();
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={snackBarState.open}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(closeSnackBar());
        }}
        action={
          <IconButton
            onClick={() => {
              dispatch(closeSnackBar());
            }}
          >
            <Close />
          </IconButton>
        }
      >
        <Alert severity={snackBarState.severity}>{snackBarState.message}</Alert>
      </Snackbar>
    </div>
  );
}
