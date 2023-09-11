import dynamic from 'next/dynamic';

const ThreeBarsLineRechartComponent = dynamic(() => import('@/components/ThreeBarsLineRechartComponent'), {
  ssr: false,
});

const ThreeBarsLineRecharts = () => {
  return (
    <div className="flex h-screen w-full justify-center px-4 pb-0 pt-12">
      <div className="flex w-full flex-col">
        <div className="text-2xl font-bold text-white">Three Bars Line Recharts</div>
        <ThreeBarsLineRechartComponent />
      </div>
    </div>
  );
};

export default ThreeBarsLineRecharts;
