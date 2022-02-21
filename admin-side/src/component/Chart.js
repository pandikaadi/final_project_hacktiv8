import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function BarChart() {
  let totalIncome = 0;
  let totalVote = 0;
  const { chartData } = useSelector((state) => state.data);

  const totalBarber = chartData.app.barbers.length;
  const totalOrder = chartData.app.orders.length;

  chartData.app.orders.map((el) => {
    return (totalIncome += el.price);
  });

  chartData.app.votes.map((el) => {
    return (totalVote += el.value);
  });

  const data = {
    labels: ["Total Barber", "Total Income", "Total Order", "Vote Average"],
    datasets: [
      {
        label: "# of Votes",
        data: [totalBarber, totalIncome, totalOrder, totalVote / totalOrder],
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
  };

  return (
    <>
      <div style={{ width: "500px", margin: "0 auto" }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}

export default BarChart;
