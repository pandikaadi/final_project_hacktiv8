import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaymentDetailCard from "../Components/PaymentDetailCard";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import { showTheDetail } from "../store/actionCreators/actionCreator";
import Bounce from "react-reveal/Bounce";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import proj4 from "proj4";

function PaymentPage() {
  proj4.defs(
    "EPSG:32748",
    "+proj=utm +zone=48 +south +datum=WGS84 +units=m +no_defs"
  );
  const firstProjection = new proj4.Proj("WGS84");
  const secondProjection = new proj4.Proj("EPSG:32748");

  const dispatch = useDispatch();
  const [distance, setDistance] = useState(null);
  const { showDetail } = useSelector((state) => state.client);
  const [centerLat, setCenterLat] = useState(-6.940116143023617);
  const [centerLong, setCenterLong] = useState(107.5605011029984);
  const [barberPosition, setBarberPosition] = useState({
    lat: centerLat,
    lng: centerLong,
  });
  useEffect(() => {
    if (position) {
      let utmCust = proj4(firstProjection, secondProjection, [
        position.lng,
        position.lat,
      ]);
      let utmBarber = proj4(firstProjection, secondProjection, [
        barberPosition.lng,
        barberPosition.lat,
      ]);
      const powerDistance =
        Math.pow(Math.abs(utmCust[0] - utmBarber[0]), 2) +
        Math.pow(Math.abs(utmCust[1] - utmBarber[1]), 2);
      const distance = Math.pow(powerDistance, 0.5);

      setDistance((distance / 1000).toFixed(1));
    }
  }, []);
  const [position, setPosition] = useState({
    lat: -6.9421162,
    lng: centerLong,
  });
  const iconMarkupBarber = renderToStaticMarkup(
    // <i class="fa-solid text-rose-600 fa-motorcycle fa-4x"></i>
    <i class="fa-solid text-rose-600 fa-location-pin fa-4x"></i>
  );
  const customMarkerIconBarber = divIcon({
    html: iconMarkupBarber,
  });
  const iconMarkup = renderToStaticMarkup(
    <i className="fa-solid fa-map-pin fa-4x"></i>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });
  function LocationMarker() {
    return barberPosition === null ? null : (
      <Marker icon={customMarkerIcon} position={position}>
        <Popup>Barber Name</Popup>
      </Marker>
    );
  }
  function BarberMarker() {
    return barberPosition === null ? null : (
      <Marker icon={customMarkerIconBarber} position={barberPosition}>
        <Popup>Barber Name</Popup>
      </Marker>
    );
  }
  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        {showDetail && <PaymentDetailCard />}
        {!showDetail && (
          <Bounce top>
            <div className="flex flex-col m-auto bg-white px-2 py-4 rounded">
              <MapContainer
                center={[centerLat, centerLong]}
                style={{ height: 350, width: 350 }}
                zoom={13}
                className="max-w-7/8 rounded"
                // className="w-3/6 rounded"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <BarberMarker />
              </MapContainer>
              <div className="flex justify-center mt-2">
                <p>
                  The barber is{" "}
                  <span className="text-blue-500 font-bold">{distance} KM</span>{" "}
                  away from you
                </p>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => dispatch(showTheDetail(true))}
                  className="bg-green-400 hover:bg-green-200 shadow-lg shadow-green-500/50 px-4 py-2 text-white text-sm font-semibold tracking-wider rounded"
                >
                  SHOW ME THE DETAILS!
                </button>
              </div>
            </div>
          </Bounce>
        )}
      </div>
    </>
  );
}

export default PaymentPage;
