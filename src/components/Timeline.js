import { Box } from "@mui/material";
import Post from "./Post";

const Timeline = ({ allPosts }) => {
  return (
    <Box flex={2} p={2}>
      {allPosts?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default Timeline;
