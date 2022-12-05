import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarksData } from "../features/store/postSlice";
import Post from "./Post";

const Timeline = ({ getAllPosts }) => {
  const posts = useSelector((state) => state.post.posts);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchBookmarksData(userId));
    }
  });
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const sortedPosts = posts?.slice().sort((a, b) => {
    return (
      new Date(b.data.dateCreated).getTime() -
      new Date(a.data.dateCreated).getTime()
    );
  });

  return (
    <Box flex={2} p={2}>
      {sortedPosts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Timeline;
