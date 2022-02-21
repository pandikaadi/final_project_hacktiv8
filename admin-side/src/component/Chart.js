import React from "react";
import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// Chart.register(...registerables);
import Chart from "chart.js/auto";

function BarChart() {
  const data = {
    labels: ["Total Barber", "Total Income", "Total Order", "Book Average"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
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
