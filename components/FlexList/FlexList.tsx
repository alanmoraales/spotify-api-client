import { FunctionComponent, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles({
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
});

export const FlexList: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const classes = useStyles();

  return <List className={classes.list}>{children}</List>;
};
