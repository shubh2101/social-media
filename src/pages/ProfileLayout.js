import { Box, Stack } from "@mui/material";
import NavBar from "../components/NavBar";
import ProfileModal from "../components/ProfileModal";
import MenuBar from "../components/ProfileMenu";
import { useEffect } from "react";
import { fetchProfileData } from "../features/store/userDataSlice";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

const ProfileLayout = () => {
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
        <Outlet />
      </Stack>
    </Box>
  );
};

export default ProfileLayout;
