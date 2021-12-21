import React, { useEffect, useState } from "react";
import {
  Grid,
  TableContainer,
  Typography,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { useStyles } from "./Orders.styles";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Orders() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getCustomerOrders = async () => {
      try {
        setLoading(true);
        const res = await userRequest.get(`/orders/customer/${user._id}`);
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
    getCustomerOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteOrder]);

  const handleOrderDelete = async (orderId) => {
    try {
      const res = await userRequest.delete(
        `/orders/customer/${user._id}/${orderId}`
      );
      dispatch(openSnackBar({ message: res.data, severity: "success" }));
      setDeleteOrder(res);
    } catch (err) {
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

  return (
    <div>
      <Grid
        container
        spacing={2}
        alignContent="center"
        justifyContent="space-evenly"
      >
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            My Orders
          </Typography>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid item xs={12}>
            {data.length > 0 ? (
              <TableContainer component={Paper} className={classes.table}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Order Number</TableCell>
                      <TableCell align="center">Order Date</TableCell>
                      <TableCell align="center">Amount</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((order) => {
                      const createdDate = new Date(order.createdAt);
                      const displayDate = `${
                        createdDate.getMonth() + 1
                      }/${createdDate.getDate()}/${createdDate.getFullYear()}`;
                      return (
                        <TableRow key={order.orderNo}>
                          <TableCell align="center">{order.orderNo}</TableCell>
                          <TableCell align="center">{displayDate}</TableCell>
                          <TableCell align="center">
                            Rs. {order.total}
                          </TableCell>
                          <TableCell align="center">{order.status}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() => {
                                handleOrderDelete(order._id);
                              }}
                            >
                              <DeleteOutlined />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h4" align="center" className={classes.text}>
                No order placed till now!
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
