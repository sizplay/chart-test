import { campaignData } from '@/components/data';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  title: string;
  users: number;
  pageview: number;
  screen: number;
  click: number;
  conversion: number;
  conversionRate: string;
  conversionRateColor: string;
  clickRate: string;
}

const data = campaignData.map((item) => {
  return {
    ...item,
    conversionRate: Number((item.conversion / item.screen) * 100).toFixed(2),
    conversionRateColor: item.conversion > 0 ? 'green' : 'red',
    clickRate: Number((item.click / item.screen) * 100).toFixed(2),
  };
});

const columns: ColumnsType<DataType> = [
  {
    title: '캠페인',
    dataIndex: 'title',
    key: 'title',
    width: '58%',
  },
  {
    title: '유저',
    dataIndex: 'users',
    key: 'users',
    width: '7%',
  },
  {
    title: '노출',
    dataIndex: 'pageview',
    key: 'pageview',
    width: '7%',
  },
  {
    title: '클릭',
    dataIndex: 'click',
    key: 'click',
    width: '7%',
  },
  {
    title: '클릭율',
    dataIndex: 'clickRate',
    key: 'clickRate',
    render: (text: string) => <p>{text}%</p>,
    width: '7%',
  },
  {
    title: '전환',
    dataIndex: 'conversion',
    key: 'conversion',
    width: '7%',
  },
  {
    title: '전환율',
    dataIndex: 'conversionRate',
    key: 'conversionRate',
    render: (text: string) => <p>{text}%</p>,
    width: '7%',
  },
];

const CampainTable = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={{ position: ['bottomCenter'] }} bordered={true} />
    </div>
  );
};

export default CampainTable;
