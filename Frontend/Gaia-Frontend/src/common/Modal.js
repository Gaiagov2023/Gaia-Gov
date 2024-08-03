import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const CloseButton = styled(IconButton)(({ theme }) => ({
  top: 8,
  right: 8,
  position: "absolute",
  color: theme.palette.grey[500],
}));

const Modal = (props) => {
  const {
    open = false,
    close = false,
    title = "",
    actions = [],
    fullWidth = false,
    size = "md",
    scroll = "paper",
    disableEscapeKeyDown = false,
    sx = {},
    onClose,
    handleClose,
    children,
  } = props;
  return (
    <Dialog
      sx={sx}
      open={open}
      onClose={onClose}
      fullWidth={fullWidth}
      maxWidth={size}
      scroll={scroll}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {close && (
        <CloseButton aria-label="close" onClick={handleClose}>
          <Close />
        </CloseButton>
      )}
      <DialogContent dividers sx={{ minWidth: { xs: "200px", md: "400px" } }}>
        {children}
      </DialogContent>
      {actions?.length > 0 && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default Modal;
