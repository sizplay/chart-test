import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
  AnimatedAreaSeries,
  buildChartTheme,
} from '@visx/xychart';
import { LinearGradient } from '@visx/gradient';
import styled from '@emotion/styled';
import { twoMonthsData } from '@/components/data';
import { color } from '@/components/color';
import { LastText, VisitorsWrapper } from '@/components/hooks/useAreaRechart';
import { tooltipVisitorFunc } from '@/components/utils/tooltipVisitorFunc';
import { Container } from '.';

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

const accessors = {
  xAccessor: (d: any) => d.x,
  yAccessor: (d: any) => d.y,
};

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

const customTheme = buildChartTheme({
  backgroundColor: color.background,
  colors: [color.gradientLow, color.gradientHigh],
  gridColor: color.line,
  gridColorDark: color.line,
  gridStyles: {
    stroke: color.line,
  },
  tickLength: 0,
});

const Visx = () => {
  return (
    <Container>
      <VisxContainer>
        <XYChart width={1200} height={600} xScale={{ type: 'band' }} yScale={{ type: 'linear' }} theme={customTheme}>
          {/* <LinearGradient from={color.gradientLow} to={color.gradientHigh} id="gradient" /> */}
          <LinearGradient id="gradient">
            <stop offset="5%" stopColor={color.gradientLow} />
            <stop offset="95%" stopColor={color.gradientHigh} />
          </LinearGradient>
          <AnimatedAxis
            orientation="bottom"
            tickLabelProps={{ fill: color.white, fontSize: 12 }}
            tickLineProps={{ strokeWidth: 0 }}
          />
          <AnimatedAxis
            orientation="left"
            tickFormat={(x) => `${x / 1000}k`}
            tickLabelProps={{ fill: color.white, fontSize: 12 }}
            tickLineProps={{ strokeWidth: 0 }}
            rangePadding={0}
            strokeWidth={0}
            tickLength={-12}
          />
          <AnimatedGrid
            columns={false}
            numTicks={4}
            lineStyle={{
              stroke: color.line,
            }}
          />
          <AnimatedAreaSeries
            dataKey="area"
            data={data1}
            {...accessors}
            fill="url(#gradient)" // Use the gradient fill
            renderLine={false}
          />
          <AnimatedLineSeries dataKey="line" data={data2} {...accessors} stroke={color.gridLine} strokeWidth={4} />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair={false}
            showSeriesGlyphs
            className="tooltip"
            renderTooltip={handleRenderTooltip}
          />
        </XYChart>
      </VisxContainer>
    </Container>
  );
};

export default Visx;

const VisxContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CustomTooltip = styled.div`
  padding: 16px;
  border-radius: 1px;
  color: ${color.white};
`;
