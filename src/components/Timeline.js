import { Box } from "@mui/material";
import Post from "./Post";

const Timeline = ({ allPosts }) => {
  const sortedPosts = allPosts?.sort((a, b) => {
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
