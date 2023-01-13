import {
  MailIcon,
  Diversity1Icon,
  NotificationsIcon,
} from "../assets/MUI/icons";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Icons = styled(Box)(() => ({
  alignItems: "center",
  gap: "30px",
  display: "flex",
}));

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const NavBar = () => {
  const { profilePicURL } = useSelector((state) => state.user.userData);
  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <StyledToolbar>
        <Badge sx={{ px: 10, alignItems: "center" }}>
          <Diversity1Icon />
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" }, px: 4 }}
          >
            La familia
          </Typography>
        </Badge>

        <Icons sx={{ px: 10 }}>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar alt="Jose" src={profilePicURL} />
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};
export default NavBar;
