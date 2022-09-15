import {
  Avatar,
  Box,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";

const AddPost = ({ isOpen, onClose }) => {
  const SytledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  return (
    <div>
      <SytledModal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={600}
          height={300}
          bgcolor={"white"}
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
            alt="Jose"
            src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's happening? Jose"
            variant="standard"
          />
        </Box>
      </SytledModal>
    </div>
  );
};

export default AddPost;
