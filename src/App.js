import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/store/authSlice";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.userLoggedIn(currentToken));
  }, [currentToken, dispatch]);

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
