import { CloudUploadOutlined, DrawOutlined } from "@mui/icons-material";
import { Button, Paper, styled } from "@mui/material";

export const MainContainer = styled("main", {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
  height: "calc(100vh - 116px)",
  width: "calc(100% - 65px)",
  position: "absolute",
  left: "65px",
  top: "64px",
  overflowY: "auto",
  backgroundColor: theme.palette.background.primary,
  transition: theme.transitions.create(["width", "left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawerOpen && {
    left: "240px",
    width: "calc(100% - 240px)",
    transition: theme.transitions.create(["width", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down("sm")]: {
    top: "56px",
    left: "57px",
    width: "calc(100% - 57px)",
    ...(drawerOpen && { left: "240px", width: "calc(100% - 240px)" }),
  },
}));

export const LoadingPage = styled("div")(() => ({
  backgroundImage: "url(/static/images/map_bg.png)",
  objectFit: "cover",
  position: "relative",
  height: "100%",
  width: "100%",
  top: "0px",
}));

export const Row = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const Col = styled("div")(() => ({
  margin: "10px",
  maxWidth: "400px",
  width: "100%",
  height: "250px",
}));

export const PaperBox = styled(Paper)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

export const CloudUploadIcon = styled(CloudUploadOutlined)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "48px",
}));
export const DrawIcon = styled(DrawOutlined)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "48px",
}));

export const MapContainer = styled("div")(() => ({
  width: "100%",
  height: "calc(100vh - 116px)",
  position: "relative",
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  height: "46px",
  width: "160px",
  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}));

export const DashboardButton = styled(Button)(() => ({
  fontSize: "14px",
  fontWeight: 600,
  height: "40px",
  zIndex: "1",
  position: "absolute",
}));
