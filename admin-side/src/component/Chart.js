import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function BarChart({ chartData }) {
  let totalIncome = 0;
  let totalVote = 0;
  const { loading, error } = useSelector((state) => state.admin);

  const totalBarber = chartData.app.barbers.length;
  const totalOrder = chartData.app.orders.length;
  const totalUser = chartData.users.length;

  chartData.app.orders.map((el) => {
    return (totalIncome += el.price);
  });

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

  const data = {
    labels: ["Total Barber", "Total Users", "Total Order", "Total Vote"],
    datasets: [
      {
        data: [totalBarber, totalUser, totalOrder, chartData.app.votes.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        labels: false,
      },
    },
  };

  return (
    <>
      <div className="flex flex-row">
        <div style={{ width: "700px", margin: "0 auto" }}>
          <Bar data={data} options={options} />
        </div>
        <div style={{ width: "340px", margin: "0 auto" }}>
          <Pie data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default BarChart;
