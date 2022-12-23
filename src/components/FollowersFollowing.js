import { Box, List, Paper, Typography } from "@mui/material";
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
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold" mt={8}>
          Following List
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ width: "50%", margin: "auto", marginTop: 8 }}>
        <Box>
          <List dense disablePadding>
            {usersReq.map((user) => (
              <FollowUser user={user.data} key={user.data.userId} />
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default FollowersFollowing;
