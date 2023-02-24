import { Box, Card, List } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FollowUser from "../components/FollowUser";
import { fetchProfileData } from "../features/store/userDataSlice";

const FollowersFollowing = ({ connectedPeople }) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const { userId } = useParams();

  const usersReq = users.filter((user) => {
    return connectedPeople.includes(user.data.userId);
  });

  useEffect(() => {
    dispatch(fetchProfileData(userId));
  }, [userId, dispatch]);
  return (
    <Box flex={2} pt={1}>
      <Card
        sx={{
          maxWidth: 500,
          p: 2,
          borderRadius: "10px",
          mt: { xs: 2, sm: 9 },
          mx: 5,
        }}
        elevation={8}
      >
        <List dense disablePadding>
          {usersReq.map((user) => (
            <FollowUser user={user.data} key={user.data.userId} />
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default FollowersFollowing;
