/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { color } from './color';
import { tooltipLinesFunc } from './utils/tooltipVisitorFunc';
import { indicatedTitles, monthlyData } from './data';

const legendData = {
  users: '유저수',
  pageview: '노출수',
  click: '클릭',
  conversion: '전환',
  clickRate: '클릭율',
  conversionRate: '전환율',
};

const wrapperStyle = 'flex items-center justify-between';
const pStyle = 'mr-2.5 text-sm text-black';

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
          fill="#acacac"
          fillOpacity={0.5}
        />
      </g>
    </svg>
  );
};

interface FourBarsLineRechartComponentProps {
  selections: {
    [key: string]: boolean;
  };
}

const FourBarsLineRechartComponent = ({ selections }: FourBarsLineRechartComponentProps) => {
  const newData = monthlyData.map((item) => {
    return {
      ...item,
      date1: item.date1,
      pageview: item.pageview,
      click: item.click,
      conversion: item.conversion,
      clickRate: ((item.click / item.pageview) * 100).toFixed(1),
      conversionRate: ((item.conversion / item.pageview) * 100).toFixed(1),
    };
  });
  const handleFormatYAxis = (tickItem: any) => {
    return `${(tickItem / 1000).toFixed(1)}k`;
  };

  const customTooltip = (props: any) => {
    const { active, payload } = props;

    if (active && payload) {
      const visitorDate = payload[0]?.payload.date1 || '';
      const users = payload[0]?.payload.users ?? 0;
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
          {selections[indicatedTitles.TOTAL_SENT] && (
            <div className={style.wrapperStyle}>
              <p className={style.pStyle}>유저수</p>
              <p className={style.pStyle}>{`${(users / 1000).toFixed(1)}k`}</p>
            </div>
          )}
          {selections[indicatedTitles.TOTAL_IMPRESSION] && (
            <div className={style.wrapperStyle}>
              <p className={style.pStyle}>페이지뷰</p>
              <p className={style.pStyle}>{`${(pageview / 1000).toFixed(1)}k`}</p>
            </div>
          )}
          {selections[indicatedTitles.TOTAL_CLICK] && (
            <div className={style.wrapperStyle}>
              <p className={style.pStyle}>클릭</p>
              <p className={style.pStyle}>{`${(click / 1000).toFixed(1)}k`}</p>
            </div>
          )}
          {selections[indicatedTitles.CTR] && (
            <div className={style.wrapperStyle}>
              <p className={style.pStyle}>클릭률</p>
              <p className={style.pStyle}>{`${((click / pageview) * 100).toFixed(1)}%`}</p>
            </div>
          )}
          {selections[indicatedTitles.TOTAL_CONVERSION] && (
            <div className={style.wrapperStyle}>
              <p className={style.pStyle}>전환</p>
              <p className={style.pStyle}>{`${(conversion / 1000).toFixed(1)}k`}</p>
            </div>
          )}
          {selections[indicatedTitles.CVR] && (
            <div className={style.wrapperStyle}>
              <p className={style.pStyle}>전환율</p>
              <p className={style.pStyle}>{`${((conversion / pageview) * 100).toFixed(1)}%`}</p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const handleGraphs = (selections: any) => {
    return (
      <>
        {selections[indicatedTitles.TOTAL_SENT] && <Bar dataKey="users" fill="#9ac8dc" yAxisId="left" barSize={7} />}
        {selections[indicatedTitles.TOTAL_IMPRESSION] && (
          <Bar dataKey="pageview" fill="#e5868a" yAxisId="left" barSize={7} />
        )}
        {selections[indicatedTitles.TOTAL_CLICK] && <Bar dataKey="click" fill="#f5d8a5" yAxisId="left" barSize={7} />}
        {selections[indicatedTitles.CTR] && (
          <Line type="linear" dataKey="clickRate" stroke="#389333" strokeWidth={3} dot={false} yAxisId="right" />
        )}
        {selections[indicatedTitles.TOTAL_CONVERSION] && (
          <Bar dataKey="conversion" fill="#b8a605" yAxisId="left" barSize={7} />
        )}
        {selections[indicatedTitles.CVR] && (
          <Line type="linear" dataKey="conversionRate" stroke="#a734e9" strokeWidth={3} dot={false} yAxisId="right" />
        )}
      </>
    );
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    console.log(payload);
    return (
      <ul className="flex items-center justify-center">
        {payload.map((entry: any, index: any) => {
          console.log(entry);
          return (
            <li key={`item-${index}`} style={{ color: entry.color }} className="m-2">
              {legendData[entry.value as keyof typeof legendData]}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <ResponsiveContainer height={600} width="100%" className="">
      <ComposedChart
        data={newData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: color.blue }} content={renderLegend} />
        <Tooltip content={customTooltip} cursor={<CustomCursor />} />
        <XAxis dataKey="date1" tick={{ fontSize: 14, stroke: '#9CA3AF', strokeWidth: 0.1 }} />
        <YAxis
          tickFormatter={handleFormatYAxis}
          tick={{ fontSize: 14, stroke: '#9CA3AF', strokeWidth: 0.1 }}
          yAxisId="left"
          domain={[0, 10000]}
          label={{ value: '유저수', angle: 90, position: 'insideLeft' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: '전환율', angle: 90, position: 'insideRight' }}
          tick={{ fontSize: 14, stroke: '#9CA3AF', strokeWidth: 0.1 }}
          tickFormatter={(tickItem: any) => `${tickItem}%`}
          domain={[0, 100]}
        />
        {/* <Bar dataKey="users" fill="#9ac8dc" yAxisId="left" barSize={7} />
        <Bar dataKey="pageview" fill="#e5868a" yAxisId="left" barSize={7} />
        <Bar dataKey="click" fill="#f5d8a5" yAxisId="left" barSize={7} />
        <Bar dataKey="conversion" fill="#b8a605" yAxisId="left" barSize={7} />
        <Line type="linear" dataKey="clickRate" stroke="#389333" strokeWidth={3} dot={false} yAxisId="right" />
        <Line type="linear" dataKey="conversionRate" stroke="#a734e9" strokeWidth={3} dot={false} yAxisId="right" /> */}
        {handleGraphs(selections)}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default FourBarsLineRechartComponent;
