import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import VerticalBarRecharts from '@/pages/verticalBarRecharts';
import { BarChart3 } from 'lucide-react';
import IndicatedInformation from './plausible/IndicatedInformation';
import { indicatedData, indicatedTitles, topSources } from './data';
import ConversionIndication from './plausible/ConversionIndication';
import CampainTable from './plausible/CampainTable';
import VerticalBarComponent from './VerticalBarComponent';

const FourBarsLineRechartComponent = dynamic(() => import('@/components/FourBarsLineRechartComponent'), {
  ssr: false,
});

const PlausibleComponent = () => {
  const [selections, setSelections] = useState<{
    [key: string]: boolean;
  }>({ [indicatedTitles.TOTAL_SENT]: true });

  useEffect(() => {
    indicatedData.forEach((item) => {
      if (item.title !== indicatedTitles.TOTAL_SENT) {
        setSelections((prev) => ({ ...prev, [item.title]: false }));
      }
    });
  }, []);

  const handleSelections = (title: string) => {
    setSelections((prev) => ({ ...prev, [title]: !prev[title as keyof typeof selections] }));
  };

  return (
    <main className="w-screen h-screen pt-5 m-auto max-w-7xl">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center">
          <BarChart3 size={30} className="text-gray-400" />
          <h1 className="ml-3 text-4xl text-gray-500">코드앤버터 사이트 통계</h1>
        </div>
        <div className="flex items-center">
          <p className="mr-2 text-sm text-gray-400">2021년 9월 1일 ~ 2021년 9월 7일</p>
          <div className="flex items-center justify-center h-10 bg-white rounded-lg shadow-md w-28">
            <p className="text-sm text-gray-400">마지막 7일</p>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-gray-100">
        <IndicatedInformation selections={selections} handleSelections={handleSelections} />
        <div className="pt-2" />
        <FourBarsLineRechartComponent selections={selections} />
      </div>
      <ConversionIndication />
      <div className="pt-5" />
      <CampainTable />
      <div className="flex items-stretch pt-5 ">
        <div className="w-2/4 ">
          <VerticalBarRecharts />
        </div>
        <div className="w-2/4 ml-5 bg-gray-100">
          <VerticalBarComponent data={topSources} />
        </div>
      </div>
      <div className="pt-5" />
    </main>
  );
};

export default PlausibleComponent;
