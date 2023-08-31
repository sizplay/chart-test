import React, { useEffect, useState } from 'react';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Bar } from '@visx/shape';
import { useSpring, animated } from 'react-spring';
import { devicesData, sizeData } from '@/components/data';
import { Container } from '@/components/utils/Container';

const data1 = devicesData;

const width = 1200;
const height = 600;
const margin = { top: 20, right: 200, bottom: 40, left: 20 }; // Adjusted left margin for labels

const BarChart = () => {
  const [data, setData] = useState(data1);
  const [barWidth, setBarWidth] = useState(0);
  const AnimatedBar = animated(Bar);

  useEffect(() => {
    if (data.length === 9) {
      setBarWidth(height - margin.bottom);
    }

    if (data.length === 4) {
      setBarWidth(height - margin.bottom - 300);
    }
  }, [barWidth, data.length]);

  const yScale = scaleBand({
    domain: data.map((d) => d.type),
    range: [margin.top, barWidth],
    padding: 0.2,
  });

  const xScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.visitors))],
    range: [margin.left, width - margin.right],
  });

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
  });

  const handleChangeData = () => {
    if (data.length === 9) {
      setData(sizeData);
    }
    if (data.length === 4) {
      setData(devicesData);
    }
  };

  return (
    <Container>
      <button type="button" onClick={handleChangeData}>
        데이터 변경
      </button>
      <svg width={width} height={height}>
        {data.map((d) => (
          <g key={d.type}>
            <AnimatedBar
              x={margin.left}
              y={yScale(d.type)}
              width={scale.to((s) => s * (xScale(d.visitors) - margin.left))}
              height={yScale.bandwidth()}
              fill="#007acc"
            />
            {/* Add labels */}
            <text
              x={margin.left + 5}
              y={yScale(d?.type) || 0 + yScale.bandwidth() / 2}
              dy="1.9em"
              textAnchor="start"
              fill="white"
            >
              {d.type}
            </text>
            <text
              x={margin.left + 1050}
              y={yScale(d?.type) || 0 + yScale.bandwidth() / 2}
              dy="1.9em"
              textAnchor="end"
              fill="white"
            >
              {d.visitors}
            </text>
            <text
              x={margin.left + 1120}
              y={yScale(d?.type) || 0 + yScale.bandwidth() / 2}
              dy="1.9em"
              textAnchor="end"
              fill="white"
            >
              {d.percentage}%
            </text>
          </g>
        ))}
      </svg>
    </Container>
  );
};

export default BarChart;
