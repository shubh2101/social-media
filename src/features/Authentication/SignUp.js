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
          />
          <TextField
            type="text"
            label="Last Name"
            variant="outlined"
            margin="normal"
          />
        </Box>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
        />
        <TextField
          type="date"
          label="Date of birth"
          variant="outlined"
          defaultValue="1996-01-01"
          margin="normal"
        />
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup row defaultValue="female">
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Country"
            defaultValue=""
          >
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
        />
        <TextField
          type="password"
          label="Confirm password"
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3, borderRadius: 5 }}
        >
          SignUp
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
