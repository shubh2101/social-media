
import { Box, Stack } from "@mui/material";
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import SideBar from "./components/SideBar";
import Timeline from "./components/Timeline";

function App() {
  return (
    <Box >
      <NavBar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <SideBar/>
      <Timeline/>
      <RightBar/>
      </Stack>
    </Box>
  );
}

export default App;
