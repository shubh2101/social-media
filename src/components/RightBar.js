import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";

const RightBar = () => {
  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <Typography variant="h6" fontWeight="bold">
        Followers
      </Typography>
      <List>
        <ListItem>
          <Box>
            <ListItemButton>
              <Avatar alt="Ronaldo" src="/" />
              <Typography p={2}>Cristiano Ronaldo</Typography>
            </ListItemButton>
            <ListItemButton>
              <Avatar alt="Messi" src="/" />
              <Typography p={2}>Lionel Messi</Typography>
            </ListItemButton>
          </Box>
        </ListItem>
      </List>
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Who to Follow
        </Typography>
        <List>
          <ListItem>
            <Box>
              <ListItemButton
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt="Hazard" src="/" />
                  <Typography p={2}>Eden Hazard</Typography>
                </Box>
                <Button variant="contained" sx={{ borderRadius: "30px" }}>
                  Follow
                </Button>
              </ListItemButton>
              <ListItemButton
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar alt="Reus" src="/" />
                  <Typography p={2}>Marco Reus</Typography>
                </Box>
                <Button variant="contained" sx={{ borderRadius: "30px" }}>
                  Follow
                </Button>
              </ListItemButton>
            </Box>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default RightBar;
