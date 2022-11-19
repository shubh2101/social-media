import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  console.log({ user });

  return (
    <div>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
