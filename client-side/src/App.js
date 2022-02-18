import React from "react";
import { Route, Routes } from "react-router-dom";
import BookForm from "./Pages/BookForm";
import LandingPage from "./Pages/LandingPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ChooseService from "./Pages/ChooseService";
import VotePage from "./Pages/VotePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/card" element={<ChooseService />} />
        <Route path="/book" element={<BookForm />} />
        <Route path="/vote" element={<VotePage />} />
      </Routes>
    </>
  );
}

export default App;
