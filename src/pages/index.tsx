import Link from 'next/link';

const Home = () => {
  return (
    <div className="mx-4 mb-0 mt-12 flex h-screen w-full flex-col">
      <div className="text-2xl font-bold">Recharts vs Visx</div>
      <div className="flex flex-row">
        <div className="mr-10 flex flex-col">
          <div className="text-xl font-bold">Recharts</div>
          <Link className="text-blue-500 underline" href="/recharts">
            Recharts
          </Link>
          <Link className="text-blue-500 underline" href="/barRecharts">
            bar recharts
          </Link>
          <Link className="text-blue-500 underline" href="/verticalBarRecharts">
            vertical bar recharts
          </Link>
          <Link className="text-blue-500 underline" href="/threebarsRecharts">
            threebars recharts
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="text-xl font-bold">Visx</div>
          <Link className="text-blue-500 underline" href="/visx">
            Visx
          </Link>
          <Link className="text-blue-500 underline" href="/barVisx">
            bar visx
          </Link>
          <Link className="text-blue-500 underline" href="/barStackVisx">
            bar stack visx
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
