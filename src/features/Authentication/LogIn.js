import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const initialFormValues = {
  email: "",
  password: "",
};

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialFormValues);

  const valueChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(user);
      dispatch(authActions.loggedIn(user._tokenResponse.idToken));

      navigate("/");
      console.log("logged in");
    } catch (error) {
      let errorMessage = "failed to login !";
      if (error.message) {
        errorMessage = error.message;
      }
      alert(errorMessage);
      throw new Error(errorMessage);
    }
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
          Don't have an account ?<Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LogIn;
