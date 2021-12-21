import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  root: {
    padding: "1%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  text: {
    color: "black",
    textAlign: "center",
  },
  filter: {
    textAlign: "right",
    paddingRight: "10px",
  },
  select: {
    paddingBottom: "10px",
  },
  textInStock: {
    color: "green",
    textAlign: "center",
  },
  textOutStock: {
    color: "red",
    textAlign: "center",
  },
});
