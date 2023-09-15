/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
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
        <text
          className="value"
          x={x + 10}
          y={yCoordinate}
          fill={color.black}
          textAnchor="start"
          dominantBaseline="middle"
        >
          <Link href="/">{value}</Link>
        </text>
      );
    }

    const percentage = data.find((item) => item.visitors === value)?.percentage;

    return (
      <g>
        <text
          className="value"
          x={((x + 1135) * browserWidth) / MAX_WIDTH}
          y={yCoordinate}
          fill={color.black}
          textAnchor="start"
          dominantBaseline="middle"
        >
          {value.toLocaleString()}
        </text>
        <text
          className="value"
          x={((x + 1160 + 40) * browserWidth) / MAX_WIDTH}
          y={yCoordinate}
          fill={color.black}
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
            <div className="text-md flex gap-3 pr-2">
              <button type="button" onClick={() => handleChangeData('browser')}>
                브라우저
              </button>
              <button type="button" onClick={() => handleChangeData('os')}>
                OS
              </button>
              <button type="button" onClick={() => handleChangeData('size')}>
                Size
              </button>
            </div>
          </div>
          <VerticalBarRechartsContainer>
            <BarChartWrapper>
              <VerticalBarTitleWrapper>
                <p>브라우저</p>
                <TypeWrapper>
                  <p>유저수</p>
                  <p>%</p>
                </TypeWrapper>
              </VerticalBarTitleWrapper>
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
            </BarChartWrapper>
          </VerticalBarRechartsContainer>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default VerticalBarRecharts;

const VerticalBarRechartsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
`;

const BarChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  p {
    color: black;
    font-size: 14px;
    font-weight: 600;
    margin-left: 20px;
    margin-top: -8px;
    margin-bottom: -8px;
  }

  .value {
    font-size: 14px;
    cursor: pointer;

    a {
      fill: black;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;

const VerticalBarTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  p {
    color: black;
    font-size: 20px;
    font-weight: 600;
    margin-left: 20px;
  }
`;

const TypeWrapper = styled.div`
  display: flex;
  /* margin-right: 50px; */

  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    color: black;
    font-size: 14px;
    font-weight: 600;
    margin-left: 8px;
    margin-top: -8px;
    margin-bottom: -8px;

    &:active {
      text-decoration: underline;
    }

    &:last-of-type {
      margin-right: 20px;
    }
  }

  p {
    &:last-of-type {
      margin-right: 50px;
    }
  }
`;
