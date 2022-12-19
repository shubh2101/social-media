import { AppBar, Box, styled, Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import CoverProfile from "./CoverProfile";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});
const StyledButton = styled(Button)({
  display: "inline-block",
  color: "white",
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
            <StyledButton sx={{ px: 7 }}>Posts</StyledButton>
            <StyledButton sx={{ px: 7 }}>Followers</StyledButton>
            <StyledButton sx={{ px: 7 }}>Following</StyledButton>
          </Box>
          <Box position="absolute" right={0}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                ":hover": {
                  bgcolor: "#cfd8dc",
                  color: "orangered",
                },
                marginRight: 10,
              }}
            >
              {"Follow"}
            </Button>
          </Box>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};
export default MenuBar;
