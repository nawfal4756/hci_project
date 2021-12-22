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
import { useStyles } from "./ModifyProduct.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditOutlined } from "@material-ui/icons";

const validationSchema = yup.object({
  name: yup.string("Enter product name").required("Product name is rqeuired"),
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

export default function ModifyProduct() {
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
        const res = await employeeRequest.get(`/products/${params.id}`);
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
    setLoading(true);
    formik.setFieldValue("name", data.name);
    formik.setFieldValue("description", data.description);
    formik.setFieldValue("quantityAvailable", data.quantityAvailable);
    formik.setFieldValue("price", data.price);
    formik.setFieldValue("productImage", data.productImage);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        const body = new FormData();
        body.append("name", values.name);
        body.append("description", values.description);
        body.append("quantityAvailable", values.quantityAvailable);
        body.append("price", values.price);
        body.append("productImage", values.productImage);
        const res = await employeeRequest.put(`/products/${params.id}`, body);
        dispatch(
          openSnackBar({
            message: `${res.data.name} updated successfully!`,
            severity: "success",
          })
        );
        setLoading(false);
        navigate("/products");
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
            Modify Product Details
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
                    <TextField
                      id="name"
                      label="Name"
                      variant="outlined"
                      disabled={!updated}
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
                      disabled={!updated}
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
                      disabled={!updated}
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
                      disabled={!updated}
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
                      disabled={!updated}
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
                    <img
                      src={`http://localhost:5000/${data.productImage}`}
                      alt={data.name}
                      className={classes.image}
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
                          Update Product
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
