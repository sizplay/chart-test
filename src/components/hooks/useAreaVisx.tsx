/* eslint-disable @typescript-eslint/no-explicit-any */
import { LinearGradient } from '@visx/gradient';
import { AnimatedAreaSeries, AnimatedLineSeries } from '@visx/xychart';
import styled from '@emotion/styled';
import { twoMonthsData } from '../data';
import { color } from '../color';
import { tooltipVisitorFunc } from '../utils/tooltipVisitorFunc';
import { LastText, VisitorsWrapper } from './useAreaRechart';

const useAreaVisx = () => {
  const data1 = twoMonthsData.map((item) => {
    return {
      ...item,
      x: item.date1,
      y: item.area,
    };
  });

  const data2 = twoMonthsData.map((item) => {
    return {
      ...item,
      x: item.date1,
      y: item.line,
    };
  });

  const accessors = { xAccessor: (d: any) => d.x, yAccessor: (d: any) => d.y };

  const handleRenderTooltip = ({ tooltipData }: any) => {
    const { datumByKey } = tooltipData;
    const { area, line } = datumByKey;

    const visitorDate1 = area.datum.date1;
    const visitorDate2 = line.datum.date2;

    const visitor1 = area.datum.area;
    const visitor2 = line.datum.line;

    const { firstDate, secondDate, visitorPercentage } = tooltipVisitorFunc({
      visitorDate1,
      visitorDate2,
      visitor1,
      visitor2,
    });

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
  };

  const children = (
    <>
      <LinearGradient from={color.gradientLow} to={color.gradientHigh} id="gradient" />
      <AnimatedAreaSeries dataKey="area" data={data1} {...accessors} fill="url(#gradient)" renderLine={false} />
      <AnimatedLineSeries dataKey="line" data={data2} {...accessors} stroke={color.gridLine} strokeWidth={4} />
    </>
  );

  return {
    handleRenderTooltip,
    children,
  };
};

export default useAreaVisx;

const CustomTooltip = styled.div`
  padding: 16px;
  border-radius: 1px;
  color: ${color.white};
`;
