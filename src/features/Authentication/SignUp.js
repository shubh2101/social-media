import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { VisibilityIcon } from "../../assets/MUI/icons";
import { VisibilityOffIcon } from "../../assets/MUI/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useInput from "./useInput";
import validate from "./validateInput";
import { addUserData } from "../../firebase-calls";
import { useCallback, useEffect, useState } from "react";
import getCountries from "../../components/Countries";
import Logo from "../../assets/images/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

  const {
    values,
    errors,
    valueChangeHandler,
    inputBlurHandler,
    passwordShow,
    passwordShowHandler,
    confirmPassShow,
    confirmPassShowHandler,
    countryValueHandler,
    countryBlurHandler,
  } = useInput(validate);
  const { firstname, lastname, email, dob, country } = values;
  const followers = [];
  const following = [];
  const username = `${firstname}${lastname}`;
  let profilePicURL = "";
  let coverPicURL = "";
  let bio = "";

  const getAllCountries = useCallback(async () => {
    const data = await getCountries();
    setCountries(data);
  }, []);

  useEffect(() => {
    getAllCountries();
  }, [getAllCountries]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      navigate("/login");
      const userId = user.user.uid;
      addUserData(
        firstname,
        lastname,
        email,
        dob,
        country,
        username,
        userId,
        followers,
        following,
        coverPicURL,
        bio,
        profilePicURL
      );
    } catch (error) {
      let errorMessage = "failed to sign up !";
      if (error.message) {
        errorMessage = error.message;
      }
      alert(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <Box component="section">
      <AppBar color="transparent" elevation={0} position="absolute">
        <IconButton
          disableRipple
          size="small"
          onClick={() => {
            navigate("/");
          }}
        >
          <Box
            component="img"
            m={4}
            sx={{
              height: 40,
              width: 100,
            }}
            alt="Logo"
            src={Logo}
          />
        </IconButton>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={submitHandler}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          p={3}
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            background:
              "linear-gradient(to bottom right, transparent 0%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 0.8) 100%)",
            ":hover": { boxShadow: "10px 10px 20px #ccc" },
          }}
        >
          <Typography variant="h5" textAlign="center">
            Sign Up
          </Typography>

          <Box gap={2} sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              type="text"
              name="firstname"
              label="First Name"
              variant="outlined"
              margin="normal"
              size="small"
              onChange={valueChangeHandler}
              value={values.firstname}
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
              onChange={valueChangeHandler}
              value={values.lastname}
              onBlur={inputBlurHandler}
              required
            />
          </Box>
          <Box gap={3} sx={{ display: "flex", flexDirection: "row" }}>
            {errors.firstname && (
              <Typography color="red">{errors.firstname}</Typography>
            )}
            {errors.lastname && (
              <Typography color="red">{errors.lastname}</Typography>
            )}
          </Box>

          <TextField
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            size="small"
            onChange={valueChangeHandler}
            value={values.email}
            onBlur={inputBlurHandler}
            required
          />
          {errors.email && <Typography color="red">{errors.email}</Typography>}

          <TextField
            type="date"
            name="dob"
            label="Date of birth"
            variant="outlined"
            margin="normal"
            size="small"
            InputLabelProps={{ shrink: true }}
            onChange={valueChangeHandler}
            value={values.dob}
          />
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              row
              defaultValue="female"
              name="gender"
              onChange={valueChangeHandler}
              value={values.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth size="small">
            <Autocomplete
              freeSolo
              autoHighlight
              id="countries"
              name="country"
              options={countries.sort()}
              onChange={countryValueHandler}
              value={values.country}
              onBlur={countryBlurHandler}
              renderInput={(params, option) => (
                <TextField {...params} key={option} label="Country" />
              )}
            />
          </FormControl>
          {errors.country && (
            <Typography color="red">{errors.country}</Typography>
          )}

          <FormControl sx={{ mt: 3 }} fullWidth size="small" required>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={passwordShow ? "text" : "password"}
              name="password"
              label="Password"
              variant="outlined"
              margin="dense"
              size="small"
              onChange={valueChangeHandler}
              value={values.password}
              onBlur={inputBlurHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={passwordShowHandler} edge="end">
                    {passwordShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password && (
            <Typography color="red">{errors.password}</Typography>
          )}

          <FormControl sx={{ mt: 3 }} fullWidth size="small" required>
            <InputLabel>Confirm password</InputLabel>
            <OutlinedInput
              type={confirmPassShow ? "text" : "password"}
              name="confirmpassword"
              label="Confirm password"
              variant="outlined"
              size="small"
              onChange={valueChangeHandler}
              value={values.confirmpassword}
              onBlur={inputBlurHandler}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={confirmPassShowHandler} edge="end">
                    {confirmPassShow ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {errors.confirmpassword && (
            <Typography color="red">{errors.confirmpassword}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 5 }}
          >
            SignUp
          </Button>
          <Typography display="flex" justifyContent="center" gap={2} mt={3}>
            Already have an account?
            <Link to="/login">Log In</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
