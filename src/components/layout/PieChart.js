import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);

const PieChart = ({ orders,title,secondary }) => {
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const order = groupBy(orders, "status");

  const data = {
    labels: Object.keys(order),
    datasets: [
      {
        data: Object.values(order).map((u) => u.length),
        label: "total",
        backgroundColor: [
          "rgba(52, 195, 143, 0.8)",
          "rgba(245, 40, 145, 0.8)",
          "rgba(97, 77, 245, 0.61)",
          "rgba(210, 141, 113, 0.61)",
          "rgba(210, 141, 39, 0.91)",
          "rgba(210, 69, 39, 0.91)",
          "rgba(23, 218, 23, 0.91)",
        ],
        borderColor: [
          "rgba(52, 195, 143, 0.8)",
          "rgba(245, 40, 145, 0.8)",
          "rgba(97, 77, 245, 0.61)",
          "rgba(210, 141, 113, 0.61)",
          "rgba(210, 141, 39, 0.91)",
          "rgba(210, 69, 39, 0.91)",
          "rgba(23, 218, 23, 0.91)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(52, 195, 143, 0.9)",
        hoverBorderColor: "rgba(52, 195, 143, 0.9)",
      },
    ],
  };

  const option = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-96">
        <div className="bg-white rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="mb-2">{title}</h2>
            <p className="text-gray-500 mb-4">{secondary}</p>
            <div className="pie-chart">
      <Pie height={300} data={data} options={option} />
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;