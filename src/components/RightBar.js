import { Box, Button, List, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeAction } from "../features/store/activePageSlice";
import WhoToFollow from "./WhoToFollow";

const RightBar = () => {
  const users = useSelector((state) => state.users.users);
  const loggedInUserId = useSelector((state) => state.auth.userId);
  const { following } = useSelector((state) => state.user.userData);
  const otherUsers = users
    .filter(
      (user) =>
        user.data.userId !== loggedInUserId &&
        !following.includes(user.data.userId)
    )
    .slice(0, 5);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      flex={1}
      p={2}
      pr={6}
      sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
    >
      <Box position="fixed">
        <Typography variant="h6" fontWeight="bold">
          Who to Follow
        </Typography>
        <List dense disablePadding>
          {otherUsers.map((user) => (
            // <FollowUser user={user.data} key={user.data.userId} />
            <WhoToFollow user={user.data} key={user.data.userId} />
          ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color={"success"}
            onClick={() => {
              dispatch(activeAction.selectIndex(1));
              navigate("/explore");
            }}
          >
            Show More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RightBar;
