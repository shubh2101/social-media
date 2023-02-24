import { Box, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import FollowUser from "./FollowUser";

const Explore = () => {
  const users = useSelector((state) => state.users.users);
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const otherUsers = users.filter(
    (user) => user.data.userId !== loggedInUserId
  );

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("filter");
  const newFilterUsers = otherUsers.filter((user) => {
    const name = `${user.data.firstname} ${user.data.lastname}`;
    return searchQuery ? name.toLowerCase().includes(searchQuery) : true;
  });
  return (
    <Box flex={2} p={2} mt={4}>
      <Card
        sx={{ maxWidth: 500, p: 1, borderRadius: "10px", mt: 4 }}
        elevation={8}
      >
        <Box display="flex" justifyContent="center">
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              letterSpacing: ".25rem",
            }}
          >
            People
          </Typography>
        </Box>

        {newFilterUsers.map((user) => (
          <FollowUser user={user.data} key={user.data.userId} />
        ))}
      </Card>
    </Box>
  );
};

export default Explore;
