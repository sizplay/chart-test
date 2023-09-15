import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import VerticalBarRecharts from '@/pages/verticalBarRecharts';
import { BarChart3 } from 'lucide-react';
import IndicatedInformation from './plausible/IndicatedInformation';
import { indicatedData, indicatedTitles } from './data';
import ConversionIndication from './plausible/ConversionIndication';

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
    <main className="m-auto h-screen w-screen max-w-7xl pt-5">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center">
          <BarChart3 size={30} className="text-gray-400" />
          <h1 className="ml-3 text-4xl text-gray-500">코드앤버터 사이트 통계</h1>
        </div>
        <div className="flex items-center">
          <p className="mr-2 text-sm text-gray-400">2021년 9월 1일 ~ 2021년 9월 7일</p>
          <div className="flex h-10 w-28 items-center justify-center rounded-lg bg-white shadow-md">
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
      <VerticalBarRecharts />
      <div className="pt-2" />
    </main>
  );
};

export default PlausibleComponent;
