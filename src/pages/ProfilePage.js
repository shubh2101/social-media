import { Box, Stack } from "@mui/material";
import NavBar from "../components/NavBar";
import UserPosts from "../components/UserPosts";
import ProfileModal from "../components/ProfileModal";
import MenuBar from "../components/ProfileMenu";
import { useEffect } from "react";
import { fetchProfileData } from "../features/store/userDataSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchProfileData(userId));
  }, [userId, dispatch]);

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
