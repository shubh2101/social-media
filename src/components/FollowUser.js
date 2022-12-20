import {
  Avatar,
  Box,
  Button,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StyledFollowButton } from "../assets/MUI/components/Button";
import { userActions } from "../features/store/userDataSlice";
import { updateFollowData, updateUnfollowData } from "../firebase-calls";

const FollowUser = ({ user }) => {
  const userId = useSelector((state) => state.user.userId);
  const { following } = useSelector((state) => state.user.userData);
  const followUserName = `${user.firstname} ${user.lastname}`;
  const followUserId = user.userId;
  const isFollowing = following.includes(followUserId);
  const dispatch = useDispatch();

  const followHandler = async () => {
    try {
      await updateFollowData(userId, followUserId);
      dispatch(userActions.follow(followUserId));
    } catch (error) {
      throw new Error(error);
    }
  };

  const unfollowHandler = async () => {
    try {
      await updateUnfollowData(userId, followUserId);
      dispatch(userActions.unfollow(followUserId));
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={user.firstname} src="/" />
        <Typography p={2}> {followUserName}</Typography>
      </Box>
      <StyledFollowButton
        variant="contained"
        onClick={isFollowing ? unfollowHandler : followHandler}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </StyledFollowButton>
    </ListItemButton>
  );
};

export default FollowUser;
