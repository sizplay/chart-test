/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { devicesData } from '@/components/data';
import useIsCSR from '@/components/hooks/useIsCSR';
import { color } from '@/components/color';

const MAX_WIDTH = 1280 / 2;

const VerticalBarRecharts = () => {
  const [data, setData] = useState(devicesData);
  const [browserWidth, setBrowserWidth] = useState<number>(0);

  useEffect(() => {
    const newData = data.map((item) => {
      return {
        ...item,
        visitors: item.visitors,
        pageview: item.pageview,
        screen: item.screen,
        click: item.click,
        conversion: item.conversion,
        ctr: ((item.click / item.pageview) * 100).toFixed(1),
        conversionRate: ((item.conversion / item.pageview) * 100).toFixed(1),
      };
    });
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  useEffect(() => {
    const innerWidth = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
    setBrowserWidth(innerWidth);
  }, []);

  const customLabelList = (props: any, key: string, width: number) => {
    const { x, y, value, height } = props;

    console.log(value);

    const yCoordinate = y + height / 2;

    if (key === 'type') {
      return (
        <Link href="/">
          <text
            x={x + width}
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
          {value.toLocaleString()}
          {key === 'ctr' || key === 'conversionRate' ? '%' : ''}
        </text>
      </g>
    );
  };

  const handleChangeData = (type: string) => {
    if (type === 'browser') {
      setData(devicesData);
    } else if (type === 'os') {
      // setData(osData);
    } else if (type === 'size') {
      // setData(sizeData);
    }
  };

  const isCSR = useIsCSR();
  if (!isCSR) return null;

  return (
    <div className="w-full bg-white">
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
              <div className="flex">
                <p className="mr-7 text-xs text-gray-500">유저</p>
                <p className="mr-7 text-xs text-gray-500">노출</p>
                <p className="mr-4 text-xs text-gray-500">클릭</p>
                <p className="mr-7 text-xs text-gray-500">클릭율</p>
                <p className="mr-4 text-xs text-gray-500">전환</p>
                <p className="mr-5 text-xs text-gray-500">전환율</p>
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
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis type="number" hide={true} />
              <YAxis dataKey="type" type="category" scale="band" hide={true} />
              <Bar dataKey="pageview" fill="#c5d5f1">
                <LabelList dataKey="type" content={(props) => customLabelList(props, 'type', 10)} />
                {/* <LabelList dataKey="visitors" content={(props) => customLabelList(props, 'visitors', 625)} /> */}
                <LabelList dataKey="pageview" content={(props) => customLabelList(props, 'pageview', 725)} />
                <LabelList dataKey="screen" content={(props) => customLabelList(props, 'screen', 825)} />
                <LabelList dataKey="click" content={(props) => customLabelList(props, 'click', 925)} />
                <LabelList dataKey="ctr" content={(props) => customLabelList(props, 'ctr', 1025)} />
                <LabelList dataKey="conversion" content={(props) => customLabelList(props, 'conversion', 1125)} />
                <LabelList
                  dataKey="conversionRate"
                  content={(props) => customLabelList(props, 'conversionRate', 1225)}
                />
              </Bar>
            </BarChart>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarRecharts;
