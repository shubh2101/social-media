import { AppBar, Box, styled, Tab, Tabs, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CoverProfile from "./CoverProfile";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

const StyledTab = styled(Tab)(({ theme }) => ({
  marginLeft: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(1),
  },
}));

const MenuBar = () => {
  const [value, setValue] = useState(0);
  const { userId } = useParams();
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const path = location.pathname.split("/");
    const lastPartURL = path.at(-1);
    switch (lastPartURL) {
      case "followers":
        setValue(1);
        break;
      case "following":
        setValue(2);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

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
          sx={{ bottom: { xs: "-700px", sm: "-80px" }, zIndex: "0" }}
        >
          <StyledToolbar sx={{ flexGrow: 1 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="profile nav tabs"
              centered
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
