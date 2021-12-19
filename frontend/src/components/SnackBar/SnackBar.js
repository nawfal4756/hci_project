import { IconButton, Slide, Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../../redux/snackBarRedux";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
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
        message={snackBarState.message}
        action={
          <IconButton
            onClick={() => {
              dispatch(closeSnackBar());
            }}
          >
            <Close />
          </IconButton>
        }
        TransitionComponent={SlideTransition}
      />
    </div>
  );
}
