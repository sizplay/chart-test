/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { conversionDataForOneMonth } from './data';
import { color } from './color';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="pointer-events-none cursor-pointer border border-solid border-amber-100 bg-white p-2.5">
        <p>{`전환율: ${data.conversionRate}%`}</p>
      </div>
    );
  }

  return null;
};

const CustomCursor = (props: any) => {
  const { points, activeDotPos } = props;

  const startingPoint = points[0];
  const endingPoint = points[1];

  const [x1, y1] = [startingPoint?.x || 0, activeDotPos?.y || 0 + 10]; // adding 10 to y to prevent cursor from overlapping with active dot
  const [x2, y2] = [endingPoint.x, endingPoint.y];

  return (
    <svg x1={x1} y1={y1} x2={x2} y2={y2}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B5B5B5" strokeWidth={1} strokeDasharray="10 10" />
    </svg>
  );
};

const CustomActiveDot = (props: any) => {
  const { cx, cy, setActiveDotPos } = props;

  useEffect(() => {
    setActiveDotPos({ x: cx, y: cy });
  }, [cx, cy, setActiveDotPos]);

  return (
    <svg
      x={cx - 19.5254}
      y={cy - 16}
      width="39"
      height="38"
      viewBox="0 0 39 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_2239_157550)">
        <circle cx="19.5254" cy="16" r="8" fill="white" />
      </g>
      <circle cx="19.5256" cy="16" r="4.66667" fill="#3535F3" />
      <defs>
        <filter
          id="filter0_d_2239_157550"
          x="0.858724"
          y="-2.38419e-07"
          width="37.3333"
          height="37.3333"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.66667" />
          <feGaussianBlur stdDeviation="5.33333" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2239_157550" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2239_157550" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

const ConversionRechartComponent = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeDotPos, setActiveDotPos] = useState({ x: 0, y: 0 });
  // const [isHovering, setIsHovering] = useState(false);
  // const [tickIndex, setTickIndex] = useState(0);
  const [xAxisLineElements, setXAxisLineElements] = useState<NodeListOf<Element>>();

  const handleMouseOver = (e: any) => {
    // setTickIndex(e.index === 0 ? 0 : e.index / 2);
    // setIsHovering(true);
  };

  const handleMouseOut = () => {
    // setIsHovering(false);
  };

  useLayoutEffect(() => {
    const chart = chartRef.current;
    if (chart !== null) {
      const xAxisLineElements = chart.querySelectorAll('.recharts-cartesian-axis-tick-line');
      setXAxisLineElements(xAxisLineElements);
    }
  }, []);

  return (
    <div ref={chartRef}>
      <AreaChart width={1200} height={600} data={conversionDataForOneMonth} margin={{ bottom: 70, right: 50 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#34afe9" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#34afe9" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ stroke: color.white }}
          onMouseOver={handleMouseOver}
          interval={1}
          onMouseOut={handleMouseOut}
        />
        <YAxis tick={{ stroke: color.white }} domain={[0, 100]} />
        <Tooltip
          position={{ x: activeDotPos.x, y: activeDotPos.y }}
          cursor={<CustomCursor activeDotPos={activeDotPos} />}
          content={<CustomTooltip />}
        />
        <Area
          type="monotone"
          dataKey="conversionRate"
          stroke="#34afe9"
          fillOpacity={1}
          fill="none"
          activeDot={<CustomActiveDot setActiveDotPos={setActiveDotPos} />}
        />
        <Area type="monotone" dataKey="conversion" fillOpacity={1} fill="url(#colorUv)" />
        {conversionDataForOneMonth.map((data, index) => {
          const line = xAxisLineElements?.[index / 2] as SVGLineElement;
          const linePosition = line?.getBBox().x;

          if (data.event) {
            return (
              <>
                <svg x1={linePosition} y1="0" x2={linePosition} y2="500">
                  <line
                    x1={linePosition}
                    y1="0"
                    x2={linePosition}
                    y2="500"
                    stroke="#B5B5B5"
                    strokeWidth={1}
                    strokeDasharray="10 10"
                  />
                </svg>
                <svg key={data.date}>
                  <g>
                    <line
                      orientation="bottom"
                      width="1140"
                      height="30"
                      x={linePosition}
                      y="500"
                      stroke="#fff"
                      fill="none"
                      x1={linePosition}
                      y1="506"
                      x2={linePosition}
                      y2="500"
                    />
                    <rect x={linePosition - 30} y="530" width="60" height="30" rx="2" fill={color.white} />
                    <text x={linePosition - 26} y="548" fontSize="0.6em" fill="#666">
                      {data.event}
                    </text>
                  </g>
                </svg>
              </>
            );
          }
          return null;
        })}
      </AreaChart>
    </div>
  );
};

export default ConversionRechartComponent;
