import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, validateToken } from "./features/store/authSlice";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { fetchUserData } from "./features/store/userDataSlice";
import { fetchUsers } from "./features/Users/usersSlice";
import FollowingPage from "./pages/FollowingPage";
import FollowersPage from "./pages/FollowersPage";
import ProfileLayout from "./pages/ProfileLayout";
import UserPosts from "./components/UserPosts";
import Bookmarks from "./components/Bookmarks";
import Timeline from "./components/Timeline";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const currentToken = useSelector((state) => state.auth.token);
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
    if (currentToken) {
      dispatch(validateToken(currentToken));
    }
  }, [currentToken, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Timeline />} />
          <Route path="bookmarks" element={<Bookmarks />} />
        </Route>
        <Route path="/profile/:userId" element={<ProfileLayout />}>
          <Route index element={<UserPosts />} />
          <Route
            path="/profile/:userId/following"
            element={<FollowingPage />}
          />
          <Route
            path="/profile/:userId/followers"
            element={<FollowersPage />}
          />
        </Route>
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
