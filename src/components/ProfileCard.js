import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DobIcon, LocationIcon } from "../assets/MUI/icons";
import { updateProfilePic } from "../firebase-calls";
import useUploadImg from "../hooks/useUploadImg";
import EditProfileModal from "./EditProfileModal";
import FollowButton from "./FollowButton";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { firstname, lastname, dob, country, profilePicURL, bio } = useSelector(
    (state) => state.user.profileData
  );
  const [profileImg, setprofileImg] = useState(null);
  const { imgURL } = useUploadImg(profileImg);

  const { userId } = useParams();
  const { following } = useSelector((state) => state.user.userData);
  const isFollowing = following.includes(userId);
  const loggedInUserId = useSelector((state) => state.auth.userId);

  const openHandler = () => {
    return setIsOpen(true);
  };
  const closeHandler = () => {
    return setIsOpen(false);
  };

  useEffect(() => {
    if (imgURL) {
      updateProfilePic(userId, imgURL);
    }
  }, [imgURL, userId]);

  return (
    <>
      <Box
        flex={1}
        p={2}
        position="relative"
        top={-100}
        sx={{ ml: { xs: 1, sm: 4, md: 6 } }}
      >
        <Card sx={{ width: 300, borderRadius: "20px" }} elevation={8}>
          <Box
            p={2}
            sx={{
              width: "50%",
              height: 100,
              display: "block",
              margin: "auto",
            }}
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
              {bio || "Add a Bio"}
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {loggedInUserId !== userId && (
                <FollowButton isFollowing={isFollowing} followUserId={userId} />
              )}
              {loggedInUserId === userId && (
                <Button onClick={openHandler} color={"success"}>
                  Edit Profile
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <EditProfileModal
        isOpen={isOpen}
        closeHandler={closeHandler}
        openHandler={openHandler}
      />
    </>
  );
};

export default ProfileCard;
