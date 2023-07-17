/* eslint-disable react/prop-types */
import { Chart } from 'react-charts';
import ResizableBox from './ResizableBox';

export default function StackedBarChart({ data }) {
  const primaryAxis = { position: 'left', getValue: (datum) => datum.name };
  const secondaryAxes = [{ position: 'bottom', getValue: (datum) => datum.value, stacked: true }];

  if (!data.length) {
    return;
  }

  return (
    <section data-testid='chartContainer'>
      <h2>
        Activity Tracker <span style={{ color: 'sandybrown' }}>(YMHT Hindi Digital Center)</span>
      </h2>
      <p style={{ color: '#D32F2F' }}>
        <strong>Deadline:</strong> 11<sup>th</sup> September 2023
      </p>
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </section>
  );
}
