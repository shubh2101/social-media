import { AppBar, Box, styled, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { StyledNavButton } from "../assets/MUI/components/Button";
import CoverProfile from "./CoverProfile";
import FollowButton from "./FollowButton";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

const MenuBar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { following } = useSelector((state) => state.user.userData);
  const isFollowing = following.includes(userId);

  return (
    <Box position="relative">
      <CoverProfile />
      <AppBar
        color="transparent"
        elevation={0}
        position="absolute"
        sx={{ bottom: "-190px", zIndex: "0" }}
      >
        <StyledToolbar sx={{ flexGrow: 1 }}>
          <Box sx={{ ml: 6 }}>
            <StyledNavButton>Posts</StyledNavButton>
            <StyledNavButton
              onClick={() => {
                navigate(`/profile/${userId}/followers`);
              }}
            >
              Followers
            </StyledNavButton>
            <StyledNavButton
              onClick={() => {
                navigate(`/profile/${userId}/following`);
              }}
            >
              Following
            </StyledNavButton>
          </Box>
          <Box position="absolute" right={0}>
            <FollowButton isFollowing={isFollowing} followUserId={userId} />
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
export default MenuBar;
