import { AppBar, Box, styled, Tab, Tabs, Toolbar } from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CoverProfile from "./CoverProfile";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

const StyledTab = styled(Tab)(({ theme }) => ({
  marginLeft: theme.spacing(10),
}));

const MenuBar = () => {
  const [value, setValue] = useState(0);
  const { userId } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <CoverProfile />
      </Box>
      <Box>
        <AppBar
          color="transparent"
          elevation={0}
          position="absolute"
          sx={{ bottom: "-80px", zIndex: "0" }}
        >
          <StyledToolbar sx={{ flexGrow: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="profile nav tabs"
              sx={{ px: 6 }}
            >
              <StyledTab
                label="Posts"
                component={Link}
                to={`/profile/${userId}`}
              />
              <StyledTab label="Followers" component={Link} to="followers" />
              <StyledTab label="Following" component={Link} to="following" />
            </Tabs>
          </StyledToolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default MenuBar;
