import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NoPosts from "./posts/NoPosts";
import Post from "./posts/Post";

const Timeline = () => {
  const posts = useSelector((state) => state.post.posts);
  const postStatus = useSelector((state) => state.post.status);
  const { userId } = useParams();

  const filterAndSortPosts = (entities, userId) => {
    let filteredPosts = entities;
    // filter current-user posts (profile-page)
    if (userId) {
      filteredPosts = entities.filter((post) => post.data.userId === userId);
    }
    // all posts (home-page)
    return filteredPosts.slice().sort((a, b) => {
      return b.data.dateCreated - a.data.dateCreated;
    });
  };

  const postsReq = filterAndSortPosts(posts, userId);

  if (postsReq?.length === 0 && postStatus === "succeeded") {
    return <NoPosts />;
  }

  return (
    <Box flex={2} p={2} pt={{ xs: 2, sm: 9 }} mx={2}>
      {postStatus !== "succeeded" ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        postsReq?.map((post) => <Post post={post} key={post.id} />)
      )}
    </Box>
  );
};

export default Timeline;
