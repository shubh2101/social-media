import { Box, List, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import WhoToFollow from "./WhoToFollow";

const RightBar = () => {
  const users = useSelector((state) => state.users.users);
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const otherUsers = users.filter(
    (user) => user.data.userId !== loggedInUserId
  );

  return (
    <Box
      flex={1}
      p={2}
      pr={6}
      sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
    >
      <Box position="fixed">
        <Typography variant="h6" fontWeight="bold">
          Who to Follow
        </Typography>
        <List dense disablePadding>
          {otherUsers.map((user) => (
            // <FollowUser user={user.data} key={user.data.userId} />
            <WhoToFollow user={user.data} key={user.data.userId} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
