/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

import useAreaRechart from '@/components/hooks/useAreaRechart';
import useLineRechart from '@/components/hooks/useLineRechart';
import RechartComponent from '@/components/RechartComponent';
import { Container } from '@/components/utils/Container';

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
      <RechartComponent
        handleChangeSelect={graphType === 'area' ? handleChangeSelect : handleLineChangeSelect}
        handleFormatYAxis={graphType === 'area' ? handleAreaFormatYAxis : handleLineFormatYAxis}
        customTooltip={graphType === 'area' ? AreaCustomTooltip : lineCustomTooltip}
        data={graphType === 'area' ? AreaData : LineData}
        handleChangeGraph={handleChangeGraph}
      >
        {graphType === 'area' ? AreaChildren : LineChildren}
      </RechartComponent>
    </Container>
  );
};

export default Home;
