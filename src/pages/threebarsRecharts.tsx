/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
import { Bar, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import useIsCSR from '@/components/hooks/useIsCSR';
import { monthlyData } from '@/components/data';
import { color } from '@/components/color';
import { tooltipLinesFunc } from '@/components/utils/tooltipVisitorFunc';
import { CustomTooltip, VisitorsWrapper } from '@/components/hooks/useLineRechart';

const ThreebarsRecharts = () => {
  const isCSR = useIsCSR();
  if (!isCSR) return null;

  const newData = monthlyData.map((item) => {
    return {
      ...item,
      date1: item.date1,
      pageview: item.pageview - item.click - item.conversion,
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
      const visitorDate = payload[0]?.payload.date1 || '';
      const pageview = payload[0]?.payload.pageview ?? 0;
      const click = payload[0]?.payload.click;
      const conversion = payload[0]?.payload.conversion;
      const { firstDate } = tooltipLinesFunc(visitorDate);

      return (
        <div className={`bg-[${color.background}] rounded-sm p-4 shadow-md`}>
          <VisitorsWrapper>
            <h1>Visitors</h1>
            <p className="first">{firstDate}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>페이지뷰</p>
            <p>{`${(pageview / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>클릭</p>
            <p>{`${(click / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>전환</p>
            <p>{`${(conversion / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>전환율</p>
            <p>{`${((conversion / pageview) * 100).toFixed(1)}%`}</p>
          </VisitorsWrapper>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen w-full justify-center bg-[#181c31] px-4 pb-0 pt-12">
      <ComposedChart
        width={1200}
        height={600}
        data={newData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Legend verticalAlign="top" height={36} wrapperStyle={{ color: color.white }} />
        <Tooltip cursor={false} content={customTooltip} />
        <XAxis dataKey="date1" tick={{ stroke: color.white }} />
        <YAxis tickFormatter={handleFormatYAxis} tick={{ stroke: color.white }} yAxisId="left" domain={[0, 10000]} />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'Conversion Rate', angle: 90, position: 'insideRight' }}
          tick={{ fontSize: 12, stroke: color.white }} // Customize the tick font size
          tickFormatter={(tickItem: any) => `${tickItem}%`} // Customize the tick format
          domain={[0, 100]}
        />

        <Bar dataKey="conversion" stackId="a" fill="#82b1d0" yAxisId="left" />
        <Bar dataKey="click" stackId="a" fill="#4f9acd" yAxisId="left" />
        <Bar dataKey="pageview" stackId="a" fill="#2289cd" yAxisId="left" />
        <Line type="linear" dataKey="conversionRate" stroke={color.white} strokeWidth={5} dot={false} yAxisId="right" />
      </ComposedChart>
    </div>
  );
};

export default ThreebarsRecharts;
