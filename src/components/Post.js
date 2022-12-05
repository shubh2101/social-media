import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkBorderIcon,
  FavoriteIcon,
  ModeCommentIcon,
  MoreVertIcon,
  BookmarkedIcon,
} from "../assets/MUI/icons";
import { fetchBookmarksData } from "../features/store/postSlice";
import { addBookmarks } from "../firebase-calls";

const Post = ({ post }) => {
  const { postText, dateCreated, firstname, lastname } = post?.data || {};
  const postId = post?.id || {};
  const postDate = new Date(dateCreated);
  const bookmarks = useSelector((state) => state.post.bookmarks);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const isBookmarked = bookmarks?.find(
    (bm) => bm.postId === post.id && bm.userId === userId
  );

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
    await addBookmarks(userId, postId);
    dispatch(fetchBookmarksData(userId));
  };

  return (
    <Card sx={{ marginBottom: "1em" }}>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <ModeCommentIcon />
        </IconButton>
        <IconButton aria-label="bookmark" onClick={() => addBookmarkHandler()}>
          {isBookmarked ? <BookmarkedIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
