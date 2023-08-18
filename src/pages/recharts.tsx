/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import Rechart from '@/components/rechart';
import useAreaRechart from '@/components/hooks/useAreaRechart';
import useLineRechart from '@/components/hooks/useLineRechart';
import { Container } from '.';

const Home = () => {
  const [graphType, setGraphType] = useState<'line' | 'area'>('area');

  const handleChangeGraph = () => {
    setGraphType(graphType === 'area' ? 'line' : 'area');
  };

  const {
    data: AreaData,
    AreaCustomTooltip,
    handleAreaFormatYAxis,
    handleChangeSelect,
    AreaChildren,
  } = useAreaRechart();

  const {
    data: LineData,
    handleLineFormatYAxis,
    lineCustomTooltip,
    LineChildren,
    handleLineChangeSelect,
  } = useLineRechart();

  return (
    <Container>
      <Rechart
        handleChangeSelect={graphType === 'area' ? handleChangeSelect : handleLineChangeSelect}
        handleFormatYAxis={graphType === 'area' ? handleAreaFormatYAxis : handleLineFormatYAxis}
        customTooltip={graphType === 'area' ? AreaCustomTooltip : lineCustomTooltip}
        data={graphType === 'area' ? AreaData : LineData}
        handleChangeGraph={handleChangeGraph}
      >
        {graphType === 'area' ? AreaChildren : LineChildren}
      </Rechart>
    </Container>
  );
};

export default Home;
