import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { monthlyData } from "@/components/data";
import { color } from "@/components/color";
import { Container } from "@/components/utils/Container";

const victorychart = () => {
  const newData = monthlyData.map((item) => {
    return {
      ...item,
      x: item.date1,
      y: item.pageview,
    };
  });

  const newData2 = monthlyData.map((item) => {
    return {
      ...item,
      x: item.date1,
      y: item.screen,
    };
  });

  return (
    <Container>
      <VictoryChart
        containerComponent={
          <VictoryVoronoiContainer
            voronoiDimension="x"
            labels={({ datum }) => `y: ${datum.y}`}
            labelComponent={<VictoryTooltip cornerRadius={0} />}
          />
        }
      >
        <svg height="0">
          <defs>
            <linearGradient id="verticalGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color.gradientLow} stopOpacity="0.4" />
              <stop offset="100%" stopColor={color.gradientHigh} stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
        <VictoryAxis
          tickValues={monthlyData.map((item) => item.date1)}
          tickFormat={monthlyData.map((item) => item.date1)}
          style={{
            tickLabels: { fontSize: 8, fill: "#fff" }, // Adjust the font size here
          }}
          tickLabelComponent={<VictoryLabel dy={-10} />}
          tickCount={8}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `${x / 1000}k`}
          style={{
            tickLabels: { fontSize: 8, fill: "#fff" },
            grid: { stroke: `${color.line}` },
          }}
          tickLabelComponent={<VictoryLabel dx={8} />}
        />
        <VictoryArea
          data={newData}
          style={{
            data: {
              fill: "url(#verticalGradient)",
              stroke: "transparent",
            },
          }}
        />
        <VictoryLine
          data={newData2}
          style={{
            data: {
              stroke: `${color.gridLine}`,
              strokeWidth: 2,
            },
          }}
        />
      </VictoryChart>
    </Container>
  );
};

export default victorychart;
