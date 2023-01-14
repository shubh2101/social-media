import { Box, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import FollowUser from "./FollowUser";

const Explore = () => {
  const users = useSelector((state) => state.users.users);
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const otherUsers = users.filter(
    (user) => user.data.userId !== loggedInUserId
  );
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
      <Card
        sx={{ width: 500, p: 2, borderRadius: "20px", mt: 8 }}
        elevation={8}
      >
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, px: 4 }}
        >
          People
        </Typography>

        {otherUsers.map((user) => (
          <FollowUser user={user.data} key={user.data.userId} />
        ))}
      </Card>
    </Box>
  );
};

export default Explore;
