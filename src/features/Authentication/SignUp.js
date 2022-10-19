import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { VisibilityIcon } from "../../assets/MUI/icons";
import { VisibilityOffIcon } from "../../assets/MUI/icons";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, apiKey } from "../../firebase-config";

import useInput from "./useInput";
import validate from "./validateInput";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    values,
    errors,
    valueChangeHandler,
    inputBlurHandler,
    // submitHandler,
    passwordShow,
    passwordShowHandler,
    confirmPassShow,
    confirmPassShowHandler,
  } = useInput(validate);

  // console.log({ values });
  // console.log({ errors });

  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "users"), {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        dob: values.dob,
        gender: values.gender,
        country: values.country,
      });
      console.log("doc send");
      console.log("The new ID is: " + docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        returnSecureToken: true,
      }),
    }).then((response) => {
      if (response.ok) {
        navigate("/");
        return response.json();
      } else {
        return response.json().then((data) => {
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage);
        });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={submitHandler}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        p={3}
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
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
          <InputLabel textalign="center">Country</InputLabel>
          <Select
            label="Country"
            name="country"
            onChange={valueChangeHandler}
            value={values.country}
            onBlur={inputBlurHandler}
          >
            <MenuItem value={"India"}>India</MenuItem>
            <MenuItem value={"USA"}>USA</MenuItem>
            <MenuItem value={"UK"}>UK</MenuItem>
            <MenuItem value={"Brazil"}>Brazil</MenuItem>
            <MenuItem value={"Portugal"}>Portugal</MenuItem>
          </Select>
        </FormControl>
        {errors.country && (
          <Typography color="red">{errors.country}</Typography>
        )}

        <FormControl sx={{ mt: 3 }} fullWidth size="small">
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
            required
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

        <FormControl sx={{ mt: 3 }} fullWidth size="small">
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
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={confirmPassShowHandler} edge="end">
                  {confirmPassShow ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
          color="success"
          sx={{ mt: 3, borderRadius: 5 }}
        >
          SignUp
        </Button>
        <Typography display="flex" justifyContent="center" gap={2} mt={3}>
          Already have an account?
          <Link to="/">Log In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
