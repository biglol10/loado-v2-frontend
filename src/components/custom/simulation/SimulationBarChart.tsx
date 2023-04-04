import React, { useEffect } from 'react';
import { StyledDiv } from '@consts/appStyled';
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
  TooltipProps,
} from 'recharts';

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

type ProcessedDataItem = {
  range: string;
  count: number;
};

type GraphDataType = {
  processedData: ProcessedDataItem[];
  top30PercentCategory?: ProcessedDataItem;
};

const SimulationBarChart = ({ graphData }: { graphData: GraphDataType }) => {
  const CustomTooltip: React.FC<CustomTooltipProps> = React.memo(
    ({ active, payload, label }: any) => {
      useEffect(() => {
        alert(`label is ${label}`);
      }, [label]);
      if (active && payload && payload.length) {
        return (
          <StyledDiv
            backgroundColor="#ffffff"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <p style={{ color: 'black' }}>성공범주: {label}</p>
            <p style={{ color: 'black' }}>카운트: {payload[0].value}건</p>
            <div style={{ color: 'black' }}>
              asdfasdfasdfasdfsaf <div style={{ color: 'black' }}>asdf</div>
            </div>
          </StyledDiv>
        );
      }

      return null;
    },
  );

  CustomTooltip.displayName = 'CustomTooltip';

  return (
    <StyledDiv display="flex" justifyContent="center">
      <BarChart
        width={1200}
        height={320}
        data={graphData.processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            position: 'relative',
            top: '-30px',
          }}
          payload={[
            {
              value: '시뮬레이션 결과',
              type: 'star',
              id: 'LegendPayload',
              color: 'gold',
            },
          ]}
        />
        <Bar dataKey="count" fill="#8884d8" background={{ fill: '#0E0F15' }} />
        {graphData.top30PercentCategory && (
          <ReferenceLine
            x={graphData.top30PercentCategory.range}
            stroke="orange"
            label={{ value: 'Top 30%', position: 'top', stroke: 'orange' }}
          />
        )}
      </BarChart>
    </StyledDiv>
  );
};

export default SimulationBarChart;
