import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import useInput from "./useInput";
import validate from "./validateInput";

const SignUp = () => {
  const { values, valueChangeHandler, errors, submitHandler } = useInput(
    true,
    validate
  );

  console.log({ values });
  console.log({ errors });
  console.log(errors.lastname);
  console.log(errors.firstname);
  console.log(errors.email);
  //  const firstnameError =  errors.firstname && isTouched
  //  const lastnameError = errors.lastname && isTouched
  //  const emailError = errors.email && isTouched
  //  console.log({firstnameError})
  //  console.log({lastnameError})
  //  console.log({emailError})
  // console.log({isTouched})

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
            // onBlur={firstnameBlur}
            // required
          />
          {errors.firstname && <p>{errors.firstname}</p>}

          <TextField
            type="text"
            name="lastname"
            label="Last Name"
            variant="outlined"
            margin="normal"
            size="small"
            onChange={valueChangeHandler}
            value={values.lastname}
            // onBlur={lastnameBlur}
            // required
          />
          {errors.lastname && <p>{errors.lastname}</p>}
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
          // onBlur={emailBlur}
          // required
        />
        {errors.email && <p>{errors.email}</p>}

        <TextField
          type="date"
          label="Date of birth"
          variant="outlined"
          defaultValue="1996-01-01"
          margin="normal"
          size="small"
        />
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row defaultValue="female">
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
          <Select label="Country" defaultValue="">
            <MenuItem value={"India"}>India</MenuItem>
            <MenuItem value={"USA"}>USA</MenuItem>
            <MenuItem value={"UK"}>UK</MenuItem>
            <MenuItem value={"Brazil"}>Brazil</MenuItem>
            <MenuItem value={"Portugal"}>Portugal</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          size="small"
        />
        <TextField
          type="password"
          label="Confirm password"
          variant="outlined"
          margin="normal"
          size="small"
        />
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
