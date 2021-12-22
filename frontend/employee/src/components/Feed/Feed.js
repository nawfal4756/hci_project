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
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  RemoveOutlined,
} from "@material-ui/icons";
import { useStyles } from "./Feed.styles";
import { useNavigate } from "react-router-dom";
import { employeeRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { openSnackBar } from "../../redux/snackBarRedux";

export default function Feed() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [blockItem, setBlockItem] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddFuntion = (feedId) => {
    navigate(`/feeds/add/${feedId}`);
  };

  const handleUseFuntion = (feedId) => {
    navigate(`/feeds/use/${feedId}`);
  };

  const handleEditFuntion = (feedId) => {
    navigate(`/feeds/${feedId}`);
  };

  const handleBlockFuntion = async (feedId) => {
    try {
      setLoading(true);
      const res = await employeeRequest.delete(`feeds/${feedId}`);
      dispatch(
        openSnackBar({
          message: res.data,
          severity: "success",
        })
      );
      setBlockItem(feedId);
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
        const res = await employeeRequest.get("/feeds");
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
            Feeds
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
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Description</TableCell>
                      <TableCell align="center">Quantity Available</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => {
                      return (
                        <TableRow key={item._id}>
                          <TableCell align="center">{item.name}</TableCell>
                          <TableCell align="center">
                            {item.description === "" ? "-" : item.description}
                          </TableCell>
                          <TableCell align="center">
                            {item.quantityAvailable}
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Add Feed">
                              <Button
                                onClick={() => {
                                  handleAddFuntion(item._id);
                                }}
                              >
                                <AddOutlined />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Use Feed">
                              <Button
                                onClick={() => {
                                  handleUseFuntion(item._id);
                                }}
                              >
                                <RemoveOutlined />
                              </Button>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <Button
                                onClick={() => {
                                  handleEditFuntion(item._id);
                                }}
                              >
                                <EditOutlined />
                              </Button>
                            </Tooltip>
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
                No Feeds Added Yet!
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
}
