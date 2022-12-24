import { Box, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AddPost from "../components/AddPost";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    return setIsOpen(true);
  };
  const closeHandler = () => {
    return setIsOpen(false);
  };

  return (
    <Box>
      <NavBar />
      <AddPost onClose={closeHandler} isOpen={isOpen} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <SideBar onOpen={openHandler} />
        {<Outlet />}
        <RightBar />
      </Stack>
    </Box>
  );
};

export default HomePage;
