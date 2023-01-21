import { Box, Card, CardContent, Typography } from "@mui/material";

const NoPosts = () => {
  return (
    <Box flex={2} p={2}>
      <Card
        sx={{
          borderRadius: "20px",
          textAlign: "center",
          p: 2,
        }}
        elevation={8}
      >
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            No post to show
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NoPosts;
