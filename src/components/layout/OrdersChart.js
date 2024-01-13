import React from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import Chart from "chart.js/auto";
import { TimeScale, LinearScale, Filler, PointElement, LineElement } from "chart.js";
import "chartjs-adapter-moment";

Chart.register(TimeScale, LinearScale, Filler, PointElement, LineElement);

const OrdersChart = ({ orders,title,secondary }) => {
  if (!orders || orders.length === 0) {
    return <div>No order data available</div>;
  }

  // Group orders by month
  const groupByMonth = (array, key) => {
    return array.reduce((result, currentValue) => {
      const createdAt = moment(currentValue[key]);
      if (isValidDate(createdAt)) {
        const month = createdAt.startOf("month").toISOString();
        result[month] = result[month] || 0;
        result[month] += 1; // Increment by 1 for each order
      }
      return result;
    }, {});
  };

  const isValidDate = (date) => {
    return moment.isMoment(date) && date.isValid();
  };

  const monthlyOrders = groupByMonth(orders, "createdAt");

  // Generate labels for all months of the year
  const currentYear = moment().year();
  const monthLabels = Array.from({ length: 12 }, (_, i) => {
    const month = moment().year(currentYear).month(i).startOf("month").toISOString();
    return month;
  });

  // Prepare orders data for each month
  const ordersData = monthLabels.map((month) => monthlyOrders[month] || 0);

  // Chart data and options
  const data = {
    labels: monthLabels,
    datasets: [
      {
        data: ordersData,
        label: "Orders",
        backgroundColor: "rgba(52, 195, 143, 0.6)",
        borderColor: "rgba(52, 195, 143, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "MMM YYYY",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
          maxRotation: 0,
        },
        stepSize: 1,
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawTicks: false,
          borderDash: [5, 5],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return value + " Orders";
          },
        },
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
      <Bar height={300} data={data} options={options} />
      </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default OrdersChart;
