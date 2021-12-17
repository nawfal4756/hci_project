import React from "react";
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
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { useStyles } from "./Orders.styles";

export default function Orders() {
  const classes = useStyles();
  const data = [
    {
      orderNo: "7192-904316-4441",
      orderDate: "14/10/2000",
      total: 610.2,
      status: "Pending",
    },
  ];
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
                    return (
                      <TableRow key={order.orderNo}>
                        <TableCell align="center">{order.orderNo}</TableCell>
                        <TableCell align="center">{order.orderDate}</TableCell>
                        <TableCell align="center">Rs. {order.total}</TableCell>
                        <TableCell align="center">{order.status}</TableCell>
                        <TableCell align="center">
                          <Button>
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
      </Grid>
    </div>
  );
}
