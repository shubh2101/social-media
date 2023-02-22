import { Route, Routes, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import ProtectedRoutes from "./ProtectedRoutes";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import BookmarksPage from "../pages/BookmarksPage";
import Timeline from "../components/Timeline";
import ProfileLayout from "../pages/ProfileLayout";
import FollowingPage from "../pages/FollowingPage";
import FollowersPage from "../pages/FollowersPage";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import Explore from "../components/Explore";

const MainRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={!isLoggedIn && <LandingPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Timeline />} />
          <Route path="/home/bookmarks" element={<BookmarksPage />} />
          <Route path="/home/explore" element={<Explore />} />
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
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default MainRoutes;
