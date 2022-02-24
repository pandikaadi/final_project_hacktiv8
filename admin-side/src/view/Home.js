import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../component/Navbar";
import AdminModal from "../component/AdminModal";
import BarberModal from "../component/BarberModal";
import BarChart from "../component/Chart";
import { fetchBarber } from "../store/actionCreator/actionCreator";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Home() {
  const dispatch = useDispatch();
  const { registerBarber, registerAdmin, loading, error } = useSelector(
    (state) => state.admin
  );
  const iconMarkupBarber = renderToStaticMarkup(
    <i className=" fa fa-map-marker-alt fa-3x" />
  );
  const customMarkerIconBarber = divIcon({
    html: iconMarkupBarber,
  });
  const { chartData } = useSelector((state) => state.data);
  function incomeCounter(x) {
    let res = 0;
    chartData.app.barbers.map((el) => {
      el.Orders.map((v) => {
        if (v.barberId == x) {
          res += v.price;
        }
      });
    });
    return res;
  }

  function currencyFormat(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  function voteCounter(x) {
    let res = 0;
    let length = [];
    chartData.app.barbers.map((el) => {
      let total = 0;
      el.Votes.map((v) => {
        if (v.barberId == x) {
          length.push(v);
          total += v.value;
        }
      });
      if (el.id == x) {
        res = total / length.length;
      }
    });
    if (res) {
      return res.toFixed(2);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    dispatch(fetchBarber(localStorage.getItem("access_token")));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center h-screen">
        <img className="m-auto" src={require("../assets/loading.gif")} />
      </div>
    );
  }
  if (error) {
    return <div>Somthing went wrong..</div>;
  }
  function LocationMarker({ position, orderKey }) {
    return position === null ? null : (
      <Marker icon={customMarkerIconBarber} position={position}>
        <Popup>orderKey: {orderKey}</Popup>
      </Marker>
    );
  }

  return (
    <>
      <Navbar />
      {registerAdmin && <AdminModal />}
      {registerBarber && <BarberModal />}
      <BarChart chartData={chartData} />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Order
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Vote Average
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Income
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.app.barbers.map((x, i) => (
                    <tr key={x.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="capitalize text-gray-900 whitespace-no-wrap text-center">
                          {i + 1}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {x.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {x.Orders.length}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {voteCounter(x.id)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap text-center">
                          {currencyFormat(incomeCounter(x.id))}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col content-center items-center">
          <div className="text-gray-600 mb-5">TRACK ORDERS AND BARBERS</div>
          <div className="w-full content-center mb-10 rounded items-center flex flex-row">
            <div className="border-2 rounded p-5 ml-auto h-fit  w-1/4 border-gray-700 text-gray-700 flex flex-col">
              <div className="text-center mb-2">
                <span className="">LEGEND</span>
              </div>
              <div className="text-center mb-2">
                <span className="">
                  <i className=" fa fa-map-marker-alt fa-2x mr-3" />
                  <span> ORDER</span>
                </span>
              </div>
              <div className="text-center">
                <span className="">
                  <i className=" fa fa-map-marker-alt text-blue-500 fa-2x mr-3" />
                  <span> BARBER</span>
                </span>
              </div>
            </div>
            <MapContainer
              center={[-6.9155624, 107.6517627]}
              style={{ height: 400, width: "100%" }}
              id="mapid"
              zoom={11}
              className="max-w-2xl mx-auto"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {chartData.app.orders.map((e) => (
                <LocationMarker
                  orderKey={e.orderKey}
                  position={{ lat: e.lat, lng: e.long }}
                />
              ))}
              {/* <LocationMarker />
                      <BarberMarker />
                      
                      <HandleCenter mapCenter={position} /> */}
              {chartData.app.barbers.map((e) => (
                <Marker position={{ lat: e.lat, lng: e.long }}>
                  <Popup position={{ lat: e.lat, lng: e.long }}>{e.name}</Popup>
                </Marker>
              ))}
              {/* <LocationMarker />
                      <BarberMarker />
                      
                      <HandleCenter mapCenter={position} /> */}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
