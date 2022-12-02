import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import FollowUser from "./FollowUser";

const RightBar = () => {
  const users = useSelector((state) => state.users.users);
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
    >
      <Box position="fixed">
        <Typography variant="h6" fontWeight="bold">
          Followers
        </Typography>
        <List>
          <ListItem>
            <Box>
              <ListItemButton>
                <Avatar alt="Ronaldo" src="/" />
                <Typography p={2}>Eden Hazard</Typography>
              </ListItemButton>
              <ListItemButton>
                <Avatar alt="Messi" src="/" />
                <Typography p={2}></Typography>
              </ListItemButton>
            </Box>
          </ListItem>
        </List>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Who to Follow
          </Typography>
          <List>
            <ListItem>
              <Box>
                {users.map((user) => (
                  <FollowUser user={user.data} key={user.data.userId} />
                ))}
              </Box>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default RightBar;
