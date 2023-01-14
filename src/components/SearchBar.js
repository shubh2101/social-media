import {
  Autocomplete,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const users = useSelector((state) => state.users.users);
  const [inputValue, setinputValue] = useState("");
  const options = users.map((user) => user.data);
  const navigate = useNavigate();

  return (
    <Autocomplete
      freeSolo
      autoHighlight
      sx={{ width: 300 }}
      id="search"
      name="search"
      options={options}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      inputValue={inputValue}
      onInputChange={(e, value) => setinputValue(value)}
      open={inputValue.length > 0}
      renderInput={(params, option) => (
        <TextField {...params} key={option} label="Search..." />
      )}
      renderOption={(props, option) => (
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              navigate(`/profile/${option.userId}`);
            }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", px: 2 }}>
              <ListItemAvatar>
                <Avatar alt={option.firstname} src={option.profilePicURL} />
              </ListItemAvatar>
              <ListItemText
                primary={`${option.firstname} ${option.lastname}`}
              />
            </Box>
          </ListItemButton>
        </ListItem>
      )}
    />
  );
};

export default SearchBar;
