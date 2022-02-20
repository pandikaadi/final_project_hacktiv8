import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./view/SignIn";
import SignUp from "./view/SignUp";
import Home from "./view/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="*"
          element={
            <main className="flex h-screen justify-center">
              <p className="text-5xl font-bold m-auto">NOT FOUND!!</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
