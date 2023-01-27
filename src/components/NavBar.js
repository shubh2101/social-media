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
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./search/SearchBar";
import { useNavigate } from "react-router-dom";
import { activeAction } from "../features/store/activePageSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <StyledToolbar>
        <IconButton
          disableRipple
          size="small"
          sx={{ ml: 8 }}
          onClick={() => {
            dispatch(activeAction.selectIndex(0));
            navigate("/");
          }}
        >
          <Badge sx={{ alignItems: "center" }}>
            <Diversity1Icon />
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" }, ml: 2 }}
            >
              La familia
            </Typography>
          </Badge>
        </IconButton>
        <SearchBar />
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
