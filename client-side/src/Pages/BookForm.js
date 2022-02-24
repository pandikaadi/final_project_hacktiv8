import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import proj4 from "proj4";
import "../App.css";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { useSelector } from "react-redux";
import dataReducer from "../store/reducers/data";
import {
  fetchLocation,
  getTodayBooks,
  hasOrder,
  isServiceSelected,
  postNewOrder,
  setLoading,
  showRatingForm,
} from "../store/actionCreators/actionCreator";
import RatingModal from "../Components/RatingModal";
import { toast } from "react-toastify";

const iconMarkup = renderToStaticMarkup(
  <i className="fa-solid fa-map-pin fa-4x"></i>
);
const customMarkerIcon = divIcon({
  html: iconMarkup,
});
const iconMarkupBarber = renderToStaticMarkup(
  <i className="fa-solid text-rose-600 fa-map-pin fa-4x"></i>
);
const customMarkerIconBarber = divIcon({
  html: iconMarkupBarber,
});
function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  proj4.defs(
    "EPSG:32748",
    "+proj=utm +zone=48 +south +datum=WGS84 +units=m +no_defs"
  );
  const firstProjection = new proj4.Proj("WGS84");
  const secondProjection = new proj4.Proj("EPSG:32748");
  const [centerLat, setCenterLat] = useState(-6.940116143023617);
  const [centerLong, setCenterLong] = useState(107.5605011029984);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [bookedHour, setBookedHour] = useState({});
  const [barberPosition, setBarberPosition] = useState({
    lat: centerLat,
    lng: centerLong,
  });
  const [position, setPosition] = useState(null);
  const [form, setForm] = useState({
    address: "",
    date: "",
    hour: "",
  });

  function formHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const { location, service, barber, servicePrice } = useSelector(
    (state) => state.data
  );
  console.log(bookedHour, `>>>BOOKED HOUR`);
  function handleNewOrder(e) {
    e.preventDefault();
    console.log(form.hour);
    console.log(position);
    if (price && form.hour) {
      const payload = {
        date: new Date(form.date),
        hour: form.hour,
        address: form.address,
        price: price,
        lat: +position.lat,
        long: +position.lng,
        serviceId: service,
        barberId: barber,
        city: location,
      };
      dispatch(postNewOrder(payload))
        .then((data) => {
          dispatch(hasOrder(true));
          dispatch(isServiceSelected(false));
          dispatch(showRatingForm(true));
          dispatch(setLoading(true));
          navigate("/payment");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!price) {
        toast.error("You must pick your place on the map");
      } else {
        toast.error("Select a schedule");
      }
    }
  }

  function priceFormatter(price) {
    let formattedPrice = price.toString().split("");

    for (
      let i = (formattedPrice.length % 3) - 1;
      i < formattedPrice.length;
      i += 3
    ) {
      if (i !== formattedPrice.length - 1) formattedPrice[i] += `.`;
    }

    return `Rp. ${formattedPrice.join("")}`;
  }

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
      // console.log(distance/1000, ">>>> Distance Meter")//METER
      setDistance((distance / 1000).toFixed(1));
      // console.log(distance)
      if (distance) {
        setPrice(Math.round((servicePrice + distance * 5) / 1000) * 1000);
      }
    }
  }, [position]);

  useEffect(() => {
    if (location === "1") {
      setBarberPosition({
        lat: -6.25097,
        lng: 106.839584,
      });
      setPosition({
        lat: -6.25097,
        lng: 106.839584,
      });
    } else if (location === "2") {
      setBarberPosition({
        lat: -6.917359,
        lng: 107.606478,
      });
      setPosition({
        lat: -6.917359,
        lng: 107.606478,
      });
    }
  }, []);
  // console.log(form);
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        if (position) {
          setCenterLat(position.lat);
          setCenterLong(position.lng);
          dispatch(fetchLocation(position))
            .then((data) => {
              setForm({
                ...form,
                address: data,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });

    return position === null ? null : (
      <Marker icon={customMarkerIcon} position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  function BarberMarker() {
    return barberPosition === null ? null : (
      <Marker icon={customMarkerIconBarber} position={barberPosition}>
        <Popup>Shave8 HQ</Popup>
      </Marker>
    );
  }

  function HandleCenter({ mapCenter }) {
    const map = useMap();
    if (position) map.setView(mapCenter);
    return null;
  }
  function handleLocateButton(e) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      // Show a map centered at latitude / longitude.
      await setPosition({ lat: latitude, lng: longitude });
      dispatch(fetchLocation({ lat: latitude, lng: longitude }))
        .then((data) => {
          setForm({
            ...form,
            address: data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  useEffect(() => {
    if (form.date) {
      dispatch(
        getTodayBooks({ date: new Date(form.date), barberId: barber })
      ).then((data) => {
        let obj = {};
        data.forEach((e) => {
          obj[e.hour] = true;
        });
        setBookedHour(obj);
      });
    }
  }, [form.date]);
  return (
    <>
      <div className="flex justify-center bg-zinc-900 pt-2 min-h-screen">
        {/* <Fade> */}
        <div className="">
          <form className="pb-2 space-y-2" onSubmit={handleNewOrder}>
            <div className="flex justify-center mb-2 rounded-sm-2">
              <MapContainer
                center={[centerLat, centerLong]}
                style={{ height: 500 }}
                id="mapid"
                zoom={13}
                className="max-w-2xl rounded"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <BarberMarker />

                <HandleCenter mapCenter={position} />
              </MapContainer>
            </div>

            <div className="bg-white h-full py-4 space-y-4 rounded-md">
              <p className="font-semibold text-2xl mx-10 my-6">
                Set your schedule!
              </p>

              <div className="flex justify-center mb-2">
                <input
                  min={new Date().toISOString().split("T")[0]}
                  onChange={formHandler}
                  required
                  value={form.date}
                  name="date"
                  type="date"
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className="flex justify-center mb-2">
                <select
                  defaultValue={"DEFAULT"}
                  onChange={formHandler}
                  required
                  defaultValue={"disable"}
                  name="hour"
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="disable" disabled>
                    Select schedule
                    {bookedHour["08.00 - 10.00"] ? " -- booked --" : null}
                  </option>
                  <option
                    disabled={bookedHour["08.00 - 10.00"] ? true : false}
                    value="08.00 - 10.00"
                  >
                    08.00 - 10.00{" "}
                    {bookedHour["08.00 - 10.00"] ? " -- booked --" : null}
                  </option>
                  <option
                    disabled={bookedHour["10.00 - 12.00"] ? true : false}
                    value="10.00 - 12.00"
                  >
                    10.00 - 12.00{" "}
                    {bookedHour["10.00 - 12.00"] ? " -- booked --" : null}
                  </option>
                  <option
                    disabled={bookedHour["13.00 - 15.00"] ? true : false}
                    value="13.00 - 15.00"
                  >
                    13.00 - 15.00{" "}
                    {bookedHour["13.00 - 15.00"] ? " -- booked --" : null}
                  </option>
                  <option
                    disabled={bookedHour["15.00 - 17.00"] ? true : false}
                    value="15.00 - 17.00"
                  >
                    15.00 - 17.00{" "}
                    {bookedHour["15.00 - 17.00"] ? " -- booked --" : null}
                  </option>
                  <option
                    disabled={bookedHour["17.00 - 19.00"] ? true : false}
                    value="17.00 - 19.00"
                  >
                    17.00 - 19.00{" "}
                    {bookedHour["17.00 - 19.00"] ? " -- booked --" : null}
                  </option>
                </select>
              </div>
              <div className="flex justify-center">
                <textarea
                  type="text"
                  name="address"
                  onChange={formHandler}
                  value={form.address}
                  id="address"
                  className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Address"
                  required
                />
              </div>

              <div className="flex content-center mt-2">
                <button
                  onClick={handleLocateButton}
                  className="self-center content-start mx-10 text-zinc-600 bg-transparent border-slate-300 border-2 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Find me!
                </button>
              </div>

              <div className="text-zinc-900 flex justify-center mb-2">
                {distance ? (
                  <span>
                    <span className="font-bold">Distance</span> : {distance} KM
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="text-zinc-900 flex justify-center mb-2">
                <span>
                  {price ? (
                    <span>
                      <span className="font-bold">Price</span> :{" "}
                      {priceFormatter(price)}{" "}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </div>

              <div className="flex justify-center mb-2">
                <button
                  type="submit"
                  className="w-3/4 mx-auto mt-2 text-white shadow-lg shadow-green-500/50 bg-green-300 hover:bg-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookForm;
