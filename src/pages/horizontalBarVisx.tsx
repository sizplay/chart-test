/* eslint-disable no-unused-vars */
import React from "react";
import { BarGroupHorizontal, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft } from "@visx/axis";
import cityTemperature, { CityTemperature } from "@visx/mock-data/lib/mocks/cityTemperature";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { Container } from "@/components/utils/Container";
import { devicesData } from "@/components/data";

export type BarGroupHorizontalProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

type CityName = "New York" | "San Francisco" | "Austin";

const blue = "#aeeef8";
export const green = "#e5fd3d";
const purple = "#9caff6";
export const background = "#612efb";
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };

function max<D>(arr: D[], fn: (d: D) => number) {
  return Math.max(...arr.map(fn));
}

const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter((d) => d !== "date") as CityName[];
const getDate = (d: CityTemperature) => d.date;

const data1 = devicesData;
const keys1 = Object.values(data1.map((d) => d.type));
const getType = (d: (typeof data1)[number]) => d.type;

// scales
const dateScale = scaleBand({
  domain: data.map(getDate),
  padding: 0.2,
});
const cityScale = scaleBand({
  domain: keys,
  padding: 0.1,
});
const tempScale = scaleLinear<number>({
  domain: [0, max(data, (d) => max(keys, (key) => Number(d[key])))],
});

// accessors
const typeScale = scaleBand({
  domain: data1.map(getType),
  padding: 0.2,
});
const visitorScale = scaleBand({
  domain: keys1,
  padding: 0.1,
});
const visitorCountScale = scaleLinear<number>({
  domain: [
    0,
    max(data1, (d) => {
      // console.log('d', d);
      return d.visitors;
    }),
  ],
});
const colorScale1 = scaleOrdinal<string, string>({
  domain: keys1,
  range: [blue, green, purple],
});

const Example = ({ width = 1200, height = 600, margin = defaultMargin }: BarGroupHorizontalProps) => {
  // console.log('keys', keys);
  // console.log('keys1', keys1);
  // console.log('data.map(getDate)', data.map(getDate));
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, yMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.rangeRound([0, xMax]);

  typeScale.rangeRound([0, yMax]);
  visitorScale.rangeRound([0, typeScale.bandwidth()]);
  visitorCountScale.rangeRound([0, xMax]);

  return width < 10 ? null : (
    <Container>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarGroupHorizontal
            data={data}
            keys={keys}
            width={xMax}
            y0={getDate}
            y0Scale={dateScale}
            y1Scale={cityScale}
            xScale={tempScale}
            color={colorScale1}
          >
            {(barGroups) => {
              // console.log('barGroups', barGroups);
              return barGroups.map((barGroup, index) => (
                <Group key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
                  <Bar
                    key={`${barGroup.index}-${barGroup.bars[index]?.index}-${barGroup.bars[index]?.key}`}
                    x={barGroup.bars[index]?.x}
                    y={barGroup.bars[index]?.y}
                    width={barGroup.bars[index]?.width}
                    height={barGroup.bars[index]?.height}
                    fill={barGroup.bars[index]?.color}
                    rx={4}
                  />
                </Group>
              ));
            }}
          </BarGroupHorizontal>
          <AxisLeft
            scale={typeScale}
            stroke={background}
            tickStroke={background}
            // tickFormat={formatDate}
            hideAxisLine
            tickLabelProps={{
              fill: green,
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            }}
          />
        </Group>
      </svg>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarGroupHorizontal
            data={data1}
            keys={keys1}
            width={xMax}
            y0={getType}
            y0Scale={typeScale}
            y1Scale={visitorScale}
            xScale={visitorCountScale}
            color={colorScale1}
          >
            {(barGroups) => {
              return barGroups.map((barGroup) => (
                <Group key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`} top={barGroup.y0}>
                  {barGroup.bars.map((bar) => (
                    <Bar
                      key={`${barGroup.index}-${bar.index}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                    />
                  ))}
                </Group>
              ));
            }}
          </BarGroupHorizontal>
          <AxisLeft
            scale={typeScale}
            stroke={background}
            tickStroke={background}
            // tickFormat={formatDate}
            hideAxisLine
            tickLabelProps={{
              fill: green,
              fontSize: 11,
              textAnchor: "end",
              dy: "0.33em",
            }}
          />
        </Group>
      </svg>
    </Container>
  );
};

export default Example;
