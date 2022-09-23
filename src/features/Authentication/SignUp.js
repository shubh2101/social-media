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

const SignUp = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
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
            label="First Name"
            variant="outlined"
            margin="normal"
            size="small"
          />
          <TextField
            type="text"
            label="Last Name"
            variant="outlined"
            margin="normal"
            size="small"
          />
        </Box>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
          size="small"
        />
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
          <InputLabel textAlign="center">Country</InputLabel>
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
