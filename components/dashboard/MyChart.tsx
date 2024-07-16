import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(...registerables);

const MyChart = () => {
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 20,
        maxBarThickness: 20,
        minBarLength: 2,
        data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
        backgroundColor: ["rgba(48, 99, 233, 1)"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    fill: {
      colors: ["#3063E9"],
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(48, 99, 233, 1)",
        fill: "start",
        backgroundColor: "rgba(48, 99, 233, 1)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[#1B1A1A] text-xl font-WorkSans font-medium leading-6">
            Analysis
          </h1>
          <div className="flex items-center gap-[0.47rem]">
            <h2 className="text-[#898989] text-sm font-WorkSans font-medium leading-4">
              This week
            </h2>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-[#898989] text-xs font-WorkSans font-medium leading-4"
            />
          </div>
        </div>
        <div>
          <Bar data={data} height={140} options={options} />
        </div>
      </div>
    </div>
  );
};

export default MyChart;
