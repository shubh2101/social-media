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
import { useSelector } from "react-redux";
import { MoreVertIcon } from "../../assets/MUI/icons";
import Bookmark from "./bookmark/Bookmark";
import Comment from "./comments/Comment";
import CommentSection from "./comments/CommentSection";
import { formatDate } from "./FormatDate";
import Likes from "./likes/Likes";

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
  const [isCommenting, setIsCommenting] = useState(false);

  const users = useSelector((state) => state.users.users);
  const postBy = users?.find((user) => user.data.userId === postedById);
  const { firstname, lastname, profilePicURL } = postBy?.data;

  const toggleComment = () => {
    setIsCommenting(!isCommenting);
  };

  return (
    <Card
      sx={{ marginBottom: "2em", borderRadius: "20px", maxWidth: 600,  }}
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
        subheader={formatDate(postDate)}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {postText}
        </Typography>
      </CardContent>
      {imgURL && (
        <CardMedia
          sx={{ objectFit: "contain", maxHeight: 400 }}
          component="img"
          height="20%"
          image={imgURL}
          alt={`${firstname}'s post`}
        />
      )}
      <CardActions sx={{ justifyContent: "space-around" }}>
        <Likes postId={postId} />
        <Comment comments={comments} toggleComment={toggleComment} />
        <Bookmark postId={postId} bookmarks={bookmarks} />
      </CardActions>
      {isCommenting && <CommentSection post={post} />}
    </Card>
  );
};

export default Post;
