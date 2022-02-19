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
  hasOrder,
  isServiceSelected,
  postNewOrder,
  showRatingForm,
} from "../store/actionCreators/actionCreator";
import RatingModal from "../Components/RatingModal";

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
  const { location, service, barber } = useSelector((state) => state.data);
  console.log(location, service, barber) //
  console.log(form, `>>>form`);
  function handleNewOrder(e) {
    e.preventDefault();
    const payload = {
      date: new Date(form.date),
      hour: form.hour,
      address: form.address,
      price: price,
      lat: +position.lat,
      long: +position.lng,
      serviceId: 2,
      barberId: 2,
      city: location
    };
    dispatch(postNewOrder(payload))
    .then((data) => {
      console.log(data);
      dispatch(hasOrder(true));
      dispatch(isServiceSelected(false));
      dispatch(showRatingForm(true));
      navigate("/home");
    })
    .catch((err) => {
      console.log(err);
    })

   
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
        setPrice(Math.round((50_000 + distance * 5) / 1000) * 1000);
      }
    }
  }, [position]);

  useEffect(() => {
    if (location === '1') {
      setBarberPosition({
        lat: -6.250970, lng: 106.839584
      })
      setPosition({
        lat: -6.250970, lng: 106.839584
      })
    } else if(location === '2') {
      setBarberPosition({
        lat: -6.917359, lng: 107.606478
      })
      setPosition({
        lat: -6.917359, lng: 107.606478
      })
    }
  }, []);
console.log(form)
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
              address: data
            })
          })
          .catch((err) => {
            console.log(err);
          })
          
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
  console.log(typeof new Date(form.date), form.date)
  console.log();
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
              address: data
            })
          })
          .catch((err) => {
            console.log(err);
          })

    });
  }
  
  return (
    <>
      <div className="flex justify-center bg-zinc-800 pt-10 min-h-screen">
        {/* <Fade> */}
        <div className="m-auto">
          <form
            className="pb-4  space-y-2 lg:px-2 sm:pb-6 xl:pb-8"
            onSubmit={handleNewOrder}
          >
            <div className="flex justify-center tracking-widest">
              <h3 className="text-4xl font-light text-white dark:text-white pb-4">
                BOOK NOW
              </h3>
            </div>

            <div className="flex justify-center mb-2">
              <input
                onChange={formHandler}
                required
                value={form.date}
                name="date"
                type="date"
                className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="flex justify-center mb-2">
              <select
                defaultValue={"DEFAULT"}
                onChange={formHandler}
                required
                name="hour"
                className="bg-gray-50 border w-80 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 bloc p-2.5 dkark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              >
                <option value="08.00 - 10.00">08.00 - 10.00</option>
                <option value="10.00 - 12.00">10.00 - 12.00</option>
                <option value="13.00 - 15.00">13.00 - 15.00</option>
                <option value="15.00 - 17.00">15.00 - 17.00</option>
                <option value="17.00 - 19.00">17.00 - 19.00</option>
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
                placeholder="address"
                required
              />
            </div>

            <div className="justify-center mb-2 rounded-sm-2">
              <div className="flex content-center my-3">
                <button
                  onClick={handleLocateButton}
                  className=" self-center content-center mx-auto text-white bg-transparent border-white border-2 hover:bg-slate-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                <BarberMarker />

                <HandleCenter mapCenter={position} />
              </MapContainer>
            </div>
            <div className="text-white flex justify-center mb-2">
              {distance ? <span>Distance : {distance} KM</span> : ""}
            </div>
            <div className="text-white flex justify-center mb-2">
              <span>
                {price ? <span>Price : {priceFormatter(price)} </span> : ""}
              </span>
            </div>

            <div className="flex justify-center mb-2">
              <button
                type="submit"
                className="w-3/4 mx-auto mt-2 text-white bg-transparent border-white border-2 hover:bg-slate-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookForm;
