import React from "react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 bg-slate-100 flex justify-between text-sm text-blue-900 uppercase font-mono">
        <button className="w-full block py-2 px-3 text-center hover:bg-slate-200 hover:text-slate-800 transition duration-300">
          <svg
            className="w-6 h-6 mb-2 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => navigate("/home")}
            stroke="black"
          >
            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path
              fill="#fff"
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
            />
          </svg>
          Home
        </button>

        <button
          href="#"
          className="w-full block py-2 px-3 text-center hover:bg-slate-200 hover:text-slate-800"
        >
          <svg
            className="w-6 h-6 mb-2 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Features
        </button>

        <button
          href="#"
          className="w-full block py-2 px-3 text-center hover:bg-slate-200 hover:text-slate-800"
        >
          <svg
            className="w-6 h-6 mb-2 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          Profile
        </button>

        <button
          onClick={logoutHandler}
          className="w-full block py-2 px-3 text-center hover:bg-slate-200 hover:text-slate-800"
        >
          <svg
            className="w-6 h-6 mb-2 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          Logout
        </button>
      </nav>
    </>
  );
}

export default BottomNav;
