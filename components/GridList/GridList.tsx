import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    display: "grid",
    gridGap: "15px",
    gridTemplateColumns: "repeat(auto-fill, minmax(164px, 1fr))",
  },
  title: {
    paddingTop: "15px",
    paddingBottom: "15px",
  },
});

export const GridList: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.list}>{children && children}</div>;
};
