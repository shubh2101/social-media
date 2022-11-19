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
import {
  BookmarkBorderIcon,
  FavoriteIcon,
  ModeCommentIcon,
  MoreVertIcon,
} from "../assets/MUI/icons";
const Post = ({ post }) => {
  const { postText } = post?.data || {};
  
  return (
    <Card sx={{ marginBottom: "1em" }}>
      <CardHeader
        avatar={
          <Avatar
            alt="Jose"
            src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="José Mourinho"
        subheader="September 14, 2022"
      />
      <CardMedia
        sx={{ objectFit: "contain", maxHeight: 400 }}
        component="img"
        height="20%"
        image="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2021/10/11111531/jose-mourinho-chelsea-2005-1104x630.jpg"
        alt="Paella dish"
      />
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
        <IconButton aria-label="bookmark">
          <BookmarkBorderIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
