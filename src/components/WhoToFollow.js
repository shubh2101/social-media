import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const WhoToFollow = ({ user }) => {
  const { following } = useSelector((state) => state.user.userData);
  const followUserName = `${user.firstname} ${user.lastname}`;
  const followUserId = user.userId;
  const isFollowing = following.includes(followUserId);
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const [isCardVisible, setIsCardVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isFollowing) {
      setTimeout(() => {
        setIsCardVisible(false);
      }, 2000);
    }
  }, [isFollowing]);

  return (
    isCardVisible && (
      <ListItem disableGutters>
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
            <ListItemAvatar>
              <Avatar alt={user.firstname} src={user.profilePicURL} />
            </ListItemAvatar>
            <Typography p={2}> {followUserName}</Typography>
          </Box>
        </ListItemButton>
        {followUserId !== loggedInUserId && (
          <FollowButton isFollowing={isFollowing} followUserId={followUserId} />
        )}
      </ListItem>
    )
  );
};

export default WhoToFollow;
