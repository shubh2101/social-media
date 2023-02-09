import { Route, Routes, Navigate } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, validateToken } from "./features/store/authSlice";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { fetchUserData } from "./features/store/userDataSlice";
import { fetchUsers } from "./features/Users/usersSlice";
import FollowingPage from "./pages/FollowingPage";
import FollowersPage from "./pages/FollowersPage";
import ProfileLayout from "./pages/ProfileLayout";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import { fetchBookmarksData, fetchPosts } from "./features/store/postSlice";
import BookmarksPage from "./pages/BookmarksPage";
import LandingPage from "./pages/LandingPage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const currentToken = useSelector((state) => state.auth.token);
  const { following } = useSelector((state) => state.user.userData);
  const userDataStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  // Validating token and getting User-Id
  useEffect(() => {
    if (currentToken) {
      dispatch(validateToken(currentToken));
    }
  }, [currentToken, dispatch]);

  useEffect(() => {
    dispatch(authActions.userLoggedIn(currentToken));
  }, [currentToken, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsers(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBookmarksData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId && userDataStatus === "succeeded") {
      dispatch(fetchPosts({ following, userId }));
    }
  }, [dispatch, userId, following, userDataStatus]);

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Timeline />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="explore" element={<Explore />} />
        </Route>
        <Route path="/profile/:userId" element={<ProfileLayout />}>
          <Route index element={<Timeline />} />
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
      <Route
        path="/home"
        element={!isLoggedIn ? <LandingPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
