import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { AppBarCustom, Image, ImageContainer } from "../styledComponent/navbar";
import useDrawer from "../hooks/useDrawer";
import { routesConstants } from "../utils/routeConstant";
import { fullRole } from "../utils/helper";

const settings = [
  { label: "Logout", icon: Logout },
];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);
  const { logout, user_info } = useAuth();
  const [isDrawerOpen] = useDrawer();
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    if (e.target.textContent === "Logout") {
      navigate(routesConstants.login.path);
      logout();
    } else if (e.target.textContent === "Profile") {
      // setDrawerOpen(false);
      navigate(routesConstants.profile.path);
    } else if (e.target.textContent === "Change Password") {
      // setDrawerOpen(false);
      navigate(routesConstants.changePassword.path);
    }
  };

  return (
    <AppBarCustom position="fixed" open={isDrawerOpen}>
      <Toolbar sx={{ width: "100%" }}>
        <ImageContainer>
          {!isDrawerOpen && (
            <Image
              alt="Gaia-logo"
              src="/static/images/logo-horizontal-black.svg"
            />
          )}
        </ImageContainer>
        <Box>
          <IconButton
            sx={{ p: 0, boxShadow: 3 }}
            onClick={handleOpenUserMenu}
            aria-controls={open ? "basic-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
          >
            <Avatar src={user_info?.profile_image} alt="G" />
          </IconButton>
          <Menu
            sx={{
              mt: "18px",
              ".MuiMenu-paper": {
                right: "16px",
                left: "auto !important",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            open={open}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="name">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography>{user_info?.name}</Typography>
                <Typography variant="caption">
                  {fullRole[user_info?.role]}
                </Typography>
              </div>
            </MenuItem>
            <Divider />
            {settings.map((setting) => (
              <MenuItem
                key={setting.label}
                selected={setting?.route === location.pathname}
                onClick={handleCloseUserMenu}
              >
                <ListItemIcon>
                  <setting.icon fontSize="small" />
                </ListItemIcon>
                <Typography textAlign="center">{setting.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBarCustom>
  );
};

export default Navbar;
