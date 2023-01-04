import CommentsList from "./CommentList";
import AddNewComment from "./AddNewComment";
import { Divider } from "@mui/material";

const Comments = ({ post }) => {
  return (
    <>
      <Divider variant="middle" />
      <AddNewComment post={post} />
      <CommentsList comments={post.data.comments} />
    </>
  );
};

export default Comments;
