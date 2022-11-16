import { Box } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../firebase-config";
import Post from "./Post";

const Timeline = () => {
  const [allPosts, setAllPosts] = useState(null);

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

  console.log({ allPosts });
  return (
    <Box flex={3} p={2}>
      {allPosts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Timeline;
