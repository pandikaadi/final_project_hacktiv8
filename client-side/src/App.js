import React from "react";
import { Route, Routes } from "react-router-dom";
import BookForm from "./Pages/BookForm";
import LandingPage from "./Pages/LandingPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book" element={<BookForm />} />
      </Routes>
    </>
  );
}

export default App;
