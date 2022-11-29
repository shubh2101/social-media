import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/store/authSlice";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { userActions } from "./features/store/userSlice";
import { getUserData } from "./firebase-calls";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.user.userId);
  const userdetails = useSelector((state) => state.user.userData);
  const API_KEY = process.env.REACT_APP_apiKey;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.userLoggedIn(currentToken));
  }, [currentToken, dispatch]);

  // Getting and storing User-Details
  const getUserDetails = useCallback(
    async (userId) => {
      let data = await getUserData(userId);
      dispatch(userActions.setUserData(data));
    },
    [dispatch]
  );
  useEffect(() => {
    if (userId) {
      getUserDetails(userId);
    }
  }, [userId, getUserDetails]);

  // Validating token and getting User-Id
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
      console.log(userdetails)
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
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
