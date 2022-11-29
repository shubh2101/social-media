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
import MaterialUISwitch from "../assets/MUI/components/MuiSwitch";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../features/store/authSlice";

const SideBar = ({ onOpen }) => {
  const dispatch = useDispatch();
  const { firstname, lastname } = useSelector((state) => state.user.userData);

  const logOutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.loggedOut());
  };
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box position="fixed">
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
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
              <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} />} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ marginTop: "140px" }}>
          <ListItemButton>
            <Avatar
              alt={firstname}
              src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
            />
            <Typography p={2}>{firstname + " " + lastname}</Typography>
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
