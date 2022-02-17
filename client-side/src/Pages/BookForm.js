import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import "../App.css";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
const iconMarkup = renderToStaticMarkup(
  <i className="fa-solid fa-map-pin fa-4x"></i>
);
const customMarkerIcon = divIcon({
  html: iconMarkup
});
// import marker from '../../Assets/icons/Location.svg';
// import { Icon } from 'leaflet'
// const myIcon = new Icon({
//  iconUrl: marker,
//  iconSize: [32,32]
// })


function BookForm() {
  const [centerLat, setCenterLat] = useState(-6.940116143023617);
  const [centerLong, setCenterLong] = useState(107.5605011029984);
  const [position, setPosition] = useState({ lat: centerLat, lng: centerLong });
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        setCenterLat(position.lat);
        setCenterLong(position.lng);
        // console.log(centerLat, ">>>>>>");
        // console.log(centerLong, ">>>>>>");
      },
      // locationfound(e) {
      //   setPosition(e.latlng)
      //   map.flyTo(e.latlng, map.getZoom())
      // },
    });

    return position === null ? null : (
      <Marker icon={customMarkerIcon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  function HandleCenter({ mapCenter }) {
    
    const map = useMap();
    map.setView(mapCenter);
    return null;
  }
  function handleLocateButton(e) {
    e.preventDefault()
    // console.log(`hehe`);
    // console.log(position);

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Show a map centered at latitude / longitude.
      setPosition({ lat: latitude, lng: longitude });

      // setCenterLat(position.lat)
      // setCenterLong(position.lng)
      // setCenterLat(position.lat)
      // setCenterLong(position.lng)
    });
  }
  return (
    <>
      <div className="flex justify-center bg-zinc-800 pt-10 min-h-screen">
        <Fade>
          <div className="m-auto">
            {/* <div className="flex justify-end">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div> */}
            <form className="pb-4  space-y-2 lg:px-2 sm:pb-6 xl:pb-8">
              <div className="flex justify-center tracking-widest">
                <h3 className="text-4xl font-light text-white dark:text-white pb-4">
                  BOOK NOW
                </h3>
              </div>
              
              <div className="flex justify-center mb-2">
                <input
                  type="date"
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="flex justify-center mb-2">
                <select className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                  <option>08.00 - 10.00</option>
                  <option>10.00 - 12.00</option>
                  <option>13.00 - 15.00</option>
                  <option>15.00 - 17.00</option>
                  <option>17.00 - 19.00</option>
                </select>
              </div>
              <div className="flex justify-center">
                <textarea
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="address"
                  required
                />
              </div>
              
              <div className="justify-center mb-2 rounded-sm-2">
                <div className="flex content-center my-3">
                  <button
                    onClick={handleLocateButton}
                    className=" self-center content-center mx-auto text-white bg-indigo-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Locate Yourself
                  </button>
                </div>
                <MapContainer
                  center={[centerLat, centerLong]}
                  style={{ height: 350 }}
                  id="mapid"
                  zoom={13}
                  className="max-w-7/8 rounded"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
                  <HandleCenter mapCenter={position} />
                  {/* <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> */}
                </MapContainer>
              </div>
              
              <div className="flex justify-center mb-2">
                <button
                  type="submit"
                  className="w-3/4 mx-auto mt-2 text-white bg-indigo-500 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Order
                </button>
              </div>
            </form>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default BookForm;
