import { MenuIcon } from "../assets/MUI/icons";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  styled,
  Toolbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./search/SearchBar";
import { useNavigate } from "react-router-dom";
import { activeAction } from "../features/store/activePageSlice";
import { useState } from "react";
import NavMenu from "./NavMenu";
import Logo from "../assets/images/logo.png";
import Logoplayer from "../assets/images/logo-player.png";

const Icons = styled(Box)(() => ({
  alignItems: "center",
  gap: "30px",
  display: "flex",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const NavBar = ({ drawerOpen, handleDrawerToggle }) => {
  const { firstname, profilePicURL } = useSelector(
    (state) => state.user.userData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      enableColorOnDark
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <StyledToolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          disableRipple
          size="small"
          sx={{ ml: { xs: 0, sm: 8 } }}
          onClick={() => {
            dispatch(activeAction.selectIndex(0));
            navigate("/home");
            if (drawerOpen) handleDrawerToggle();
          }}
        >
          <Box
            component="img"
            sx={{ height: 50, display: { xs: "none", sm: "block" } }}
            alt="Logo"
            src={Logo}
          />
          <Box
            component="img"
            sx={{ height: 50, display: { xs: "block", sm: "none" } }}
            alt="Logo"
            src={Logoplayer}
          />
        </IconButton>
        <SearchBar />
        <Icons sx={{ mr: { xs: 0, sm: 4, md: 8 } }}>
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt={firstname} src={profilePicURL} />
          </IconButton>
        </Icons>
      </StyledToolbar>
      <NavMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </AppBar>
  );
};
export default NavBar;
