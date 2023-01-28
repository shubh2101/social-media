import { Avatar, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../assets/MUI/icons";
import { activeAction } from "../features/store/activePageSlice";
import { authActions } from "../features/store/authSlice";

const NavMenu = ({ anchorEl, open, handleClose }) => {
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const { firstname, profilePicURL } = useSelector(
    (state) => state.user.userData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(activeAction.removeIndex());
    dispatch(authActions.loggedOut());
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 8,
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
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          navigate(`/profile/${loggedInUserId}`);
        }}
      >
        <Avatar alt={firstname} src={profilePicURL} /> My Profile
      </MenuItem>
      <MenuItem onClick={logOutHandler}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default NavMenu;
