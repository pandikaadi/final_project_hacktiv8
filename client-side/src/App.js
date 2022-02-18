import React from "react";
import { Route, Routes } from "react-router-dom";
import BookForm from "./Pages/BookForm";
import LandingPage from "./Pages/LandingPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ChooseService from "./Pages/ChooseService";
import RatingModal from "./Components/RatingModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ChooseService />} />
        <Route path="/book" element={<BookForm />} />
        <Route path="/vote" element={<RatingModal />} />
      </Routes>
    </>
  );
}

export default App;
