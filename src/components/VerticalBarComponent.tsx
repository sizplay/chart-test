/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { color } from "./color";

const MAX_WIDTH = 1280 / 2;
const VerticalBarComponent = ({ data }: any) => {
  const [browserWidth, setBrowserWidth] = useState<number>(0);
  const [convertedData, setConvertedData] = useState(data);

  useEffect(() => {
    const newData = data.map((item: any) => {
      return {
        ...item,
        visitors: item.visitors,
        screen: item.screen,
        click: item.click,
        conversion: item.conversion,
        ctr: ((item.click / item.visitors) * 100).toFixed(1),
        conversionRate: ((item.conversion / item.visitors) * 100).toFixed(1),
      };
    });
    setConvertedData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const innerWidth = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    setBrowserWidth(innerWidth);
  }, []);

  const customLabelList = (props: any, key: string, width: number) => {
    const { x, y, value, height } = props;

    const yCoordinate = y + height / 2;

    if (key === "title") {
      return (
        <text x={x + width} y={yCoordinate} fill={color.grayColor} textAnchor="start" dominantBaseline="middle">
          {value}
        </text>
      );
    }

    console.log(key, value);

    return (
      <g>
        <text
          x={((x + width) * browserWidth) / MAX_WIDTH / 2}
          y={yCoordinate}
          fill={color.grayColor}
          textAnchor="end"
          dominantBaseline="middle"
          className="text-xs"
        >
          {value}
          {key === "ctr" || key === "conversionRate" ? "%" : ""}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-gray-100 ">
      <div className="flex items-center justify-between pl-6 pt-5">
        <h1 className="text-xl text-gray-500">Top Sources</h1>
        <div className="flex">
          <p className="mr-7 text-xs text-gray-500">유저</p>
          <p className="mr-7 text-xs text-gray-500">노출</p>
          <p className="mr-4 text-xs text-gray-500">클릭</p>
          <p className="mr-7 text-xs text-gray-500">클릭율</p>
          <p className="mr-4 text-xs text-gray-500">전환</p>
          <p className="mr-4 text-xs text-gray-500">전환율</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={MAX_WIDTH}
          height={400}
          data={convertedData}
          barCategoryGap={4}
          layout="vertical"
          margin={{
            top: 20,
            right: 120,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis type="number" hide={true} />
          <YAxis dataKey="title" type="category" scale="band" hide={true} />
          <Bar dataKey="visitors" fill="#c5d5f1">
            <LabelList dataKey="title" content={(props) => customLabelList(props, "title", 10)} />
            <LabelList dataKey="visitors" content={(props) => customLabelList(props, "visitors", 715)} />
            <LabelList dataKey="screen" content={(props) => customLabelList(props, "screen", 815)} />
            <LabelList dataKey="click" content={(props) => customLabelList(props, "click", 915)} />
            <LabelList dataKey="ctr" content={(props) => customLabelList(props, "ctr", 1015)} />
            <LabelList dataKey="conversion" content={(props) => customLabelList(props, "conversion", 1115)} />
            <LabelList dataKey="conversionRate" content={(props) => customLabelList(props, "conversionRate", 1215)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarComponent;
