import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          margin: "0px",
        },
      },
    },
  },
});
