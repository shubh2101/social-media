import { List } from "@mui/material";
import CommentItem from "./CommentItem";

const CommentsList = ({ comments }) => {
  const sortedComments = comments?.slice().sort((a, b) => {
    return b.dateCreated - a.dateCreated;
  });
  return (
    <List>
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          text={comment.commentText}
          commentedBy={comment.commentedBy}
        />
      ))}
    </List>
  );
};

export default CommentsList;
