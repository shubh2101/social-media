import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store/ReduxStore";
import { CssBaseline } from "@mui/material";
import { ColorContextProvider } from "./components/DarkMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <ColorContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorContextProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
