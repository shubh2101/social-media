import { AppBar, Box, styled, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import {
  StyledFollowButton,
  StyledNavButton,
} from "../assets/MUI/components/Button";
import CoverProfile from "./CoverProfile";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

const MenuBar = () => {
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
            <StyledNavButton>Followers</StyledNavButton>
            <StyledNavButton>Following</StyledNavButton>
          </Box>
          <Box position="absolute" right={0}>
            <StyledFollowButton
              variant="contained"
              color="secondary"
              sx={{
                marginRight: 10,
              }}
            >
              {"Follow"}
            </StyledFollowButton>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
export default MenuBar;
