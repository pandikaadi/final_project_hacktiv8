import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setRegister,
  setRegisterAdmin,
} from "../store/actionCreator/actionCreator";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
      <div className="py-12">
        <div className="fixed inset-x-0 top-0">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-5 bg-slate-100 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <Link
                  className="text-xl font-semibold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-slate-500"
                  to="/"
                >
                  SHAVE8
                </Link>
                <button
                  className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                >
                  <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                  <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                  <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                </button>
              </div>
              <div
                className="lg:flex flex-grow items-center"
                id="example-navbar-warning"
              >
                <ul className="flex flex-col lg:flex-row list-none mr-auto">
                  <li className="nav-item">
                    <button
                      className="px-3 py-2 flex items-center text-sm uppercase font-light leading-snug text-slate-500 hover:opacity-75"
                      onClick={() => dispatch(setRegister(true))}
                    >
                      <p className="ml-2">New Barber</p>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="px-3 py-2 flex items-center text-sm uppercase font-light leading-snug text-slate-500 hover:opacity-75"
                      onClick={() => dispatch(setRegisterAdmin(true))}
                    >
                      <p className="ml-2">New Admin</p>
                    </button>
                  </li>
                </ul>
                <div>
                  <button
                    onClick={signOutHandler}
                    className="flex justify-end items-center px-4 pl-4 text-xl font-semibold text-slate-500"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
