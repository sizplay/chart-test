/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/utils/Container';
import { devicesData, osData, sizeData } from '@/components/data';
import useIsCSR from '@/components/hooks/useIsCSR';
import { color } from '@/components/color';

const VerticalBarRecharts = () => {
  const [data, setData] = useState(devicesData);

  const isCSR = useIsCSR();
  if (!isCSR) return null;

  const customLabelList = (props: any, key: string) => {
    console.log(props);
    const { x, y, value, height } = props;

    const yCoordinate = y + height / 2;

    if (key === 'type') {
      return (
        <text
          className="value"
          x={x + 10}
          y={yCoordinate}
          fill={color.white}
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
          x={x + 680}
          y={yCoordinate}
          fill={color.white}
          textAnchor="start"
          dominantBaseline="middle"
        >
          {value.toLocaleString()}
        </text>
        <text
          className="value"
          x={x + 700 + 40}
          y={yCoordinate}
          fill={color.white}
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

  return (
    <Container>
      <VerticalBarRechartsSection>
        <ResponsiveContainer>
          <div>
            <VerticalBarTitleWrapper>
              <p>Devices</p>
              <TypeWrapper>
                <button type="button" onClick={() => handleChangeData('browser')}>
                  Browser
                </button>
                <button type="button" onClick={() => handleChangeData('os')}>
                  OS
                </button>
                <button type="button" onClick={() => handleChangeData('size')}>
                  Size
                </button>
              </TypeWrapper>
            </VerticalBarTitleWrapper>
            <VerticalBarRechartsContainer>
              <BarChartWrapper>
                <VerticalBarTitleWrapper>
                  <p>Browsers</p>
                  <TypeWrapper>
                    <p>Visitors</p>
                    <p>%</p>
                  </TypeWrapper>
                </VerticalBarTitleWrapper>
                <BarChart
                  layout="vertical"
                  className="barchart-hello"
                  width={800}
                  height={400}
                  data={data}
                  barCategoryGap={4}
                  margin={{
                    top: 20,
                    right: 100,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <XAxis type="number" hide={true} />
                  <YAxis dataKey="type" type="category" scale="band" hide={true} />
                  <Bar dataKey="visitors" fill="#313948">
                    <LabelList dataKey="type" content={(props) => customLabelList(props, 'type')} />
                    <LabelList dataKey="visitors" content={(props) => customLabelList(props, 'visitors')} />
                  </Bar>
                </BarChart>
              </BarChartWrapper>
            </VerticalBarRechartsContainer>
          </div>
        </ResponsiveContainer>
      </VerticalBarRechartsSection>
    </Container>
  );
};

export default VerticalBarRecharts;

const VerticalBarRechartsSection = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #272f3e;
  width: 820px;
  height: 480px;
`;

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
    color: ${color.white};
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
      fill: ${color.white};
    }
    &:hover {
      text-decoration: underline;
    }
  }

  .barchart-hello {
    svg {
    }
  }
`;

const VerticalBarTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  p {
    color: ${color.white};
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

    color: ${color.white};
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
