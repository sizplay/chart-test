import { indicatedData } from '@/components/data';
import IndicatedBox from './\bIndicatedBox';

interface IndicatedInformationProps {
  selections: object;
  // eslint-disable-next-line no-unused-vars
  handleSelections: (title: string) => void;
}

const IndicatedInformation = ({ selections, handleSelections }: IndicatedInformationProps) => {
  return (
    <section className="block w-full">
      <article className="grid grid-cols-6 gap-3 mx-2">
        {indicatedData.map((data) => {
          return (
            <IndicatedBox
              data={data}
              key={data.title}
              selected={selections[data.title as keyof typeof selections] || false}
              handleSelections={handleSelections}
            />
          );
        })}
      </article>
    </section>
  );
};

export default IndicatedInformation;
