import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DataForm from "../Components/DataForm";

import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import "../App.css";

function BookForm(props) {
  const [centerLat, setCenterLat] = useState(-6.940116143023617);
  const [centerLong, setCenterLong] = useState(107.5605011029984);
  const [position, setPosition] = useState({ lat: centerLat, lng: centerLong });
  const { state } = useLocation();

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
            <DataForm />
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
              zoom={13}
              className="h-screen rounded px-2"
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
