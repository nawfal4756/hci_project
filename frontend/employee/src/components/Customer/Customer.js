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
import { BlockOutlined, CheckOutlined } from "@material-ui/icons";
import { useStyles } from "./Customer.styles";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Customer() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [blockItem, setBlockItem] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleBlockFuntion = async (customerId) => {
    try {
      setLoading(true);
      const res = await employeeRequest.put(`customers/blocked/${customerId}`);
      dispatch(
        openSnackBar({
          message: `${res.data.name} has been ${
            res.data.active ? "Activated" : "Blocked"
          }!`,
          severity: "success",
        })
      );
      setBlockItem(customerId);
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
        const res = await employeeRequest.get("/customers");
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
            Customers
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
                      <TableCell align="center">Full Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Gender</TableCell>
                      <TableCell align="center">Date of Birth</TableCell>
                      <TableCell align="center">Phone</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => {
                      const dob = new Date(item.dateOfBirth);
                      const displayDate = `${
                        dob.getMonth() + 1
                      }/${dob.getDate()}/${dob.getFullYear()}`;
                      return (
                        <TableRow key={item._id}>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">{item.email}</TableCell>
                          <TableCell align="center">{item.gender}</TableCell>
                          <TableCell align="center">{displayDate}</TableCell>
                          <TableCell align="center">{item.phone}</TableCell>
                          <TableCell align="center">
                            {item.active ? "Active" : "Blocked"}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title={item.active ? "Block" : "Unblock"}>
                              <Button
                                onClick={() => {
                                  handleBlockFuntion(item._id);
                                }}
                              >
                                {item.active ? (
                                  <BlockOutlined />
                                ) : (
                                  <CheckOutlined />
                                )}
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
                No Customers Added Yet!
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
