/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Line } from "recharts";
import { color } from "../color";
import { monthlyData } from "../data";
import { tooltipLinesFunc } from "../utils/tooltipVisitorFunc";

const useAreaRechart = () => {
  const [data, setData] = useState<any[]>(monthlyData);

  useEffect(() => {
    if (!data) {
      setData(monthlyData);
    }
  }, [data]);

  const handleAreaFormatYAxis = (tickItem: any) => {
    return `${(tickItem / 1000).toFixed(1)}k`;
  };

  const AreaCustomTooltip = (props: any) => {
    const { active, payload } = props;

    if (active) {
      const visitorDate = payload[0]?.payload.date1 || "";
      const pageview = payload[0]?.value;
      const screen = payload[1]?.value;
      const click = payload[2]?.value;
      const { firstDate } = tooltipLinesFunc(visitorDate);

      return (
        <CustomTooltip>
          <VisitorsWrapper>
            <h1>Visitors</h1>
            <p className="first">{firstDate}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>페이지뷰</p>
            <p>{`${(pageview / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>노출</p>
            <p>{`${(screen / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <VisitorsWrapper>
            <p>클릭</p>
            <p>{`${(click / 1000).toFixed(1)}k`}</p>
          </VisitorsWrapper>
          <LastText>Click to view day</LastText>
        </CustomTooltip>
      );
    }

    return null;
  };

  const handleChangeSelect = (e: any) => {
    if (e.target.value === "monthly") {
      setData(monthlyData);
    }
    if (e.target.value === "weekly1") {
      setData(monthlyData.slice(0, 7));
    }
    if (e.target.value === "weekly2") {
      setData(monthlyData.slice(7, 14));
    }
    if (e.target.value === "weekly3") {
      setData(monthlyData.slice(14, 21));
    }
    if (e.target.value === "weekly4") {
      setData(monthlyData.slice(21));
    }
  };

  const AreaChildren = (
    <>
      <Line type="linear" dataKey="pageview" stroke={color.line1} strokeWidth={5} dot={false} />
      <Line type="linear" dataKey="screen" stroke={color.line2} strokeWidth={5} dot={false} />
      <Line type="linear" dataKey="click" stroke={color.line3} strokeWidth={5} dot={false} />
    </>
  );

  return {
    handleAreaFormatYAxis,
    AreaCustomTooltip,
    handleChangeSelect,
    data,
    AreaChildren,
  };
};

export default useAreaRechart;

const CustomTooltip = styled.div`
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
      transform: translateY(-5px);
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
  color: ${color.gray};
  margin: 10px 0 0;
  text-align: left;
`;
