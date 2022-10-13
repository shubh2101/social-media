import { Route, Routes,  Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  console.log({ isAuth });
  return (
    <div>
      <Routes>
        <Route path="/" element={!isAuth && <LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
