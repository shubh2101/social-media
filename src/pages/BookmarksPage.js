import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Post from "../components/posts/Post";

const BookmarksPage = () => {
  const posts = useSelector((state) => state.post.posts);
  const bookmarks = useSelector((state) => state.post.bookmarks);

  const bookmarksReq = posts.filter((post) => {
    return bookmarks?.some((bm) => bm.postId === post.id);
  });

  return (
    <Box flex={2} p={2}>
      {bookmarksReq?.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </Box>
  );
};

export default BookmarksPage;
