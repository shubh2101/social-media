import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const WhoToFollow = ({ user }) => {
  const { following } = useSelector((state) => state.user.userData);
  const followUserName = `${user.firstname} ${user.lastname}`;
  const followUserId = user.userId;
  const isFollowing = following.includes(followUserId);
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  return (
    <ListItem  disableGutters>
      <ListItemButton
        onClick={() => {
          navigate(`/profile/${followUserId}`);
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { md: "column", lg: "row" },
          }}
        >
          <ListItemAvatar>
            <Avatar alt={user.firstname} src={user.profilePicURL} />
          </ListItemAvatar>
          <Typography p={2} sx={{ display: { md: "none", lg: "block" } }}>
            {followUserName}
          </Typography>
          <Typography pt={2} sx={{ display: { md: "block", lg: "none" } }}>
            {user.lastname}
          </Typography>
        </Box>
      </ListItemButton>
      {followUserId !== loggedInUserId && (
        <FollowButton isFollowing={isFollowing} followUserId={followUserId} />
      )}
    </ListItem>
  );
};

export default WhoToFollow;
