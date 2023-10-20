/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
import { Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";
import { color } from "./color";

import { tooltipLinesFunc } from "./utils/tooltipVisitorFunc";
import { monthlyData } from "./data";

const wrapperStyle = "flex items-center justify-between";
const pStyle = "mr-2.5 text-sm text-black";

const style = {
  wrapperStyle,
  pStyle,
};

const CustomCursor = (e: any) => {
  const { points } = e;
  return (
    <svg>
      <g>
        <rect
          x={points[0].x - 15}
          y={points[0].y}
          width={30}
          height={points[1].y - points[0].y}
          fill="#d6d1d1"
          fillOpacity={0.5}
        />
      </g>
    </svg>
  );
};

const ThreeBarsLineRechartComponent = () => {
  const newData = monthlyData.map((item) => {
    return {
      ...item,
      date1: item.date1,
      pageview: item.pageview,
      click: item.click,
      conversion: item.conversion,
      conversionRate: ((item.conversion / item.pageview) * 100).toFixed(1),
    };
  });
  const handleFormatYAxis = (tickItem: any) => {
    return `${(tickItem / 1000).toFixed(1)}k`;
  };

  const customTooltip = (props: any) => {
    const { active, payload } = props;

    if (active) {
      const visitorDate = payload[0]?.payload.date1 || "";
      const pageview = payload[0]?.payload.pageview ?? 0;
      const click = payload[0]?.payload.click;
      const conversion = payload[0]?.payload.conversion;
      const { firstDate } = tooltipLinesFunc(visitorDate);

      return (
        <div className="rounded-sm bg-white p-4 shadow-md">
          <div className={wrapperStyle}>
            <h1 className="mr-2.5 text-xl font-semibold text-black">Visitors</h1>
            <p className="mr-2.5 text-sm text-gray-800">{firstDate}</p>
          </div>
          <div className={style.wrapperStyle}>
            <p className={style.pStyle}>페이지뷰</p>
            <p className={style.pStyle}>{`${(pageview / 1000).toFixed(1)}k`}</p>
          </div>
          <div className={style.wrapperStyle}>
            <p className={style.pStyle}>클릭</p>
            <p className={style.pStyle}>{`${(click / 1000).toFixed(1)}k`}</p>
          </div>
          <div className={style.wrapperStyle}>
            <p className={style.pStyle}>전환</p>
            <p className={style.pStyle}>{`${(conversion / 1000).toFixed(1)}k`}</p>
          </div>
          <div className={style.wrapperStyle}>
            <p className={style.pStyle}>전환율</p>
            <p className={style.pStyle}>{`${((conversion / pageview) * 100).toFixed(1)}%`}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ComposedChart
      width={1200}
      height={600}
      data={newData}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <Legend verticalAlign="top" height={36} wrapperStyle={{ color: color.blue }} />
      <Tooltip content={customTooltip} cursor={<CustomCursor />} />
      <XAxis dataKey="date1" tick={{ stroke: color.blue }} />
      <YAxis tickFormatter={handleFormatYAxis} tick={{ stroke: color.blue }} yAxisId="left" domain={[0, 10000]} />
      <YAxis
        yAxisId="right"
        orientation="right"
        label={{ value: "Conversion Rate", angle: 90, position: "insideRight" }}
        tick={{ fontSize: 12, stroke: color.blue }}
        tickFormatter={(tickItem: any) => `${tickItem}%`}
        domain={[0, 100]}
      />
      <Bar dataKey="pageview" fill="#e5868a" yAxisId="left" barSize={7} />
      <Bar dataKey="click" fill="#f5d8a5" yAxisId="left" barSize={7} />
      <Bar dataKey="conversion" fill="#b8a605" yAxisId="left" barSize={7} />
      <Line type="linear" dataKey="conversionRate" stroke="#a734e9" strokeWidth={3} dot={false} yAxisId="right" />
    </ComposedChart>
  );
};

export default ThreeBarsLineRechartComponent;
