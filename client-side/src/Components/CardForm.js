import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CardForm() {
  const navigate = useNavigate();
  const [selector, setSelector] = useState(false);
  const firstImage =
    "https://images.unsplash.com/photo-1593269233759-427ba69acca5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJhcmJlcnNob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
  const blowdry =
    "https://images.unsplash.com/photo-1622288432480-065ae7ee810b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const hairColor =
    "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const shaving =
    "https://images.unsplash.com/photo-1593269244684-3f9c90ddf5a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const hairPerm =
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const smoothing =
    "https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  const dreadLock =
    "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const hairConrow =
    "https://images.unsplash.com/photo-1622296089780-1aba6f53dbb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  function handleSelector(e) {
    console.log(e.target.value);
    setSelector(true);
  }

  function toNavigate(value) {
    if (selector) {
      navigate("/book", { state: value });
    }
  }

  return (
    <>
      <div className="flex bg-zinc-800 w-full min-h-screen flex-col">
        <div className="mx-4 mt-4">
          <div className="flex flex-row justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 mb-4 h-12 w-12 stroke-white"
              onClick={() => navigate("/")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 mb-4 h-11 w-11 fill-white"
              onClick={() => navigate("/")}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <p className="text-white text-3xl font-bold tracking-wider">
            Hello User
          </p>
          <p className="text-white">Find your personality now!</p>
          <select
            onChange={handleSelector}
            className="flex font-semibold bg-white mt-4 px-2 pb-1 rounded"
          >
            <option>Your Location</option>
            <option value="1">Jakarta</option>
            <option value="2">Batam</option>
          </select>
        </div>
        <div className="mx-4 mt-4 flex justify-center flex-row">
          <div className="mr-2 flex flex-col mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              DISCOUNTS
            </button>
          </div>
          <div className="mr-2 flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              MISSIONS
            </button>
          </div>
          <div className="mr-2 flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              VOUCHERS
            </button>
          </div>
          <div className="flex flex-row mt-2 border-2 w-fit px-2 py-1 rounded">
            <button className="bg-transparent font-semibold border-1 border-white text-white text-xs">
              MY PROMOS
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${firstImage})` }}
            onClick={() => toNavigate(1)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">HAIR CUT</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${hairColor})` }}
            onClick={() => toNavigate(2)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">HAIR COLORING</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${hairPerm})` }}
            onClick={() => toNavigate(3)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">HAIR PERM</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${hairConrow})` }}
            onClick={() => toNavigate(4)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">
                HAIR CONROW AND BRAIDS
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${shaving})` }}
            onClick={() => toNavigate(5)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">SHAVING</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${blowdry})` }}
            onClick={() => toNavigate(6)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">BLOW DRY</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${smoothing})` }}
            onClick={() => toNavigate(7)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">SMOOTHING</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div
            className="mt-4 bg-no-repeat w-11/12 bg-cover h-48 rounded-md"
            style={{ backgroundImage: `url(${dreadLock})` }}
            onClick={() => toNavigate(8)}
          >
            <div className="flex justify-center mt-20">
              <p className="text-white text-2xl font-semibold">DREADLOCK</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardForm;
