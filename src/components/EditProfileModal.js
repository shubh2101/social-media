import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../features/Authentication/useInput";
import Validate from "../features/Authentication/validateInput";
import { fetchProfileData } from "../features/store/userDataSlice";
import { updateUserdata } from "../firebase-calls";
import useUploadImg from "../hooks/useUploadImg";
import getCountries from "./Countries";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const EditProfileModal = ({ isOpen, closeHandler }) => {
  const {
    firstname,
    lastname,
    dob,
    country,
    profilePicURL: prevProfileURL,
    coverPicURL: prevCoverURL,
    bio,
  } = useSelector((state) => state.user.userData);

  const userId = useSelector((state) => state.auth.userId);
  const [profileImg, setprofileImg] = useState(null);
  const [coverImg, setcoverImg] = useState(null);
  const dispatch = useDispatch();

  const { imgURL: profilePicURL, percent: profilePicPercent } = useUploadImg(
    profileImg,
    prevProfileURL
  );
  const { imgURL: coverPicURL, percent: coverImgPercent } = useUploadImg(
    coverImg,
    prevCoverURL
  );

  const initialFormValues = {
    firstname,
    lastname,
    dob,
    country,
    bio,
  };

  const {
    values,
    valueChangeHandler,
    inputBlurHandler,
    countryValueHandler,
    countryBlurHandler,
  } = useInput(Validate, initialFormValues);

  const [countries, setCountries] = useState([]);
  const getAllCountries = useCallback(async () => {
    const data = await getCountries();
    setCountries(data);
  }, []);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  const updateDetailesHandler = async () => {
    const { firstname, lastname, dob, country, bio } = values;
    await updateUserdata(
      firstname,
      lastname,
      dob,
      country,
      profilePicURL,
      coverPicURL,
      bio,
      userId
    );
    dispatch(fetchProfileData(userId));
    closeHandler();
  };

  return (
    <SytledModal
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={8}>
        <Box width={500} p={3} borderRadius={5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} pb={2}>
            <Typography
              id="modal-modal-title"
              textAlign="center"
              variant="h6"
              component="h2"
            >
              Edit Profile
            </Typography>
            <Button
              color="success"
              variant="contained"
              disabled={
                profilePicPercent !== null &&
                profilePicPercent < 100 &&
                coverImgPercent !== null &&
                coverImgPercent < 100
              }
              onClick={updateDetailesHandler}
            >
              Save
            </Button>
          </Box>
          <Box>
            <IconButton aria-label="upload picture" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  setcoverImg(event.target.files[0]);
                }}
              />
              {prevCoverURL !== "" && (
                <Box
                  component="img"
                  sx={{
                    height: 150,
                    width: "100%",
                  }}
                  alt="cover photo"
                  src={coverPicURL || prevCoverURL}
                />
              )}
              {prevCoverURL === "" && (
                <Box
                  component="img"
                  sx={{
                    height: 150,
                    width: "100%",
                  }}
                  alt="cover photo"
                  src="https://wallpapercave.com/wp/wp4286413.jpg"
                />
              )}
            </IconButton>
          </Box>
          <Box p={2}>
            <IconButton aria-label="upload picture" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  setprofileImg(event.target.files[0] || prevProfileURL);
                }}
              />
              <Avatar
                src={profilePicURL || prevProfileURL}
                alt={firstname}
                sx={{
                  width: 100,
                  height: 100,
                  display: "block",
                  margin: "auto",
                }}
              />
            </IconButton>
          </Box>
          <Box gap={2} sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              type="text"
              name="firstname"
              label="First Name"
              variant="outlined"
              margin="normal"
              size="small"
              value={values.firstname}
              onChange={valueChangeHandler}
              onBlur={inputBlurHandler}
              required
            />

            <TextField
              type="text"
              name="lastname"
              label="Last Name"
              variant="outlined"
              margin="normal"
              size="small"
              value={values.lastname}
              onChange={valueChangeHandler}
              onBlur={inputBlurHandler}
              required
            />
          </Box>
          <Box>
            <TextField
              type="text"
              name="bio"
              label="Bio"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              value={values.bio}
              onChange={valueChangeHandler}
            />
          </Box>
          <TextField
            type="date"
            name="dob"
            label="Date of birth"
            variant="outlined"
            margin="normal"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
            value={values.dob}
            onChange={valueChangeHandler}
          />
          <FormControl fullWidth size="small">
            <Autocomplete
              freeSolo
              autoHighlight
              id="countries"
              name="country"
              options={countries.sort()}
              value={values.country}
              onChange={countryValueHandler}
              onBlur={countryBlurHandler}
              renderInput={(params, option) => (
                <TextField {...params} key={option} label="Country" fullWidth />
              )}
            />
          </FormControl>
        </Box>
      </Paper>
    </SytledModal>
  );
};

export default EditProfileModal;
