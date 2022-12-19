import { Box, Divider, Stack } from "@mui/material";

import NavBar from "../components/NavBar";
import UserPosts from "../components/UserPosts";
import ProfileModal from "../components/ProfileModal";
import MenuBar from "../components/ProfileMenu";

const ProfilePage = () => {
  return (
    <Box>
      <NavBar />
      <MenuBar />
      <Stack direction="row" spacing={1} justifyContent="center">
        <ProfileModal />
        <UserPosts />
      </Stack>
    </Box>
  );
};

export default ProfilePage;
