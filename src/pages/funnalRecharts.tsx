import dynamic from 'next/dynamic';

const FunnalRechartComponent = dynamic(() => import('@/components/FunnalRechartComponent'), { ssr: false });

const FunnalRecharts = () => {
  return (
    <div className="flex h-screen w-full justify-center bg-[#181c31] px-4 pb-0 pt-12">
      <div className="flex w-full flex-col">
        <div className="text-2xl font-bold text-white">Funnal Recharts</div>
        <FunnalRechartComponent />
      </div>
    </div>
  );
};

export default FunnalRecharts;
