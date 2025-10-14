import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface IndicatorSparklineProps {
  data: number[];
  color: string;
}

const IndicatorSparkline: React.FC<IndicatorSparklineProps> = ({
  data,
  color,
}) => {
  return (
    <div style={{ width: "100%", height: 36 }}>
      <Line
        data={{
          labels: data.map((_, i) => i + 1),
          datasets: [
            {
              data,
              borderColor: color,
              backgroundColor: color + "22",
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { display: false }, y: { display: false } },
          elements: { line: {} },
          layout: { padding: 0 },
        }}
      />
    </div>
  );
};

export default IndicatorSparkline;
