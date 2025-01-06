import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import chat_viz from './assets/chat_viz.json';
import './HourlyActivityChart.css';

const formatHour = (hour) => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12} ${ampm}`;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-time">{`${formatHour(label)}`}</p>
        {payload.map((entry, index) => (
          <p 
            key={index} 
            className="tooltip-value"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value.toLocaleString()} mensajes`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="custom-legend">
      {payload.map((entry, index) => (
        <div key={index} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: entry.color }} />
          <span className="legend-text">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const HourlyActivityChart = () => {
  // Combinar los datos de ambos usuarios
  const chartData = chat_viz.messageActivity.hourly.pollito.map((item, index) => ({
    hour: item.hour,
    Pollito: item.count,
    Héctor: chat_viz.messageActivity.hourly.Héctor[index].count
  }));

  return (
    <div className="chart-container">
      <h2 className="chart-title">
        Nuestros horarios
      </h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 5,
            }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffc0cb" />
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
              stroke="#F88FB0"
            />
            <YAxis 
              type="category"
              dataKey="hour"
              tickFormatter={formatHour}
              width={60}
              stroke="#F88FB0"
              tick={{ fill: '#F88FB0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="Pollito"
              fill="#F88FB0"
              name="Pollito"
              radius={[0, 4, 4, 0]}
            />
            <Bar
              dataKey="Héctor"
              fill="#4169E1"
              name="Héctor"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyActivityChart;