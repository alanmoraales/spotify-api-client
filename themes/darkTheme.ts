import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#101010",
      paper: "#202020",
    },
  },
});
