/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip } from 'recharts';
import styled from '@emotion/styled';
import useIsCSR from '@/components/hooks/useIsCSR';
import { Container } from '@/components/utils/Container';
import { color } from '@/components/color';
import { CustomTooltip, VisitorsWrapper } from '@/components/hooks/useLineRechart';

const data = [
  {
    name: 'Visit /register',
    prev: 0,
    current: 100,
    visitors: 5187,
    visitorsPercentage: 3.82,
    never: 130446,
    neverPercentage: 96.18,
  },
  {
    name: 'Signup',
    prev: 100 - 33.78,
    current: 33.78,
    visitors: 1752,
    visitorsPercentage: 33.78,
    never: 3435,
    neverPercentage: 66.22,
  },
  {
    name: 'Visit /activate',
    prev: 33.78 - 31.44,
    current: 31.44,
    visitors: 1631,
    visitorsPercentage: 93.09,
    never: 121,
    neverPercentage: 6.91,
  },
  {
    name: 'Visit /sites/new',
    prev: 31.44 - 30.15,
    current: 30.15,
    visitors: 1564,
    visitorsPercentage: 95.89,
    never: 67,
    neverPercentage: 4.11,
  },
];

const BarRecharts = () => {
  const isCSR = useIsCSR();
  if (!isCSR) return null;

  const customLabel = (props: any) => {
    const { x, y, value } = props;

    const myData = data.find((item) => item.current === value);
    const visitors = myData?.visitors ? `(${(myData.visitors / 1000).toFixed(1)}k Visitors)` : '(0k Visitors)';
    if (value > 90) {
      return (
        <g>
          <rect x={x + 50} y={y + 20} width={130} height={60} fill="#191d36" rx={5} />
          <text x={x + 115} y={y + 40} fill={color.white} textAnchor="middle" dominantBaseline="middle">
            <tspan x={x + 115} dy={0}>
              {value}%
            </tspan>
            <tspan x={x + 115} dy={20}>
              {visitors}
            </tspan>
          </text>
        </g>
      );
    }

    return (
      <g>
        <rect x={x + 50} y={y - 30} width={130} height={60} fill="#191d36" rx={5} style={{ zIndex: 100 }} />
        <text
          x={x + 115}
          y={y + 40}
          fill={color.white}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ zIndex: 100 }}
        >
          <tspan x={x + 115} dy={-47.5}>
            {value}%
          </tspan>
          <tspan x={x + 115} dy={20}>
            {visitors}
          </tspan>
        </text>
      </g>
    );
  };

  const tempLabel = (label: string) => {
    if (label === 'Visit /register') return 'Visit /register';
    if (label === 'Signup') return 'Visit /register -> Signup';
    if (label === 'Visit /activate') return 'Signup -> Visit /activate';
    return 'Visit /activate -> Visit /sites/new';
  };

  const customTooltip = (props: any) => {
    const { active, payload, label } = props;

    const info = payload[0]?.payload;

    const firstLabel = label === 'Visit /register' ? 'Entered the funnel' : 'Visitors';
    const secondLabel = label === 'Visit /register' ? 'Never entered the funnel' : 'Dropoff';

    if (active) {
      return (
        <CustomTooltip>
          <VisitorsWrapper>
            <h1>{tempLabel(label)}</h1>
          </VisitorsWrapper>
          <CustomTooltipUnderLine />
          <TooltipContentWrapper>
            <p>{firstLabel}</p>
            <p>{info?.visitors?.toLocaleString()}</p>
            <p>{info?.visitorsPercentage}%</p>
          </TooltipContentWrapper>
          <TooltipContentWrapper>
            <p>{secondLabel}</p>
            <p>{info?.never?.toLocaleString()}</p>
            <p>{info?.neverPercentage}%</p>
          </TooltipContentWrapper>
        </CustomTooltip>
      );
    }
    return <></>;
  };

  return (
    <Container>
      <BarContainer>
        <BarChart
          width={1200}
          height={600}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Tooltip cursor={false} content={customTooltip} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: color.white }} />
          <YAxis domain={[0, 100]} hide={true} />

          <defs>
            <linearGradient id="gradientBar" x1="0" y1="" x2="0" y2="1">
              <stop offset="5%" stopColor="#5459e2" stopOpacity={1} />
              <stop offset="95%" stopColor="#5459e2" stopOpacity={0.6} />
            </linearGradient>
          </defs>

          <defs>
            <pattern id="combPattern" patternUnits="userSpaceOnUse" width={10} height={10}>
              <line x1="0" y1="0" x2="20" y2="20" stroke="#5c5e61" strokeWidth="1" />
            </pattern>
          </defs>

          <Bar dataKey="current" stackId="a" fill="url(#gradientBar)">
            <LabelList dataKey="current" position="insideTop" content={customLabel} />
          </Bar>
          <Bar dataKey="prev" stackId="a" fill="url(#combPattern)" />
        </BarChart>
      </BarContainer>
    </Container>
  );
};

export default BarRecharts;

const BarContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #212a37;
`;

const CustomTooltipUnderLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${color.gray};
  margin: 16px 0;
`;

const TooltipContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;

  p {
    font-size: 14px;
    font-weight: 600;
    color: ${color.white};
    margin: 6px 0 0;
    text-align: right;
    justify-self: flex-end;

    &:first-of-type {
      justify-self: flex-start;
      text-align: left;
    }
  }
`;
