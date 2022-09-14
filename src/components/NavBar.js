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
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Badge>
          <Diversity1Icon />
          <Typography
            variant="h6"
            marginX="20px"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            La familia
          </Typography>
        </Badge>

        <Icons>
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
          <Avatar
            alt="Jose"
            src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
          />
        </Icons>
      </StyledToolbar>
    </AppBar>
  );
};
export default NavBar;
