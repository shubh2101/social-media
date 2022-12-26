import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkBorderIcon,
  FavoriteIcon,
  ModeCommentIcon,
  MoreVertIcon,
  BookmarkedIcon,
  FavoriteBorderIcon,
} from "../assets/MUI/icons";
import { postActions } from "../features/store/postSlice";
import {
  addBookmarks,
  addLikes,
  deleteBookmark,
  deleteLike,
  getLikes,
} from "../firebase-calls";

const Post = ({ post }) => {
  const { postText, dateCreated, firstname, lastname } = post?.data || {};
  const postId = post?.id || {};
  const postDate = new Date(dateCreated);
  const bookmarks = useSelector((state) => state.post.bookmarks);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(null);

  const isBookmarked = bookmarks?.find((bm) => bm.postId === post.id);
  const isLiked = likes?.find((like) => like.userId === userId);
  const likeCountColor = isLiked ? "#e91e63" : "text.secondary";

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

  const addLikeHandler = async () => {
    const addLikeId = await addLikes(userId, post.id);
    if (userId) {
      setLikes((prev) =>
        prev
          ? [...prev, { userId: userId, likeId: addLikeId }]
          : [{ userId: userId, likeId: addLikeId }]
      );
    }
  };
  const getAllLikes = useCallback(async () => {
    const data = await getLikes(post.id);
    setLikes(data);
  }, [post.id]);

  useEffect(() => {
    getAllLikes(post.id);
  }, [post.id, getAllLikes]);

  const deleteLikeHandler = async () => {
    const deletePostId = await deleteLike(post.id, userId);
    setLikes((prev) => prev.filter((like) => like.likeId !== deletePostId));
  };

  return (
    <Card
      sx={{ marginBottom: "2em", borderRadius: "20px", maxWidth: 700 }}
      elevation={8}
    >
      <CardHeader
        avatar={<Avatar alt={firstname} src="/" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={firstname + " " + lastname}
        subheader={formatPostDate(postDate)}
      />
      {/* <CardMedia
        sx={{ objectFit: "contain", maxHeight: 400 }}
        component="img"
        height="20%"
        image="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2021/10/11111531/jose-mourinho-chelsea-2005-1104x630.jpg"
        alt="mourinho"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postText}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-around" }}>
        <CardActions>
          <IconButton
            aria-label="add to favorites"
            onClick={isLiked ? deleteLikeHandler : addLikeHandler}
          >
            {isLiked ? (
              <FavoriteIcon
                sx={{
                  color: "#ec407a",
                }}
              />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          {likes !== null && likes.length > 0 && (
            <Typography varient="body2" color={likeCountColor}>
              {likes?.length}
            </Typography>
          )}
        </CardActions>
        <IconButton aria-label="comment">
          <ModeCommentIcon />
        </IconButton>
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
    </Card>
  );
};

export default Post;
