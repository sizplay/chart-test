import dynamic from "next/dynamic";

const ConversionRechartComponent = dynamic(() => import("@/components/ConversionRechartComponent"), { ssr: false });

const ConversionRecharts = () => {
  return (
    <div className="flex h-screen w-full justify-center bg-[#181c31] px-4 pb-0 pt-12">
      <div className="flex w-full flex-col">
        <div className="text-2xl font-bold text-white">Conversion Recharts</div>
        <ConversionRechartComponent />
      </div>
    </div>
  );
};

export default ConversionRecharts;
