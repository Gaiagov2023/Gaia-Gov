import { createTheme } from "@mui/material/styles";

const themeConfig = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3C7BD5",
    },
    text: {
      primary: "#2A2A2C",
      secondary: "#D0D5DD",
      error: "#D32F2F",
    },
    background: {
      default: "#FFFFFF",
      primary: "#F4F7FD",
    },
  },
});

export default themeConfig;
