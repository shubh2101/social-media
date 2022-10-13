import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";

const initialFormValues = {
  email: "",
  password: "",
};
const LogIn = () => {
  const currentToken = useSelector((state) => state.auth.token);

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
  const API_KEY = process.env.REACT_APP_apiKey;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

  const submitHandler = async (event) => {
    event.preventDefault();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        returnSecureToken: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
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
      })
      .then((data) => {
        dispatch(authActions.loggedIn(data.idToken));
        console.log({ data });
        navigate("home");
        console.log("logged in");
        console.log({ currentToken });
      })
      .catch((err) => {
        alert(err.message);
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
          Do you have an account ?<Link to="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LogIn;
