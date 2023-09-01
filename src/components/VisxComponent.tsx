/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatedAxis, AnimatedGrid, Tooltip, XYChart } from '@visx/xychart';
import { color } from './color';

interface VisxProps {
  customTheme: any;
  handleRenderTooltip: ({ tooltipData }: any) => JSX.Element | null;
  children: any;
}

const VisxComponent = ({ customTheme, handleRenderTooltip, children }: VisxProps) => {
  return (
    <XYChart width={1200} height={600} xScale={{ type: 'band' }} yScale={{ type: 'linear' }} theme={customTheme}>
      <AnimatedGrid columns={false} numTicks={4} lineStyle={{ stroke: color.line }} />
      <AnimatedAxis
        orientation="bottom"
        tickLabelProps={{ fill: color.white, fontSize: 12 }}
        tickLineProps={{ strokeWidth: 0 }}
      />
      <AnimatedAxis
        orientation="left"
        tickFormat={(x) => `${x / 1000}k`}
        tickLabelProps={{ fill: color.white, fontSize: 12 }}
        tickLineProps={{ strokeWidth: 0 }}
        rangePadding={0}
        strokeWidth={0}
        tickLength={-12}
      />
      {children}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair={false}
        showSeriesGlyphs
        className="tooltip"
        renderTooltip={handleRenderTooltip}
      />
    </XYChart>
  );
};

export default VisxComponent;
