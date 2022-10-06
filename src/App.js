import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogInPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/home" element={<HomePage/>}/>        
      </Routes>
    </div>
  );
}

export default App;
