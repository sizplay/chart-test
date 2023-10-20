/* eslint-disable react/no-array-index-key */
import { Progress } from "antd";
import { conversionIndicationData } from "@/components/data";
import { Aperture, FilePlus, MousePointerClick, ShoppingCart, SquareEqual } from "lucide-react";

const icons = {
  web: <MousePointerClick size={20} className="m-2" />,
  app: <ShoppingCart size={20} className="m-2" />,
  email: <Aperture size={20} className="m-2" />,
  sms: <FilePlus size={20} className="m-2" />,
  whatsapp: <SquareEqual size={20} className="m-2" />,
};

const ConversionIndication = () => {
  return (
    <div className="bg-white pt-5">
      <div className="flex flex-col bg-gray-100 pt-5">
        <h1 className="pl-5 text-3xl text-gray-500">전환 지표</h1>
        <div className="grid grid-cols-5">
          {conversionIndicationData.map((item, index) => {
            if (item.title === "추가") {
              return (
                <div
                  key={item.title + index}
                  className="m-3 flex cursor-pointer items-center justify-center rounded-lg border-4 border-dashed border-sky-500 p-5 active:bg-gray-200"
                >
                  <p className="text-2xl text-sky-500">+</p>
                </div>
              );
            }
            return (
              <div key={item.title} className="flex flex-col p-5 ">
                <div className="flex">
                  <div className="m-2 ml-0 flex items-center rounded-full bg-gray-200">
                    <p className="text-gray-500">{icons[item.icon as keyof typeof icons]}</p>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-lg text-gray-500">{item.title}</p>
                    <div className="flex items-center justify-center">
                      <p className="text-lg text-gray-500">{`${item.leftValue} `}</p>
                      <p className="text-base text-gray-400"> {` / ${item.rightValue}`}</p>
                    </div>
                  </div>
                </div>
                <Progress
                  strokeColor={{
                    "0%": "#ddecf6",
                    "100%": "#108ee9",
                  }}
                  trailColor="#dcdcdc"
                  percent={item.percentage}
                  showInfo={true}
                  className="mt-1"
                  status="active"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConversionIndication;
