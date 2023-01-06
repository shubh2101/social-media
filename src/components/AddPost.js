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
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmojiEmotionsIcon,
  InsertPhotoIcon,
  PersonAddAlt1Icon,
} from "../assets/MUI/icons";
import { fetchPosts } from "../features/store/postSlice";
import { addPostData } from "../firebase-calls";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase-config";

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
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(null);
  const dispatch = useDispatch();
  const { firstname, lastname, username, userId, following } = useSelector(
    (state) => state.user.userData
  );
  let comments = [];

  const UploadImg = useCallback(() => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(progress);
      },
      (error) => {
        console.log(error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
        });
      }
    );
  }, [file]);

  useEffect(() => {
    file && UploadImg();
  }, [file, UploadImg]);

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
              disabled={perc !== null && perc < 100}
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
