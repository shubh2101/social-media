import React from "react";
import { Box, Typography, Button, styled, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(5),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "3.9rem",
  lineHeight: 1.333,
  color: "#FFFFFF",
  fontWeight: "600",
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));
const StyledButton = styled(Button)(() => ({
  backgroundColor: "black",
  borderColor: "white",
  color: "white",
  letterSpacing: ".25rem",
  transition: "all 0.5s ease-in-out",
  marginLeft: 10,
  ":hover": {
    color: "black",
    backgroundColor: "white",
  },
}));

const LandingHome = () => {
  const navigate = useNavigate();
  return (
    <Box component={"section"}>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "600",
                letterSpacing: ".25rem",
                mt: 10,
                mb: 4,
              }}
            >
              WELCOME TO LA FAMILIA
            </Typography>
            <Box sx={{ maxWidth: 700 }}>
              <Title variant="h1">
                Connecting you to the world, one post at a time sharing life's
                moments on our platform.
              </Title>
            </Box>
            <Box
              pt={4}
              gap={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: { xs: "space-evenly", sm: "start" },
              }}
            >
              <StyledButton
                variant="outlined"
                size="large"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </StyledButton>
              <StyledButton
                variant="outlined"
                size="large"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </StyledButton>
            </Box>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};
export default LandingHome;
