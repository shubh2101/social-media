import { Box, Stack } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import AddPost from "../components/AddPost";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";
import Timeline from "../components/Timeline";
import { db } from "../firebase-config";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const openHandler = () => {
    return setIsOpen(true);
  };
  const closeHandler = () => {
    return setIsOpen(false);
  };

  const getPosts = async () => {
    const posts = [];
    const postData = await getDocs(collection(db, "posts"));
    postData.forEach((doc) => {
      posts.push({ data: doc.data(), id: doc.id });
    });
    setAllPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Box>
      <NavBar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <SideBar onOpen={openHandler} />
        <AddPost onClose={closeHandler} isOpen={isOpen} getPosts={getPosts} />
        <Timeline allPosts={allPosts} />
        <RightBar />
      </Stack>
    </Box>
  );
};

export default HomePage;
