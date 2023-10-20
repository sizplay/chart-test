import React from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { AxisBottom } from "@visx/axis";
import { visitorData } from "@/components/data";
import { Container } from "@/components/utils/Container";

export type BarStackProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const purple1 = "#6c5efb";
const purple2 = "#c998ff";
export const purple3 = "#a44afe";
export const background = "#eaedff";
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };

const xScale = scaleBand<string>({
  domain: [...visitorData.map((item) => item.name)],
  padding: 0.2,
});

const yScale = scaleLinear<number>({
  domain: [0, Math.max(...visitorData.map((item) => item.current))],
  nice: true,
});

const colorScale1 = scaleOrdinal<string, string>({
  domain: ["current", "prev"],
  range: [purple1, purple2, purple3],
});

const Example = ({ width = 1200, height = 600, margin = defaultMargin }: BarStackProps) => {
  if (width < 10) return null;
  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  xScale.rangeRound([0, xMax]);
  yScale.range([yMax, 0]);

  const combPattern = (
    <pattern
      id="combPattern"
      x="0"
      y="0"
      width="1"
      height="20"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <line x1="0" y1="0" x2="10" y2="10" stroke="gray" strokeWidth="20" />
    </pattern>
  );

  return width < 10 ? null : (
    <Container>
      <div style={{ position: "relative" }}>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
          <Group top={margin.top}>
            <BarStack
              data={visitorData}
              keys={["current", "prev"]}
              x={(d) => d.name}
              xScale={xScale}
              yScale={yScale}
              color={colorScale1}
            >
              {(barStacks) => {
                // console.log('barStacks', barStacks);
                return barStacks.map((barStack) =>
                  barStack.bars.map((bar) => {
                    // console.log('bar', bar);

                    return (
                      <rect
                        key={`bar-stack-${barStack.index}-${bar.index}`}
                        x={bar.x}
                        y={bar.y}
                        height={bar.height}
                        width={bar.width}
                        fill={bar.key === "prev" ? "url(#combPattern)" : bar.color}
                      />
                    );
                  }),
                );
              }}
            </BarStack>
          </Group>
          <AxisBottom
            top={yMax + margin.top}
            scale={xScale}
            stroke={purple3}
            tickStroke={purple3}
            tickLabelProps={{
              fill: purple3,
              fontSize: 11,
              textAnchor: "middle",
            }}
          />
          {combPattern}
        </svg>
        <div
          style={{
            position: "absolute",
            top: margin.top / 2 - 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
          }}
        />
      </div>
    </Container>
  );
};

export default Example;
