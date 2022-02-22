import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./view/SignIn";
import SignUp from "./view/SignUp";
import Home from "./view/Home";
import BeforeLogin from "./component/privateComponent/BeforeLogin";
import AfterLogin from "./component/privateComponent/AfterLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route
          path="/signin"
          element={
            <AfterLogin>
              <SignIn />
            </AfterLogin>
          }
        />
        <Route
          path="/signup"
          element={
            <AfterLogin>
              <SignUp />
            </AfterLogin>
          }
        />
        <Route
          path="/home"
          element={
            <BeforeLogin>
              <Home />
            </BeforeLogin>
          }
        />
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
