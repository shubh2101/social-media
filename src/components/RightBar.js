import { Box } from "@mui/material";

const RightBar = () => {
  return (
    <Box
      bgcolor="pink"
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      RightBar
    </Box>
  );
};

export default RightBar;
