import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Map, ViewAgenda, People } from "@mui/icons-material";
import {
  Drawer as MainDrawer,
  DrawerHeader,
  Image,
} from "../styledComponent/navbar";
import useDrawer from "../hooks/useDrawer";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { routesConstants } from "../utils/routeConstant";

const options = [
  {
    label: "Map",
    icon: Map,
    route: "dashboard",
    role: routesConstants.dashboard.role,
  },
  {
    label: "Law Makers",
    icon: People,
    route: "lawMakers",
    role: routesConstants.lawMakers.role,
  },
  {
    label: "Agendas",
    icon: ViewAgenda,
    route: "agenda",
    role: routesConstants.agenda.role,
  },
];

const Drawer = () => {
  const [isDrawerOpen] = useDrawer();
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuth();
  return (
    <MainDrawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader>
        {isDrawerOpen && (
          <Image
            alt="Gaia-logo"
            src="/static/images/logo-horizontal-black.svg"
          />
        )}
      </DrawerHeader>
      <Divider />
      <List>
        {options
          .filter((item) => item.role.includes(role))
          .map((obj) => (
            <ListItem key={obj.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{ minHeight: 48, px: 2.5 }}
                selected={location.pathname.includes(
                  routesConstants[obj.route]?.path
                )}
                disabled={obj.disabled === true}
                onClick={() => navigate(routesConstants[obj.route]?.path)}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: isDrawerOpen ? 3 : "auto" }}
                >
                  <obj.icon />
                </ListItemIcon>
                <ListItemText
                  primary={obj.label}
                  sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </MainDrawer>
  );
};

export default Drawer;
