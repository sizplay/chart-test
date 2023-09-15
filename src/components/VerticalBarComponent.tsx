/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { color } from './color';

const MAX_WIDTH = 1280;
const VerticalBarComponent = ({ data }: any) => {
  const [browserWidth, setBrowserWidth] = useState<number>(0);

  useEffect(() => {
    const innerWidth = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    setBrowserWidth(innerWidth);
  }, []);

  const customLabelList = (props: any, key: string) => {
    const { x, y, value, height } = props;

    const yCoordinate = y + height / 2;

    if (key === 'title') {
      return (
        <text x={x + 10} y={yCoordinate} fill={color.grayColor} textAnchor="start" dominantBaseline="middle">
          {value}
        </text>
      );
    }

    return (
      <text
        x={((x + 1160 + 40) * browserWidth) / MAX_WIDTH}
        y={yCoordinate}
        fill={color.grayColor}
        textAnchor="start"
        dominantBaseline="middle"
      >
        {value / 1000}k
      </text>
    );
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-between px-6 pt-5">
        <h1 className="text-xl text-gray-500">Top Sources</h1>
        <p className="pr-1 text-gray-500">유저</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={MAX_WIDTH}
          height={400}
          data={data}
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
            <LabelList dataKey="title" content={(props) => customLabelList(props, 'title')} />
            <LabelList dataKey="visitors" content={(props) => customLabelList(props, 'visitors')} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarComponent;
