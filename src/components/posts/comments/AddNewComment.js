import { Avatar, Button, CardActions, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../features/store/postSlice";
import { updateCommentsData } from "../../../firebase-calls";

const AddNewComment = ({ post }) => {
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { firstname, username, userId, profilePicURL } = useSelector(
    (state) => state.user.userData
  );
  const dateCreated = new Date().toLocaleString();
  const commentData = {
    commentText,
    dateCreated,
    commentedBy: userId,
    commentId: `${username}${dateCreated}`,
  };

  const addCommentHandler = async () => {
    const payload = { id: post.id, commentData: commentData };
    dispatch(postActions.addComment(payload));
    await updateCommentsData(post.id, commentData);
    setCommentText("");
  };

  return (
    <CardActions sx={{ justifyContent: "space-between", margin: 1 }}>
      <Avatar alt={firstname} src={profilePicURL} />
      <TextField
        sx={{ width: "100%", paddingX: 2 }}
        margin="dense"
        multiline
        placeholder={"Write a comment..."}
        variant="filled"
        size="small"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Button onClick={addCommentHandler}>Comment</Button>
    </CardActions>
  );
};

export default AddNewComment;
