import { CardActions, IconButton, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FavoriteBorderIcon, FavoriteIcon } from "../../../assets/MUI/icons";
import { addLikes, deleteLike, getLikes } from "../../../firebase-calls";

const Likes = ({ postId }) => {
  const [likes, setLikes] = useState(null);
  const userId = useSelector((state) => state.auth.userId);
  const isLiked = likes?.find((like) => like.userId === userId);
  const likeCountColor = isLiked ? "#e91e63" : "text.secondary";

  const addLikeHandler = async () => {
    const addLikeId = await addLikes(userId, postId);
    if (userId) {
      setLikes((prev) =>
        prev
          ? [...prev, { userId: userId, likeId: addLikeId }]
          : [{ userId: userId, likeId: addLikeId }]
      );
    }
  };
  const getAllLikes = useCallback(async () => {
    const data = await getLikes(postId);
    setLikes(data);
  }, [postId]);

  useEffect(() => {
    getAllLikes(postId);
  }, [postId, getAllLikes]);

  const deleteLikeHandler = async () => {
    const deletePostId = await deleteLike(postId, userId);
    setLikes((prev) => prev.filter((like) => like.likeId !== deletePostId));
  };

  return (
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
  );
};

export default Likes;
