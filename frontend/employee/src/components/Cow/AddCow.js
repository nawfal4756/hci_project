import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as yup from "yup";
import { useStyles } from "./AddCow.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  dateOfBirth: yup.date().required("Date of Birth is required"),
  weight: yup
    .number()
    .positive("Weight cannot be negative")
    .required("Weight is required"),
  breed: yup.string("Enter breed").required("Breed is required"),
  status: yup.string("Enter Status").required("Status is required"),
});

export default function AddCow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      dateOfBirth: new Date(),
      weight: "",
      breed: "",
      status: "default",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await employeeRequest.post("cows", values);
        dispatch(
          openSnackBar({
            message: `${res.data.cowId} successfully added!`,
            severity: "success",
          })
        );
        setLoading(false);
        navigate("/cows");
      } catch (err) {
        setLoading(false);
        if (typeof err.response.data === "string") {
          dispatch(
            openSnackBar({ message: err.response.data, severity: "error" })
          );
        } else {
          dispatch(
            openSnackBar({
              message: "Server Error. Try Again Later",
              severity: "error",
            })
          );
        }
      }
    },
  });

  const handleDOBChange = (date) => {
    formik.setFieldValue("dateOfBirth", date);
  };
  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Add A Cow
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
              <Paper elevation={5} className={classes.paper}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-evenly"
                  alignContent="center"
                >
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="dateOfBirth"
                        label="Date of Birth"
                        format="MM/dd/yyyy"
                        variant="outlined"
                        value={formik.values.dateOfBirth}
                        onChange={handleDOBChange}
                        error={
                          formik.touched.dateOfBirth &&
                          Boolean(formik.errors.dateOfBirth)
                        }
                        helperText={
                          formik.touched.dateOfBirth &&
                          formik.errors.dateOfBirth
                        }
                        disableFuture
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="weight"
                      label="Weight"
                      variant="outlined"
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.weight && Boolean(formik.errors.weight)
                      }
                      helperText={formik.touched.weight && formik.errors.weight}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="breed"
                      label="Breed"
                      variant="outlined"
                      value={formik.values.breed}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.breed && Boolean(formik.errors.breed)
                      }
                      helperText={formik.touched.breed && formik.errors.breed}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      type="submit"
                      fullWidth
                      className={classes.button}
                    >
                      Add Cow
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
