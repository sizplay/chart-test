/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { devicesData, osData, sizeData } from '@/components/data';
import useIsCSR from '@/components/hooks/useIsCSR';
import { color } from '@/components/color';

const MAX_WIDTH = 1280;

const VerticalBarRecharts = () => {
  const [data, setData] = useState(devicesData);
  const [browserWidth, setBrowserWidth] = useState<number>(0);

  useEffect(() => {
    const innerWidth = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    setBrowserWidth(innerWidth);
  }, []);

  const customLabelList = (props: any, key: string) => {
    const { x, y, value, height } = props;

    const yCoordinate = y + height / 2;

    if (key === 'type') {
      return (
        <Link href="/">
          <text
            x={x + 10}
            y={yCoordinate}
            fill={color.grayColor}
            textAnchor="start"
            dominantBaseline="middle"
            className="decoration-gray-500 underline-offset-2 hover:underline"
          >
            {value}
          </text>
        </Link>
      );
    }

    const percentage = data.find((item) => item.visitors === value)?.percentage;

    return (
      <g>
        <text
          x={((x + 1135) * browserWidth) / MAX_WIDTH}
          y={yCoordinate}
          fill={color.grayColor}
          textAnchor="start"
          dominantBaseline="middle"
        >
          {value.toLocaleString()}
        </text>
        <text
          x={((x + 1160 + 40) * browserWidth) / MAX_WIDTH}
          y={yCoordinate}
          fill={color.grayColor}
          textAnchor="start"
          dominantBaseline="middle"
        >
          {percentage}%
        </text>
      </g>
    );
  };

  const handleChangeData = (type: string) => {
    if (type === 'browser') {
      setData(devicesData);
    } else if (type === 'os') {
      setData(osData);
    } else if (type === 'size') {
      setData(sizeData);
    }
  };

  const isCSR = useIsCSR();
  if (!isCSR) return null;

  return (
    <div className="w-full bg-white pt-5">
      <ResponsiveContainer width="100%" className="bg-gray-100">
        <div className="flex flex-col">
          <div className="flex items-center justify-between pl-5 pt-3 text-gray-400">
            <p className="text-xl font-semibold text-gray-500">기기</p>
            <div className="text-md flex gap-3 pr-5">
              <button
                type="button"
                onClick={() => handleChangeData('browser')}
                className="underline active:text-sky-500"
              >
                브라우저
              </button>
              <button type="button" onClick={() => handleChangeData('os')} className="underline active:text-sky-500">
                OS
              </button>
              <button type="button" onClick={() => handleChangeData('size')} className="underline active:text-sky-500">
                Size
              </button>
            </div>
          </div>
          <div className="">
            <div className="ml-5 mt-5 flex items-center justify-between">
              <p className="text-gray-500">브라우저</p>
              <div className="mr-5 flex gap-10">
                <p className="text-gray-500">유저수</p>
                <p className="text-gray-500">%</p>
              </div>
            </div>
            <BarChart
              layout="vertical"
              width={MAX_WIDTH}
              height={400}
              data={data}
              barCategoryGap={4}
              margin={{
                top: 20,
                right: 120,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis type="number" hide={true} />
              <YAxis dataKey="type" type="category" scale="band" hide={true} />
              <Bar dataKey="visitors" fill="#c5d5f1">
                <LabelList dataKey="type" content={(props) => customLabelList(props, 'type')} />
                <LabelList dataKey="visitors" content={(props) => customLabelList(props, 'visitors')} />
              </Bar>
            </BarChart>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarRecharts;
