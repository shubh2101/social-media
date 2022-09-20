import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Auth = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        p={3}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        <Typography variant="h5" textAlign="center">
          SignUp
        </Typography>
        <TextField
          type="text"
          label="First Name"
          variant="outlined"
          margin="normal"
          sx={{ width: 300 }}
        />
        <TextField
          type="text"
          label="Last Name"
          variant="outlined"
          margin="normal"
          sx={{ width: 300 }}
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          margin="normal"
          sx={{ width: 300 }}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          sx={{ width: 300 }}
        />
        <Button variant="contained" sx={{ mt: 3, borderRadius: 5 }}>
          SignUp
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
