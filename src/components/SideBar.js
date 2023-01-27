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
  styled,
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
import { useContext, useEffect } from "react";
import { ColorModeContext } from "./DarkMode";
import { useNavigate } from "react-router-dom";
import { activeAction } from "../features/store/activePageSlice";

const StyledListButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,

    "& .MuiListItemText-primary": {
      fontWeight: "bold",
    },
  },
}));

const SideBar = ({ onOpen }) => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const userId = useSelector((state) => state.auth.userId);
  const selectedIndex = useSelector((state) => state.activePage.selectedIndex);
  const { firstname, lastname, profilePicURL } = useSelector(
    (state) => state.user.userData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = (event) => {
    event.preventDefault();
    dispatch(activeAction.removeIndex());
    dispatch(authActions.loggedOut());
  };
  useEffect(() => {
    // Retrieve the selectedIndex from local storage when the component is rendered
    const storedIndex = localStorage.getItem("selectedIndex");
    if (storedIndex) {
      dispatch(activeAction.selectIndex(JSON.parse(storedIndex)));
    }
  }, [dispatch]);

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
            <StyledListButton
              selected={selectedIndex === 0}
              onClick={() => {
                dispatch(activeAction.selectIndex(0));
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </StyledListButton>
          </ListItem>
          <ListItem>
            <StyledListButton
              selected={selectedIndex === 1}
              onClick={() => {
                dispatch(activeAction.selectIndex(1));
                navigate("/explore");
              }}
            >
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </StyledListButton>
          </ListItem>
          <ListItem>
            <StyledListButton
              selected={selectedIndex === 2}
              onClick={() => {
                dispatch(activeAction.selectIndex(2));
                navigate("/bookmarks");
              }}
            >
              <ListItemIcon>
                <BookmarkBorderIcon />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </StyledListButton>
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
