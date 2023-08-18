/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { Container } from '@/pages';
import { color } from './color';

interface RechartProps {
  handleChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFormatYAxis: (tickItem: any) => string;
  customTooltip: (props: any) => JSX.Element | null;
  handleChangeGraph: () => void;
  data: any[];
  children: React.ReactNode;
}

const Rechart = ({
  handleChangeSelect,
  handleFormatYAxis,
  customTooltip,
  data,
  children,
  handleChangeGraph,
}: RechartProps) => {
  const [isCSR, setIsCSR] = useState(false);
  useEffect(() => {
    setIsCSR(true);
  }, []);
  return (
    <Container>
      <RechartsContainer>
        <ButtonWrapper>
          <ButtonGroup>
            <button type="button" onClick={handleChangeGraph}>
              그래프 변경
            </button>
            <select onChange={handleChangeSelect}>
              <option value="monthly">Monthly</option>
              <option value="weekly1">Jul 12 ~ Jul 18</option>
              <option value="weekly2">Jul 18 ~ Jul 24</option>
              <option value="weekly3">Jul 24 ~ Jul 30</option>
              <option value="weekly4">Jul 30 ~ Aug 11</option>
            </select>
          </ButtonGroup>
        </ButtonWrapper>

        {isCSR && (
          <ComposedChart width={1200} height={600} data={data}>
            <XAxis dataKey="date1" />
            <YAxis tickFormatter={handleFormatYAxis} tickCount={8} />
            <Tooltip content={customTooltip} cursor={false} />
            <CartesianGrid stroke={color.line} vertical={false} />
            {children}
          </ComposedChart>
        )}
      </RechartsContainer>
    </Container>
  );
};

export default Rechart;

const RechartsContainer = styled.div`
  margin-top: 50px;
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  /* justify-content: flex-end; */

  select {
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid ${color.line};
    background-color: ${color.background};
    color: ${color.white};
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid ${color.line};
    background-color: ${color.background};
    color: ${color.white};
    font-size: 14px;
    font-weight: 600;
    padding: 0 10px;
    margin-right: 10px;
    cursor: pointer;
  }
`;
