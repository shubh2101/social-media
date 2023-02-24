import {
  Avatar,
  Box,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const FollowUser = ({ user }) => {
  const { following } = useSelector((state) => state.user.userData);
  const { firstname, lastname, profilePicURL, userId: followUserId } = user;
  const followUserName = `${firstname} ${lastname}`;
  const isFollowing = following.includes(followUserId);
  const loggedInUserId = useSelector((state) => state.auth.userId);

  const navigate = useNavigate();

  return (
    <ListItem dense>
      <ListItemButton
        onClick={() => {
          navigate(`/profile/${followUserId}`);
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={user.firstname} src={profilePicURL} />
          <Typography p={2}> {followUserName}</Typography>
        </Box>
      </ListItemButton>
      {followUserId !== loggedInUserId && (
        <FollowButton isFollowing={isFollowing} followUserId={followUserId} />
      )}
    </ListItem>
  );
};

export default FollowUser;
