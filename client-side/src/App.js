import React from "react";
import { Route, Routes } from "react-router-dom";
import BookForm from "./Pages/BookForm";
import LandingPage from "./Pages/LandingPage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ChooseService from "./Pages/ChooseService";
import PaymentPage from "./Pages/PaymentPage";
import PrivateRouter from "./Components/PrivateComponent/PrivateComponent";
import BeforeBook from "./Components/PrivateComponent/BeforeBook";
import ToSignGuard from "./Components/PrivateComponent/signInAndUpGuard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        style={{ width: "250px", fontSize: 11 }}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signin"
          element={
            <ToSignGuard>
              <SignIn />
            </ToSignGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <ToSignGuard>
              <SignUp />
            </ToSignGuard>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRouter>
              <ChooseService />
            </PrivateRouter>
          }
        />
        <Route
          path="/book"
          element={
            <BeforeBook>
              <BookForm />
            </BeforeBook>
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
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
