import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { DobIcon, LocationIcon } from "../assets/MUI/icons";

const ProfileModal = () => {
  return (
    <Box flex={1} p={2} position="relative" top={-100} sx={{ ml: 6 }}>
      <Card sx={{ maxWidth: 300, borderRadius: "20px" }} elevation={8}>
        <Box p={2}>
          <Avatar
            src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
            alt="profile pic"
            sx={{ width: 100, height: 100, display: "block", margin: "auto" }}
          />
        </Box>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Lionel Messi
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            "I am Lionel Messi"
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <LocationIcon />
            <Typography>{"Portugal"}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <DobIcon />
            <Typography>{"12/06/1996"}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileModal;
