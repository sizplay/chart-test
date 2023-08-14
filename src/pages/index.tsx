import styled from '@emotion/styled';
import Link from 'next/link';
import { color } from '@/components/color';

const Home = () => {
  return (
    <div>
      <Link href="/recharts">Recharts</Link>
    </div>
  );
};

export default Home;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${color.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;
