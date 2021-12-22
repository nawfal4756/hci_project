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
import { useStyles } from "./AddProduct.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string("Enter your full name").required("Full Name is rqeuired"),
  quantityAvailable: yup
    .number()
    .positive("Quantity Available cannot be negative")
    .required("Quantity Available is required"),
  price: yup
    .number()
    .positive("Price cannot be negative")
    .required("Price is required"),
  description: yup.string("Enter Description"),
});

export default function AddProduct() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      quantityAvailable: "",
      price: "",
      productImage: "",
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
            Add A Product
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
                      id="name"
                      label="Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="quantityAvailable"
                      label="Quantity Available"
                      variant="outlined"
                      value={formik.values.quantityAvailable}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.quantityAvailable &&
                        Boolean(formik.errors.quantityAvailable)
                      }
                      helperText={
                        formik.touched.quantityAvailable &&
                        formik.errors.quantityAvailable
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="price"
                      label="Price"
                      variant="outlined"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.price && Boolean(formik.errors.price)
                      }
                      helperText={formik.touched.price && formik.errors.price}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="file"
                      label="Image Upload"
                      variant="outlined"
                      type="file"
                      required
                      onChange={(event) => {
                        formik.setFieldValue(
                          "productImage",
                          event.currentTarget.files[0]
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      type="submit"
                      fullWidth
                      className={classes.button}
                    >
                      Add Product
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
