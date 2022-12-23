import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookmarksData, fetchPosts } from "../features/store/postSlice";
import Post from "./Post";

const UserPosts = () => {
  const { userId } = useParams();
  const posts = useSelector((state) => state.post.posts);
  const { following } = useSelector((state) => state.user.profileData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(fetchBookmarksData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPosts({ following, userId }));
    }
  }, [dispatch, userId, following]);

  const postsCurrentUser = posts.filter((post) => post.data.userId === userId);

  const sortedPosts = postsCurrentUser?.slice().sort((a, b) => {
    return (
      new Date(b.data.dateCreated).getTime() -
      new Date(a.data.dateCreated).getTime()
    );
  });

  return (
    <Box flex={2} pt={5}>
      {sortedPosts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default UserPosts;
