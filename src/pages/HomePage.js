import { Box, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddPost from "../components/AddPost";
import Bookmarks from "../components/Bookmarks";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";
import Timeline from "../components/Timeline";
import { postActions } from "../features/store/postSlice";
import { getPosts } from "../firebase-calls";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const dispatch = useDispatch();

  const openHandler = () => {
    return setIsOpen(true);
  };
  const closeHandler = () => {
    return setIsOpen(false);
  };

  const getAllPosts = useCallback(async () => {
    const data = await getPosts();
    dispatch(postActions.setPosts(data));
  }, [dispatch]);

  return (
    <Box>
      <NavBar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar onOpen={openHandler} setShowBookmarks={setShowBookmarks} />
        <AddPost onClose={closeHandler} isOpen={isOpen} />
        <AddPost
          onClose={closeHandler}
          isOpen={isOpen}
          getAllPosts={getAllPosts}
        />
        {showBookmarks ? <Bookmarks /> : <Timeline getAllPosts={getAllPosts} />}
        <RightBar />
      </Stack>
    </Box>
  );
};

export default HomePage;
