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
import * as yup from "yup";
import { useStyles } from "./AddCow.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";

const validationSchema = yup.object({
  cowId: yup.string("Enter Cow ID").required("Cow ID is required"),
  milkProduced: yup
    .number()
    .positive("Milk Produced cannot be negative")
    .required("Weight is required"),
});

export default function AddMilkProduced() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cowDetails, setCowDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      cowId: "",
      milkProduced: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await employeeRequest.post("cows/milk/", values);
        dispatch(
          openSnackBar({
            message: `${res.data.cowId} produced ${res.data.milkProduced} log added!`,
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

  useEffect(() => {
    const getCowDetails = async () => {
      try {
        setLoading(true);
        const res = employeeRequest.get("/cows/");
        setCowDetails(res.data);
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
      }
    };

    getCowDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Add Milk Produced Log
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
                    <Autocomplete
                      id="cowId"
                      options={cowDetails?.cowId}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Cow"
                          variant="outlined"
                          value={formik.values.cowId}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.cowId && Boolean(formik.errors.cowId)
                          }
                          helperText={
                            formik.touched.cowId && formik.errors.cowId
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="milkProduced"
                      label="Milk Produced"
                      variant="outlined"
                      value={formik.values.milkProduced}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.milkProduced &&
                        Boolean(formik.errors.milkProduced)
                      }
                      helperText={
                        formik.touched.milkProduced &&
                        formik.errors.milkProduced
                      }
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
