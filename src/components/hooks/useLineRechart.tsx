/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { Area, Line } from 'recharts';
import { useEffect, useState } from 'react';
import { color } from '../color';
import { twoMonthsData } from '../data';

const useLineRechart = () => {
  const [data, setData] = useState<any[]>(twoMonthsData);

  useEffect(() => {
    if (!data) {
      setData(twoMonthsData);
    }
  }, [data]);

  const handleLineFormatYAxis = (tickItem: any) => {
    return `${(tickItem / 1000).toFixed(1)}k`;
  };

  const lineCustomTooltip = (props: any) => {
    const { active, payload } = props;
    if (active) {
      const visitorDate1 = payload[0].payload.date1;
      const visitorDate2 = payload[1].payload.date2;

      const visitor1 = payload[0].value;
      const visitor2 = payload[1].value;

      const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const date1 = new Date(visitorDate1);
      const date2 = new Date(visitorDate2);

      const day1 = weekday[date1.getDay()];
      const day2 = weekday[date2.getDay()];

      const month1 = month[date1.getMonth() + 1];
      const month2 = month[date2.getMonth() + 1];

      const dateDay1 = date1.getDate();
      const dateDay2 = date2.getDate();

      const firstDate = `${day1}, ${dateDay1} ${month1}`;
      const secondDate = `${day2}, ${dateDay2} ${month2}`;

      const visitorPercentage = Math.floor((visitor1 / visitor2) * 100 - 100);

      return (
        <CustomTooltip>
          <VisitorsWrapper>
            <h1>Visitors</h1>
            <p>{visitorPercentage > 0 ? `+${visitorPercentage}%` : `${visitorPercentage}%`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p className="first">{firstDate}</p>
            <p>{`${(visitor1 / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p className="first">{secondDate}</p>
            <p>{`${(visitor2 / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <LastText>Click to view day</LastText>
        </CustomTooltip>
      );
    }

    return null;
  };

  const handleLineChangeSelect = (e: any) => {
    if (e.target.value === 'monthly') {
      setData(twoMonthsData);
    }
    if (e.target.value === 'weekly1') {
      setData(twoMonthsData.slice(0, 7));
    }
    if (e.target.value === 'weekly2') {
      setData(twoMonthsData.slice(7, 14));
    }
    if (e.target.value === 'weekly3') {
      setData(twoMonthsData.slice(14, 21));
    }
    if (e.target.value === 'weekly4') {
      setData(twoMonthsData.slice(21));
    }
  };

  const LineChildren = (
    <>
      <defs>
        <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color.gradientLow} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color.gradientHigh} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area type="linear" dataKey="area" fill="url(#colorArea)" stroke="none" />
      <Line type="linear" dataKey="line" stroke={color.gridLine} strokeWidth={5} dot={false} />
    </>
  );

  return {
    handleLineFormatYAxis,
    lineCustomTooltip,
    LineChildren,
    data,
    handleLineChangeSelect,
  };
};

export default useLineRechart;

export const CustomTooltip = styled.div`
  background-color: ${color.background};
  border-radius: 1px;
  padding: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const VisitorsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 14px;
    font-weight: 600;
    color: ${color.white};
    margin: 10px 0 0;

    &.first {
      color: ${color.gray};
      margin-right: 10px;
    }
  }
  h1 {
    font-size: 20px;
    font-weight: 600;
    color: ${color.white};
    &:first-of-type {
      margin-right: 10px;
    }
  }
`;

export const LastText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${color.white};
  margin: 10px 0 0;
  text-align: left;
`;
