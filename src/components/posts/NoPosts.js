import { Box, Card, CardContent, Typography } from "@mui/material";

const NoPosts = () => {
  return (
    <Box flex={2} p={2} mt={{ md: 10 }} mb={3}>
      <Card
        sx={{
          borderRadius: "20px",
          textAlign: "center",
          p: 2,
          maxWidth: 600,
        }}
        elevation={8}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "600",
              letterSpacing: ".20rem",
            }}
          >
            No post to show
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoPosts;
