import styled from '@emotion/styled';
import { buildChartTheme } from '@visx/xychart';
import { color } from '@/components/color';
import VisxComponent from '@/components/VisxComponent';
import useAreaVisx from '@/components/hooks/useAreaVisx';
import { Container } from '@/components/utils/Container';

const customTheme = buildChartTheme({
  backgroundColor: color.background,
  colors: [color.gradientLow, color.gradientHigh],
  gridColor: color.line,
  gridColorDark: color.line,
  gridStyles: {
    stroke: color.line,
  },
  tickLength: 0,
});

const Visx = () => {
  const { children, handleRenderTooltip } = useAreaVisx();

  return (
    <Container>
      <VisxContainer>
        <VisxComponent customTheme={customTheme} handleRenderTooltip={handleRenderTooltip}>
          {children}
        </VisxComponent>
      </VisxContainer>
    </Container>
  );
};

export default Visx;

const VisxContainer = styled.div`
  width: 100%;
  height: 100%;
`;
