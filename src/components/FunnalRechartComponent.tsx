/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { conversionData } from '@/components/data';
import { color } from './color';

const FunnalRechartComponent = () => {
  const [newData, setNewData] = useState<any[]>(conversionData || []);
  const [showData, setShowData] = useState<any[]>(conversionData || []);

  useEffect(() => {
    const checkedData = conversionData?.map((item: any) => ({ ...item, checked: true }));
    setNewData(checkedData || []);
  }, []);

  const handleCheckbox = (e: any) => {
    const { checked, id } = e.target;
    const newDataCopy = [...newData];
    const index = newDataCopy.findIndex((item) => item.name === id);
    newDataCopy[index].checked = checked;
    if (newDataCopy.every((item) => !item.checked)) {
      newDataCopy[index].checked = !checked;
      return;
    }
    const newShowData = newDataCopy.filter((item) => item.checked);
    setNewData(newDataCopy);
    setShowData(newShowData);
  };

  const handleFormatYAxis = (tickItem: any) => {
    return `${(tickItem / 1000).toFixed(1)}k`;
  };

  return (
    <ResponsiveContainer className="bg-gray-100">
      <BarChart
        width={1200}
        height={600}
        data={showData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" tick={{ stroke: color.black }} />
        <YAxis tick={{ stroke: color.black }} tickFormatter={handleFormatYAxis} />
        <Tooltip cursor={false} />
        <Legend
          verticalAlign="middle"
          layout="vertical"
          align="right"
          content={<CustomizedLegend data={newData} handleCheckbox={handleCheckbox} />}
        />
        <Bar dataKey="value" fill="#6abee8" maxBarSize={150} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FunnalRechartComponent;

interface CustomizedLegendProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];

  handleCheckbox: (e: any) => void;
}

const CustomizedLegend = ({ data, handleCheckbox }: CustomizedLegendProps) => {
  return (
    <div className="flex flex-col ">
      {data.map((item) => {
        return (
          <div className="mb-3 flex items-center" key={item.name}>
            <input
              type="checkbox"
              className="mr-2"
              checked={data.find((data) => data.name === item.name)?.checked}
              onChange={handleCheckbox}
              id={item.name}
            />
            <p className="text-black">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};
