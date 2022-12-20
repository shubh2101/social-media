import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledFollowButton = styled(Button)(({ theme, color = "secondary" }) => ({
    backgroundColor: theme.palette[color].main,
    borderRadius: "30px",
    ":hover": {
      color: theme.palette[color].dark,
      backgroundColor: "white",
    },
  }));

 export const StyledNavButton = styled(Button)(({ theme, color = "secondary" }) => ({
    display: "inline-block",
    color: "white",
    margin : 50,
    ":hover": {
      color: theme.palette[color].main,
    },
  }));
