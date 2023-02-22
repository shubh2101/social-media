import {
  MailIcon,
  Diversity1Icon,
  NotificationsIcon,
} from "../assets/MUI/icons";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./search/SearchBar";
import { useNavigate } from "react-router-dom";
import { activeAction } from "../features/store/activePageSlice";
import { useState } from "react";
import NavMenu from "./NavMenu";

const Icons = styled(Box)(() => ({
  alignItems: "center",
  gap: "30px",
  display: "flex",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const NavBar = () => {
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
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <StyledToolbar>
        <IconButton
          disableRipple
          size="small"
          sx={{ ml: 8 }}
          onClick={() => {
            dispatch(activeAction.selectIndex(0));
            navigate("/home");
          }}
        >
          <Badge sx={{ alignItems: "center" }}>
            <Diversity1Icon />
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" }, ml: 2 }}
            >
              La familia
            </Typography>
          </Badge>
        </IconButton>
        <SearchBar />
        <Icons sx={{ mr: 8 }}>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
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
