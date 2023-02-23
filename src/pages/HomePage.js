import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import AddPost from "../components/posts/AddPost";
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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box>
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <AddPost onClose={closeHandler} isOpen={isOpen} />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar
          onOpen={openHandler}
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        {<Outlet />}
        <RightBar />
      </Stack>
    </Box>
  );
};

export default HomePage;
