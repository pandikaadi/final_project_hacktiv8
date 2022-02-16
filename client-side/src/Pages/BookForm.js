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
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  function HandleCenter({ mapCenter }) {
    const map = useMap();
    map.setView(mapCenter);
    return null;
  }
  function handleLocateButton() {
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
      <div className="flex justify-center text-neutral-300 flex-col bg-zinc-800 min-h-screen max-w-full">
        <div className="max-w-full">
          <div className="w-full">
            <form className="flex flex-col items-center mt-3">
              <div className="flex flex-col w-3/4 mb-2">
                <label className="mb-1 text-neutral-300">Name</label>
                <input className="border-2 border-black h-7 rounded flex items-center" />
              </div>
              <div className="flex flex-col w-3/4 mb-2">
                <label className="mb-1 text-neutral-300">Phone Number</label>
                <input className="border-2 px-2 border-black rounded flex h-7 items-center" />
              </div>
              <div className="flex flex-col w-3/4 mb-2">
                <label className="mb-1 text-neutral-300">Address</label>
                <textarea className="border-2 px-2 border-black rounded h-21 flex items-center"></textarea>
              </div>
              <div className="flex flex-col w-3/4 mb-2">
                <label className="mb-1 text-neutral-300">Schedule</label>
                <select className="border-2 rounded border-black h-7 px-2">
                  <option>08.00 - 10.00</option>
                  <option>10.00 - 12.00</option>
                  <option>13.00 - 15.00</option>
                  <option>15.00 - 17.00</option>
                  <option>17.00 - 19.00</option>
                </select>
              </div>
              <div className="flex flex-col w-3/4 mb-2">
                <label className="mb-1 text-neutral-300">Service</label>
                <select className="border-2 rounded border-black h-7 px-2">
                  <option className="px-2">Basic Cut - Rp. 75.000</option>
                  <option className="px-2">
                    Full Cut (Basic Cut + Beard & Mustache Trim) - Rp. 100.000
                  </option>
                  <option className="px-2">Buzz Cut - Rp. 40.000</option>
                </select>
              </div>
              <div className="flex flex-col w-3/4 mb-2">
                <label className="mb-1 text-neutral-300">Date</label>
                <input
                  type="date"
                  className="border-2 px-2 h-7 border-black rounded flex items-center"
                />
              </div>
              <div>
                <div className="flex flex-row flex-wrap mx-auto content-center justify-evenly">
                  <div className="rounded-md border-2 m-3 p-2 h-35">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                  <div className="rounded-md border-2 m-3 p-2 h-32">
                    tukang cukur 1
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex content-center my-3">
            <button
              onClick={handleLocateButton}
              className="rounded text-stone-700 self-center content-center mx-auto bg-white w-1/5"
            >
              Click Me
            </button>
          </div>
          <div className="px-1 rounded-sm-2">
            <MapContainer
              center={[centerLat, centerLong]}
              id="mapid"
              zoom={13}
              className="max-w-full rounded px-2"
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
          <div className="mb-5 items-center content-center text-center">
            <div>Distance: 4 km</div>
            <div>Total Price: Rp. 75.000 + Rp. 20.000 = Rp. Rp.95.000</div>
            <div className="my-2">
              <button className="rounded border-2 p-1 px-5 bg-transparent text-neutral-300 font-bold border-neutral-300 ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookForm;
