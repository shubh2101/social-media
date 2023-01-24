import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const CoverProfile = () => {
  const { coverPicURL } = useSelector((state) => state.user.profileData);
  return (
    <Box
      component="img"
      sx={{
        height: 300,
        width: "100%",
      }}
      alt="cover picture"
      src={coverPicURL || "https://wallpapercave.com/wp/wp4286413.jpg"}
    />
  );
};

export default CoverProfile;
