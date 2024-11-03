import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Button, ButtonGroup } from "@mui/material";

export default function ListAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <ButtonGroup
          variant="contained"
          aria-label="Button group with a nested menu"
          sx={{
            border: "1px solid #0175d1",
            borderRadius: "4px",
            fontWeight: 400,
          }}
        >
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "#0059c3",
              },
            }}
          >
            مطب شخصی
          </Button>
          <Divider orientation="vertical" flexItem color="#0175d1" />
          <Tooltip
            title="حساب کاربری"
            sx={{ ml: 1, background: "#fff", color: "#1B35DA" }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountBoxIcon
                sx={{ width: 30, height: 30, backgroundColor: "##FBFCFC" }}
              />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>

      <Menu
        dir="ltr"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "flex",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> پروفایل
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          تنظیمات
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          خروج
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
