import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DobIcon, LocationIcon } from "../assets/MUI/icons";
import { updateProfilePic } from "../firebase-calls";
import useUploadImg from "../hooks/useUploadImg";

const ProfileModal = () => {
  const { firstname, lastname, dob, country, profilePicURL } = useSelector(
    (state) => state.user.profileData
  );
  const userId = useSelector((state) => state.auth.userId);
  const [profileImg, setprofileImg] = useState(null);
  const { imgURL } = useUploadImg(profileImg);

  useEffect(() => {
    if (imgURL) {
      updateProfilePic(userId, imgURL);
    }
  }, [imgURL, userId]);

  return (
    <Box flex={1} p={2} position="relative" top={-100} sx={{ ml: 6 }}>
      <Card sx={{ maxWidth: 300, borderRadius: "20px" }} elevation={8}>
        <Box
          p={2}
          sx={{ width: "50%", height: 100, display: "block", margin: "auto" }}
        >
          <IconButton aria-label="upload picture" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(event) => {
                setprofileImg(event.target.files[0]);
              }}
            />
            <Avatar
              src={imgURL || profilePicURL}
              alt={firstname}
              sx={{
                width: 100,
                height: 100,
              }}
            />
          </IconButton>
        </Box>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontWeight: "bold", pt: 2 }}
          >
            {firstname + " " + lastname}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            "Add a Bio"
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <LocationIcon />
            <Typography>{country}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <DobIcon />
            <Typography>{dob}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileModal;
