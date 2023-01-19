import {
  Autocomplete,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/MUI/icons";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchField";

const SearchBar = () => {
  const users = useSelector((state) => state.users.users);
  const [value, setValue] = useState(null);
  const [inputValue, setinputValue] = useState("");
  const options = users.map((user) => user.data);
  const navigate = useNavigate();

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
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
        renderInput={(params, option) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <StyledInputBase
              {...params.InputProps}
              {...rest}
              key={option}
              placeholder="Search…"
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
          );
        }}
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
    </Search>
  );
};

export default SearchBar;