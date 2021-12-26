import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Tooltip,
} from "@material-ui/core";
import {
  DeleteOutlined,
  // VisibilityOutlined
} from "@material-ui/icons";
import { useStyles } from "./Order.styles";
// import { useNavigate } from "react-router-dom";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Order() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [blockItem, setBlockItem] = useState(null);
  const classes = useStyles();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleEditFuntion = (orderId) => {
  //   navigate(`/orders/${orderId}`);
  // };

  const handleBlockFuntion = async (orderId) => {
    try {
      setLoading(true);
      const res = await employeeRequest.delete(`orders/employee/${orderId}`);
      dispatch(
        openSnackBar({
          message: res.data,
          severity: "success",
        })
      );
      setBlockItem(orderId);
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

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await employeeRequest.get("/orders");
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
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockItem]);

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
            Orders
          </Typography>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid item xs={12}>
            {data.length > 0 ? (
              <TableContainer component={Paper} className={classes.table}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Order Number</TableCell>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Amount</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => {
                      const dob = new Date(item.createdAt);
                      const displayDate = `${
                        dob.getMonth() + 1
                      }/${dob.getDate()}/${dob.getFullYear()}`;
                      return (
                        <TableRow key={item._id}>
                          <TableCell align="center">{item.orderNo}</TableCell>
                          <TableCell align="center">{displayDate}</TableCell>
                          <TableCell align="center">{item.total}</TableCell>
                          <TableCell align="center">{item.status}</TableCell>
                          <TableCell align="center">
                            {/* <Tooltip title="Show">
                              <Button
                                onClick={() => {
                                  handleEditFuntion(item._id);
                                }}
                              >
                                <VisibilityOutlined />
                              </Button>
                            </Tooltip> */}
                            <Tooltip title="Delete">
                              <Button
                                onClick={() => {
                                  handleBlockFuntion(item._id);
                                }}
                              >
                                <DeleteOutlined />
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                variant="h4"
                align="center"
                className={classes.errorText}
              >
                No Orders Added Yet!
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
