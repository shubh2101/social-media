import { Box, Stack } from "@mui/material";
import { useState } from "react";
import AddPost from "../components/AddPost";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";
import Timeline from "../components/Timeline";

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
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar onOpen={openHandler} />
        <AddPost onClose={closeHandler} isOpen={isOpen} />
        <Timeline />
        <RightBar />
      </Stack>
    </Box>
  );
};

export default HomePage;
