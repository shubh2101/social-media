import { CardActions, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CommentIcon } from "../../../assets/MUI/icons";

const Comment = ({comments, toggleComment}) => {
  const userId = useSelector((state) => state.auth.userId);
  const isCommented = comments?.find(
    (comment) => comment.commentedBy === userId
  );
  const commentCountColor = isCommented ? "#2196f3" : "text.secondary";

  return (
    <CardActions>
      <IconButton aria-label="comment" onClick={toggleComment}>
        <CommentIcon />
      </IconButton>
      {comments !== null && comments.length > 0 && (
        <Typography varient="body2" color={commentCountColor}>
          {comments?.length}
        </Typography>
      )}
    </CardActions>
  );
};

export default Comment
