import { FunctionComponent } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface StyleProps {
  active?: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    button: (props: StyleProps) => ({
      textTransform: "none",
      paddingLeft: "15px",
      paddingRight: "15px",
      backgroundColor: props.active
        ? theme.palette.action.hover
        : "transparent",
    }),
  })
);

interface IProps {
  href: string;
  active?: boolean;
  children: string;
}

export const NavButton: FunctionComponent<IProps> = ({
  href,
  active,
  children,
}) => {
  const classes = useStyles({ active: active });

  return (
    <Button className={classes.button} component="a" href={href}>
      {children}
    </Button>
  );
};
