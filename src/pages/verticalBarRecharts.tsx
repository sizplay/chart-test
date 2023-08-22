/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import styled from '@emotion/styled';
import React from 'react';
import { Container } from '@/components/utils/Container';
import { devicesData } from '@/components/data';
import useIsCSR from '@/components/hooks/useIsCSR';
import { color } from '@/components/color';

const VerticalBarRecharts = () => {
  const isCSR = useIsCSR();
  if (!isCSR) return null;

  const customLabelList = (props: any) => {
    const { x, y, value } = props;
    return (
      <text x={x + 10} y={y + 17.5} fill={color.white} textAnchor="start" dominantBaseline="middle">
        {value}
      </text>
    );
  };

  return (
    <Container>
      <VerticalBarRechartsSection>
        <ResponsiveContainer>
          <VerticalBarRechartsContainer>
            <BarChartWrapper>
              <p>Browsers</p>
              <BarChart
                layout="vertical"
                width={800}
                height={400}
                data={devicesData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <XAxis type="number" hide={true} />
                <YAxis dataKey="browser" type="category" scale="band" hide={true} />
                <Bar dataKey="visitors" fill="#313948">
                  <LabelList dataKey="browser" position="insideLeft" content={customLabelList} />
                </Bar>
              </BarChart>
            </BarChartWrapper>
            <BarChartInfo>
              <TextWrapper>
                <p>Visitors</p>
                <p>%</p>
                {devicesData.map((item) => (
                  <React.Fragment key={item.visitors}>
                    <p>{item.visitors.toLocaleString()}</p>
                    <p>{item.percentage}%</p>
                  </React.Fragment>
                ))}
              </TextWrapper>
            </BarChartInfo>
          </VerticalBarRechartsContainer>
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
  width: 1050px;
  height: 425px;
`;

const VerticalBarRechartsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 30px;
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
`;

const BarChartInfo = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -34px;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;
  text-align: right;

  width: 200px;

  p {
    color: ${color.white};
    font-size: 14px;
    font-weight: 600;
    margin-top: 24px;
    padding-top: 2px;
  }
`;
