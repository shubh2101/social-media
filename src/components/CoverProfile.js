import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const CoverProfile = () => {
  const { coverPicURL } = useSelector((state) => state.user.profileData);
  return (
    <Box
      component="img"
      sx={{
        height: 250,
        width: "100%",
      }}
      alt="The house from the offer."
      src={coverPicURL || "https://wallpapercave.com/wp/wp4286413.jpg"}
    />
  );
};

export default CoverProfile;
