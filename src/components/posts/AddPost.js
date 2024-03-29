import {
  Avatar,
  Box,
  Button,
  CardMedia,
  CircularProgress,
  IconButton,
  Modal,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { amber } from "@mui/material/colors";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmojiEmotionsIcon,
  InsertPhotoIcon,
  PersonAddAlt1Icon,
} from "../../assets/MUI/icons";
import { fetchPosts } from "../../features/store/postSlice";
import { addPostData } from "../../firebase-calls";
import useUploadImg from "../../hooks/useUploadImg";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Icons = styled(Box)(() => ({
  alignItems: "center",
  gap: "30px",
  display: "flex",
}));

const AddPost = ({ isOpen, onClose }) => {
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { firstname, userId, following, profilePicURL } = useSelector(
    (state) => state.user.userData
  );
  const { imgURL, percent, setImgURL, isUploading } = useUploadImg(file);
  let comments = [];

  const addPostHandler = async () => {
    addPostData(postText, userId, comments, imgURL);
    dispatch(fetchPosts({ following, userId }));
    setPostText("");
    setImgURL(null);
    setFile(null);
    onClose();
  };

  const onChangeHandler = (e) => {
    setPostText(e.target.value);
  };

  return (
    <div>
      <SytledModal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={500}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography
            id="modal-modal-title"
            textAlign="center"
            variant="h6"
            component="h2"
          >
            Create Post
          </Typography>
          <Avatar alt={firstname} src={profilePicURL} />
          <TextField
            sx={{ width: "100%" }}
            margin="normal"
            id="standard-multiline-static"
            multiline
            rows={2}
            placeholder={`What's happening, ${firstname}?`}
            variant="standard"
            value={postText}
            onChange={onChangeHandler}
          />
          {isUploading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress
                variant="determinate"
                color="success"
                value={percent}
              />
            </Box>
          ) : (
            imgURL && (
              <CardMedia
                sx={{ objectFit: "contain", maxHeight: 300 }}
                component="img"
                height="20%"
                image={imgURL}
                alt={`${firstname}'s post`}
              />
            )
          )}
          <Stack
            direction="row"
            mt={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Icons>
              <IconButton aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
                <InsertPhotoIcon color="success" />
              </IconButton>
              <IconButton>
                <EmojiEmotionsIcon sx={{ color: amber[500] }} />
              </IconButton>
              <IconButton>
                <PersonAddAlt1Icon color="primary" />
              </IconButton>
            </Icons>
            <Button
              variant="contained"
              disabled={
                (percent !== null && percent < 100) || (!imgURL && !postText)
              }
              onClick={addPostHandler}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </SytledModal>
    </div>
  );
};

export default AddPost;
