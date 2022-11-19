import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/store/authSlice";

function App() {
  const [user, setUser] = useState({});

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });
  // console.log({ user });
  
  useEffect(() => {
    dispatch(authActions.userLoggedIn(currentToken));
  }, [currentToken, dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? <LogInPage /> : <Navigate to="/home" />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
