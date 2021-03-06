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
import { GetOrders, showTheDetail } from "../store/actionCreators/actionCreator";
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
  const { userOrder } = useSelector((state) => state.data);
  ;
  

  const dispatch = useDispatch();
  const [distance, setDistance] = useState(null);
  const { showDetail } = useSelector((state) => state.client);
  const [centerLat, setCenterLat] = useState(-6.940116143023617);
  const [centerLong, setCenterLong] = useState(107.5605011029984);
  const [position, setPosition] = useState({
    lat: -6.9421162,
    lng: 107.560501,
  });
  const [barberPosition, setBarberPosition] = useState({
    lat: -6.940116,
    lng: 107.56084,
  });
  useEffect(() => {
       const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        (async () => {
          try {
            dispatch(GetOrders(localStorage.getItem("access_token")))
          } catch (error) {
          }
        })();
      },20000)

      return () => clearInterval(intervalId);
    
  }, [])
  useEffect(() => {
    if(userOrder.orders) {
      console.log(userOrder.orders[userOrder.orders.length - 1], ">>>")
      if(userOrder.orders.length > 0) {
        setPosition({
          lat: +userOrder.orders[userOrder.orders.length - 1].lat,
          lng: +userOrder.orders[userOrder.orders.length - 1].long
        })
        setBarberPosition({
          lat: +userOrder.orders[userOrder.orders.length - 1].Barber.lat,
          lng: +userOrder.orders[userOrder.orders.length - 1].Barber.long
        })
        
      }
    }
  }, [userOrder.orders])
  useEffect(() => {
    ;
    // 
    if (position.lat && position.lng) {
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
      // setDistance(distance)
    }
  }, [position]);
  function HandleCenter({ mapCenter }) {
    const map = useMap();
    if (position) map.setView(mapCenter);
    return null;
  }
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
        <Popup>You</Popup>
      </Marker>
    );
  }
  function BarberMarker() {
    return barberPosition === null ? null : (
      <Marker icon={customMarkerIconBarber} position={barberPosition}>
        <Popup>Barber { userOrder.orders[userOrder.orders.length - 1].Barber.name|| ""}</Popup>
      </Marker>
    );
  }
  return (
    <>
      <div className="flex justify-center bg-zinc-800 h-screen">
        {showDetail && <PaymentDetailCard />}
        {!showDetail && (
          <Bounce top>
            <div className="flex flex-col m-auto bg-white px-3 py-4 rounded content-center items-center">
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
                <HandleCenter mapCenter={barberPosition} />
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
