import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Home from "./Pages/Home";
import Forgotpassword from "./Pages/Forgotpassword";
import { useSelector } from "react-redux";
import Getcurrentuser from "./Hooks/Getcurrentuser";
import Getsuggesteduser from "./Hooks/Getsuggesteduser";
import Profile from "./Pages/Profile";
import Editprofile from "./Pages/Editprofile";
import Upload from "./Pages/Upload";
import Getallpost from "./Hooks/Getallpost";
import Getallloops from "./Hooks/Getallloops";
import Loops from "./Pages/Loops";
import Story from "./Pages/Story";
export const serverUrl = "http://localhost:8000";

function App() {
  Getcurrentuser();
  Getsuggesteduser();
  Getallpost();
  Getallloops();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/Signin"
        element={!userData ? <Signin /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/forgotpassword"
        element={!userData ? <Forgotpassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/profile/:username"
        element={userData ? <Profile /> : <Navigate to={"/"} />}
      />
      <Route
        path="/editprofile"
        element={userData ? <Editprofile /> : <Navigate to={"/"} />}
      />
      <Route
        path="/upload"
        element={userData ? <Upload /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/loop"
        element={userData ? <Loops /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/story/:username"
        element={userData ? <Story /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
