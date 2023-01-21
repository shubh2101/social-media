import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import NoPosts from "./posts/NoPosts";
import Post from "./posts/Post";

const Timeline = () => {
  const posts = useSelector((state) => state.post.posts);
  const postStatus = useSelector((state) => state.post.status);

  const sortedPosts = posts?.slice().sort((a, b) => {
    return (
      new Date(b.data.dateCreated).getTime() -
      new Date(a.data.dateCreated).getTime()
    );
  });

  if (sortedPosts?.length === 0 && postStatus === "succeeded") {
    return <NoPosts />;
  }

  return (
    <Box flex={2} p={2}>
      {postStatus === "loading" ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        sortedPosts?.map((post) => <Post post={post} key={post.id} />)
      )}
    </Box>
  );
};

export default Timeline;
