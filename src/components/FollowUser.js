import { Avatar, Button, ListItemButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

const FollowUser = ({ user }) => {
  console.log(user);
  const followUserName = `${user.firstname} ${user.lastname}`;
  return (
    <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt="Reus" src="/" />
        <Typography p={2}> {followUserName}</Typography>
      </Box>
      <Button variant="contained" sx={{ borderRadius: "30px" }}>
        Follow
      </Button>
    </ListItemButton>
  );
};

export default FollowUser;
