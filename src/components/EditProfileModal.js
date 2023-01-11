import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  Modal,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const EditProfileModal = ({ isOpen, closeHandler }) => {
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
            <Button color="success">Save</Button>
          </Box>
          <Box>
            <Box
              component="img"
              sx={{
                height: 150,
                width: "100%",
              }}
              alt="The house from the offer."
              src="https://wallpapercave.com/wp/wp4286413.jpg"
            />
          </Box>
          <Box p={2}>
            <Avatar
              src="https://editorial.uefa.com/resources/01de-0e7311a0c694-24ea806e4996-1000/format/wide1/jose_mourinho_wants_his_inter_side_to_follow_on_from_their_weekend_victory.jpeg?imwidth=2048"
              // alt={firstname}
              sx={{ width: 100, height: 100, display: "block", margin: "auto" }}
            />
          </Box>
          <Box gap={2} sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              type="text"
              name="firstname"
              label="First Name"
              variant="outlined"
              margin="normal"
              size="small"
              //   onChange={valueChangeHandler}
              //   value={values.firstname}
              //   onBlur={inputBlurHandler}
              required
            />

            <TextField
              type="text"
              name="lastname"
              label="Last Name"
              variant="outlined"
              margin="normal"
              size="small"
              //   onChange={valueChangeHandler}
              //   value={values.lastname}
              //   onBlur={inputBlurHandler}
              required
            />
          </Box>
          <Box>
            <TextField
              type="bio"
              name="bio"
              label="Bio"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              // onChange={valueChangeHandler}
              // value={values.email}
              // onBlur={inputBlurHandler}
            />
          </Box>
          <TextField
            type="date"
            name="dob"
            // label="Date of birth"
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
            //   onChange={valueChangeHandler}
            //   value={values.dob}
          />
          <FormControl fullWidth size="small">
            <Autocomplete
              freeSolo
              autoHighlight
              id="countries"
              name="country"
              // options={countries.sort()}
              // onChange={countryValueHandler}
              // value={values.country}
              // onBlur={countryBlurHandler}
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
