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
import * as yup from "yup";
import { useStyles } from "./AddCow.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
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
  const formik = useFormik({
    initialValues: {
      milkProduced: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await employeeRequest.post("cows/milk/", values);
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
