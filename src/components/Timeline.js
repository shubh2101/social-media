import {
  Avatar,
  Box,
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

const Timeline = () => {
  return (
    <Box flex={3} p={2}>
      <Card sx={{marginBottom : "1em"}}>
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
          subheader="September 14, 2016"
        />
        <CardMedia
          sx={{objectFit : "contain", maxHeight: 400}}
          component="img"
          height="20%"
          image="https://d3nfwcxd527z59.cloudfront.net/content/uploads/2021/10/11111531/jose-mourinho-chelsea-2005-1104x630.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          "I am Jose Mourinho and I don't change. I arrive with all my qualities and my defects."
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: "space-around"}}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ModeCommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Card>
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
          subheader="September 14, 2016"
        />
        <CardMedia
          sx={{objectFit : "contain", maxHeight: 400 }}
          component="img"
          height="20%"
          image="https://pbs.twimg.com/media/FN0rRqJXIAI85Lf.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          Jose Mourinho in his first ChelseaFC
 press conference.
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: "space-around"}}>
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
    </Box>
  );
};

export default Timeline;
