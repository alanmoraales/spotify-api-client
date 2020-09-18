import { FunctionComponent } from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "next/link";

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
  active?: boolean;
  onClick: Function;
  children: string;
}

export const NavButton: FunctionComponent<IProps> = ({
  active,
  onClick,
  children,
}) => {
  const classes = useStyles({ active: active });

  return (
    <Button className={classes.button} onClick={() => onClick()}>
      {children}
    </Button>
  );
};
