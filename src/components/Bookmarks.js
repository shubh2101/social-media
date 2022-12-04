import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookmarks } from "../firebase-calls";
import Post from "./Post";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const posts = useSelector((state) => state.post.posts);
  const userId = useSelector((state) => state.user.userId);

  const getAllBookmarks = useCallback(async (userId) => {
    let data = await getBookmarks(userId);
    setBookmarks(data);
  }, []);

  useEffect(() => {
    getAllBookmarks(userId);
  }, [getAllBookmarks, userId]);
  
  console.log(bookmarks)
  const bookmarksReq = posts.filter((post) => {
    return bookmarks?.some(
      (bm) => bm.postId === post.id && bm.userId === userId
    );
  });
  return (
    <Box flex={2} p={2}>
      {bookmarksReq?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Bookmarks;
