import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

interface IProps {
  name: string;
}

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
export const Section: FunctionComponent<IProps> = ({ name, children }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        {name}
      </Typography>
      <div className={classes.list}>{children && children}</div>
    </>
  );
};
