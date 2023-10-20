/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Tooltip } from "antd";
import { AlertCircle, Eye, MousePointerClick, MoveDown, MoveUp, ShoppingCart, User } from "lucide-react";

const titleIcons = {
  user: <User size={16} className="mr-1 text-gray-400" />,
  eye: <Eye size={16} className="mr-1 text-gray-400" />,
  click: <MousePointerClick size={16} className="mr-1 text-gray-400" />,
  cart: <ShoppingCart size={16} className="mr-1 text-gray-400" />,
};

interface IndicatedBoxProps {
  data: {
    title: string;
    value: string;
    percentage: number;
    percentageColor: string;
    icon: string;
    prompt: string;
  };
  selected: boolean;
  // eslint-disable-next-line no-unused-vars
  handleSelections: (title: string) => void;
}

const IndicatedBox = ({ data, handleSelections, selected }: IndicatedBoxProps) => {
  return (
    <section
      key={data.title}
      className={`mt-4 box-border flex w-full cursor-pointer flex-col rounded-lg bg-white p-3 ${
        selected && "border-2 border-solid border-sky-500"
      } `}
      onClick={() => handleSelections(data.title)}
    >
      <div className="flex items-center">
        {titleIcons[data.icon as keyof typeof titleIcons]}
        <p className="text-sm text-gray-400">{data.title}</p>
        <Tooltip title={data.prompt}>
          <AlertCircle size={16} className="ml-2 text-gray-600 " />
        </Tooltip>
      </div>
      <div className="mt-1 flex items-end">
        <p className="text-2xl font-bold">{data.value}</p>
        <div className="flex items-end">
          <p className={`ml-1 text-lg ${data.percentageColor === "green" ? "text-green-600" : "text-red-600"}`}>
            {data.percentage}%
          </p>
          {data.percentageColor === "green" ? (
            <MoveUp size={15} className="-translate-y-1 text-green-600" />
          ) : (
            <MoveDown size={15} className="-translate-y-1 text-red-600" />
          )}
        </div>
      </div>
    </section>
  );
};

export default IndicatedBox;
