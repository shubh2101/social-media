import {
  Box,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import {
  AddCircleOutlineIcon,
  BookmarkBorderIcon,
  ExploreIcon,
  HomeIcon,
  NightlightIcon,
  LogoutIcon,
} from "../assets/MUI/icons";
import MUISwitch from "../assets/MUI/components/MuiSwitch";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../features/store/authSlice";
import { useContext } from "react";
import { ColorModeContext } from "./DarkMode";
import { useNavigate } from "react-router-dom";
import { postActions } from "../features/store/postSlice";

const SideBar = ({ onOpen }) => {
  const dispatch = useDispatch();
  const { toggleColorMode } = useContext(ColorModeContext);
  const { firstname, lastname, profilePicURL } = useSelector(
    (state) => state.user.userData
  );
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const logOutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.loggedOut());
    dispatch(postActions.resetPosts())
  };

  return (
    <Box
      flex={1}
      p={2}
      marginLeft={6}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box position="fixed">
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate("/home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/explore")}>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate("/bookmarks")}>
              <ListItemIcon>
                <BookmarkBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={onOpen}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Add Post" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={logOutHandler}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <NightlightIcon />
              </ListItemIcon>
              <FormControlLabel
                control={
                  <MUISwitch
                    sx={{ m: 1 }}
                    onClick={toggleColorMode}
                    defaultChecked
                  />
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ marginTop: "140px" }}>
          <ListItemButton
            onClick={() => {
              navigate(`/profile/${userId}`);
            }}
          >
            <Avatar alt={firstname} src={profilePicURL} />
            <Typography p={2}>{firstname + " " + lastname}</Typography>
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
