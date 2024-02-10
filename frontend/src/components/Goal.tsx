import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface GoalProps<T> {
  height?: string;
  labels?: string[];
  label?: string;
  data?: T[];
}

export default function Goal<T>({
  height,
  labels,
  label,
  data,
}: Readonly<GoalProps<T>>) {
  const backgroundColor = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(0, 255, 0, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
  ];
  const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

  return (
    <div className={`${height}`}>
      <Pie
        data={{
          labels,
          datasets: [
            { label, data, backgroundColor, borderColor, borderWidth: 1 },
          ],
        }}
        options={{ plugins: { legend: { display: false } } }}
      />
    </div>
  );
}
