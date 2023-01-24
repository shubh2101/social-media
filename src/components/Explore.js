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
    <Box display="flex" justifyContent="center" alignItems="center" mt={8}>
      <Card
        sx={{ width: 500, p: 2, borderRadius: "10px", mt: 8 }}
        elevation={8}
      >
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, px: 4 }}
        >
          People
        </Typography>

        {newFilterUsers.map((user) => (
          <FollowUser user={user.data} key={user.data.userId} />
        ))}
      </Card>
    </Box>
  );
};

export default Explore;
