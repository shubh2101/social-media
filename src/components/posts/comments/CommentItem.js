import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const CommentItem = (props) => {
  const { text, commentedBy } = props;
  const users = useSelector((state) => state.users.users);
  const user = users.filter((user) => user.data.userId === commentedBy);
  const { firstname, lastname, profilePicURL } = user[0].data;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={firstname} src={profilePicURL} />
      </ListItemAvatar>
      <Paper sx={{ paddingX: 2, borderRadius: 4 }} elevation={24}>
        <ListItemText
          primary={`${firstname} ${lastname}`}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {text}
            </Typography>
          }
        />
      </Paper>
    </ListItem>
  );
};

export default CommentItem;
