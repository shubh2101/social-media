import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialFormValues = {
  email: "",
  password: "",
};
const LogIn = () => {
  const [values, setValues] = useState(initialFormValues);

  const valueChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
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
          mt: 10,
          display: "flex",
          flexDirection: "column",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        <Typography variant="h5" textAlign="center">
          Welcome back
        </Typography>

        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          size="small"
          value={values.email}
          onChange={valueChangeHandler}
          required
        />

        <TextField
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          margin="normal"
          size="small"
          value={values.password}
          onChange={valueChangeHandler}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ mt: 3, borderRadius: 5 }}
        >
          Log In
        </Button>
        <Typography display="flex" justifyContent="center" gap={2} mt={3}>
          Do you have an account ?<Link to="/">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LogIn;
