import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { FunctionComponent } from "react";

interface IProps {
  imageURL: string;
  title: string;
  subtitle: string;
  action: Function;
}

const useStyles = makeStyles({
  text: {
    maxHeight: "1.5em",
    overflow: "hidden",
    textAlign: "left",
  },
});

export const MediaListItem: FunctionComponent<IProps> = ({
  imageURL,
  title,
  subtitle,
  action,
}) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" button onClick={() => action()}>
      <ListItemAvatar>
        <Avatar variant="square" alt={title} src={imageURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            className={classes.text}
            variant="subtitle1"
            component="h6"
          >
            {title}
          </Typography>
        }
        secondary={
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {subtitle}
          </Typography>
        }
      />
    </ListItem>
  );
};
