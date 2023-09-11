import dynamic from 'next/dynamic';

const FourBarsLineRechartComponent = dynamic(() => import('@/components/FourBarsLineRechartComponent'), {
  ssr: false,
});

const FourBarsLineRecharts = () => {
  return (
    <div className="flex h-screen w-full justify-center px-4 pb-0 pt-12">
      <div className="flex w-full flex-col">
        <div className="text-2xl font-bold text-white">Four Bars Line Recharts</div>
        <FourBarsLineRechartComponent />
      </div>
    </div>
  );
};

export default FourBarsLineRecharts;
