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
import { createSearchParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const users = useSelector((state) => state.users.users);
  const [value, setValue] = useState(null);
  const [inputValue, setinputValue] = useState("");
  const options = users.map((user) => user.data);
  const navigate = useNavigate();

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      sx={{ width: 300 }}
      id="search"
      name="search"
      options={options}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      inputValue={inputValue}
      onInputChange={(e, value) => {
        setinputValue(value);
      }}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      open={inputValue.length > 0}
      renderInput={(params, option) => (
        <form>
          <TextField
            {...params}
            key={option}
            label="Search..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                e.preventDefault();
                const options = {
                  pathname: "/explore",
                  search: `?${createSearchParams({ filter: inputValue })}`,
                };
                navigate(options, { replace: true });
                setinputValue("");
              }
            }}
          />
        </form>
      )}
      renderOption={(props, option) => (
        <ListItem {...props} key={option.userId} disableGutters>
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
