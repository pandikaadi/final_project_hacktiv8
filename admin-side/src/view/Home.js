import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../component/Navbar";
import AdminModal from "../component/AdminModal";
import BarberModal from "../component/BarberModal";
import BarChart from "../component/Chart";
import { fetchBarber } from "../store/actionCreator/actionCreator";

function Home() {
  let totalIncome = 0;
  const dispatch = useDispatch();
  const { registerBarber, registerAdmin, loading, error } = useSelector(
    (state) => state.admin
  );
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

  function voteCounter(x) {
    let res = 0;
    let length = [];
    chartData.app.barbers.map((el) => {
      el.Votes.map((v) => {
        if (v.barberId == x) {
          length.push(v);
          res += v.value / length.length;
        }
      });
    });
    return res.toFixed(2);
  }

  useEffect(() => {
    dispatch(fetchBarber(localStorage.getItem("access_token")));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Somthing went wrong..</div>;
  }

  return (
    <>
      <Navbar />
      {registerAdmin && <AdminModal />}
      {registerBarber && <BarberModal />}
      <BarChart />
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
                          {incomeCounter(x.id)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
