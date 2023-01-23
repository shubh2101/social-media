import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkBorderIcon,
  MoreVertIcon,
  BookmarkedIcon,
  CommentIcon,
} from "../../assets/MUI/icons";
import { postActions } from "../../features/store/postSlice";
import { addBookmarks, deleteBookmark } from "../../firebase-calls";
import Comments from "./comments/Comments";
import Likes from "./Likes";

const Post = ({ post }) => {
  const {
    postText,
    dateCreated,
    comments,
    imgURL,
    userId: postedById,
  } = post?.data || {};
  const postId = post?.id || {};
  const postDate = new Date(dateCreated);
  const bookmarks = useSelector((state) => state.post.bookmarks);

  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const [isCommenting, setIsCommenting] = useState(false);

  const users = useSelector((state) => state.users.users);
  const postBy = users?.find((user) => user.data.userId === postedById);
  const { firstname, lastname, profilePicURL } = postBy?.data;

  const isBookmarked = bookmarks?.find((bm) => bm.postId === post.id);

  const isCommented = comments?.find(
    (comment) => comment.commentedBy === userId
  );

  const commentCountColor = isCommented ? "#2196f3" : "text.secondary";

  const formatPostDate = (postDate) => {
    const daysPassed = Math.round(
      Math.abs((new Date() - postDate) / (1000 * 24 * 3600))
    );
    const hourPassed = Math.round(
      Math.abs((new Date() - postDate) / (1000 * 3600))
    );
    const minsPassed = Math.round(
      Math.abs((new Date() - postDate) / (1000 * 60))
    );

    if (minsPassed === 0) return "Just now";
    if (minsPassed < 60) return `${minsPassed} mins ago`;
    if (hourPassed < 24) return `${hourPassed} hr ago`;
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    const day = `${postDate.getDate()}`.padStart(2, 0);
    const month = `${postDate.getMonth()}`.padStart(2, 0);
    const year = postDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const addBookmarkHandler = async () => {
    const docId = await addBookmarks(userId, postId);
    const payload = { postId: postId, bookmarkId: docId } || {};
    dispatch(postActions.bookmark(payload));
  };

  const deleteBookmarkHandler = async () => {
    const deleteBookmarkId = await deleteBookmark(postId, userId);
    dispatch(postActions.deleteBookmark(deleteBookmarkId));
  };

  const addCommentHandler = () => {
    isCommenting ? setIsCommenting(false) : setIsCommenting(true);
  };

  return (
    <Card
      sx={{ marginBottom: "2em", borderRadius: "20px", maxWidth: 700 }}
      elevation={8}
    >
      <CardHeader
        avatar={<Avatar alt={firstname} src={profilePicURL} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={firstname + " " + lastname}
        subheader={formatPostDate(postDate)}
      />
      {imgURL && (
        <CardMedia
          sx={{ objectFit: "contain", maxHeight: 400 }}
          component="img"
          height="20%"
          image={imgURL}
          alt={`${firstname}'s post`}
        />
      )}
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {postText}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <Likes postId={postId} />
        <CardActions>
          <IconButton aria-label="comment" onClick={addCommentHandler}>
            <CommentIcon />
          </IconButton>
          {comments !== null && comments.length > 0 && (
            <Typography varient="body2" color={commentCountColor}>
              {comments?.length}
            </Typography>
          )}
        </CardActions>
        <IconButton
          aria-label="bookmark"
          onClick={isBookmarked ? deleteBookmarkHandler : addBookmarkHandler}
        >
          {isBookmarked ? (
            <BookmarkedIcon color="secondary" />
          ) : (
            <BookmarkBorderIcon />
          )}
        </IconButton>
      </CardActions>
      {isCommenting && <Comments post={post} />}
    </Card>
  );
};

export default Post;
