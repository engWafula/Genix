// import React from "react";
// import Chart from "react-apexcharts";

// function PieChart({ title, secondary, data }) {
//   // Map boolean values to labels
//   const statuses = data.map((item) => (item.paid ? "Paid" : "Not Paid"));
//   const counts = getStatusCounts(statuses);

//   const options = {
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//     labels: Object.keys(counts),
//   };

//   const series = Object.values(counts);

//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full md:w-96">
//         <div className="bg-white rounded-lg overflow-hidden">
//           <div className="p-6">
//             <h2 className="mb-2">{title}</h2>
//             <p className="text-gray-500 mb-4">{secondary}</p>
//             <div className="pie-chart">
//               <Chart options={options} series={series} type="pie" height={400} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Helper function to count occurrences of each status
// function getStatusCounts(statuses) {
//   return statuses.reduce((counts, status) => {
//     counts[status] = (counts[status] || 0) + 1;
//     return counts;
//   }, {});
// }

// export default PieChart;



import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);

const PieChart = ({ orders,title,secondary }) => {
    // const dataInfo = orders?.map((item) => (item.paid ? {sat"Paid"} : "Not Paid"));

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };


  const order = groupBy(orders, "paid");

  const data = {
    labels: Object.keys(order).map((status) => (status === 'true' ? 'Paid' : 'Not Paid')),
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




