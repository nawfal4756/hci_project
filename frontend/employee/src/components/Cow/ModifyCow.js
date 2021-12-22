import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import * as yup from "yup";
import { useStyles } from "./ModifyCow.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useNavigate, useParams } from "react-router-dom";
import { EditOutlined } from "@material-ui/icons";

const validationSchema = yup.object({
  dateOfBirth: yup.date().required("Date of Birth is required"),
  weight: yup
    .number()
    .positive("Weight cannot be negative")
    .required("Weight is required"),
  breed: yup.string("Enter breed").required("Breed is required"),
  status: yup.string("Enter Status").required("Status is required"),
});

export default function ModifyCow() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await employeeRequest.get(`/cows/${params.id}`);
        setData(res.data);
        setLoading(false);
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
        navigate("/cows");
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formik.setFieldValue("dateOfBirth", data.dateOfBirth);
    formik.setFieldValue("weight", data.weight);
    formik.setFieldValue("breed", data.breed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const formik = useFormik({
    initialValues: {
      dateOfBirth: data.dateOfBirth,
      weight: data.weight,
      breed: data.breed,
      status: "default",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await employeeRequest.put(`/cows/${params.id}`, values);
        dispatch(
          openSnackBar({
            message: `${res.data.cowId} updated successfully!`,
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
                  <Grid
                    item
                    xs={12}
                    container
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={() => {
                        setUpdated(true);
                      }}
                    >
                      <EditOutlined />
                      Edit
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        id="dateOfBirth"
                        label="Date of Birth"
                        format="MM/dd/yyyy"
                        variant="outlined"
                        disabled={!updated}
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
                      disabled={!updated}
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
                      disabled={!updated}
                      value={formik.values.breed}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.breed && Boolean(formik.errors.breed)
                      }
                      helperText={formik.touched.breed && formik.errors.breed}
                    />
                  </Grid>
                  {updated ? (
                    <div>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setUpdated(false);
                          }}
                          fullWidth
                          className={classes.cancelButton}
                        >
                          Cancel
                        </Button>
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
                    </div>
                  ) : null}
                </Grid>
              </Paper>
            </form>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
