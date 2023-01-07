import {
  Avatar,
  Box,
  Button,
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
} from "../assets/MUI/icons";
import { fetchPosts } from "../features/store/postSlice";
import { addPostData } from "../firebase-calls";
import useUploadImg from "../hooks/useUploadImg";

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
  const { firstname, lastname, username, userId, following } = useSelector(
    (state) => state.user.userData
  );
  const { imgURL, percent } = useUploadImg(file);
  let comments = [];

  const addPostHandler = async () => {
    addPostData(
      postText,
      firstname,
      lastname,
      username,
      userId,
      comments,
      imgURL
    );
    dispatch(fetchPosts({ following, userId }));
    setPostText("");
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
          height={320}
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
          <Avatar
            alt={firstname}
            src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
          />
          <TextField
            sx={{ width: "100%" }}
            margin="normal"
            id="standard-multiline-static"
            multiline
            rows={6}
            placeholder={`What's happening, ${firstname}?`}
            variant="standard"
            value={postText}
            onChange={onChangeHandler}
          />
          <Stack
            direction="row"
            mb={2}
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
              disabled={percent !== null && percent < 100}
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
