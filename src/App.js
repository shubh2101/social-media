import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/store/authSlice";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { fetchUserData, userActions } from "./features/store/userDataSlice";
import { fetchUsers } from "./features/Users/usersSlice";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.userId);
  const API_KEY = process.env.REACT_APP_apiKey;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.userLoggedIn(currentToken));
  }, [currentToken, dispatch]);

  // Getting and storing User-Details
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [userId, dispatch]);

  // fetch users
  useEffect(() => {
    if (userId) {
      dispatch(fetchUsers(userId));
    }
  }, [userId, dispatch]);

  // Validating token and getting User-Id
  useEffect(() => {
    currentToken &&
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: currentToken,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = "HTTP request failed!";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              dispatch(authActions.loggedOut());
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const userId = data.users[0].localId;
          dispatch(userActions.setUserId(userId));
        });
  }, [currentToken, dispatch, API_KEY]);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Route>
      <Route
        path="/login"
        element={!isLoggedIn ? <LogInPage /> : <Navigate to="/" />}
      />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
