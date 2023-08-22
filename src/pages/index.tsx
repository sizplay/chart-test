import styled from '@emotion/styled';
import Link from 'next/link';

const Home = () => {
  return (
    <Container>
      <Link href="/recharts">Recharts</Link>
      <Link href="/visx">Visx</Link>
      <Link href="/barRecharts">bar recharts</Link>
      <Link href="/verticalBarRecharts">vertical bar recharts</Link>
    </Container>
  );
};

export default Home;

const Container = styled.section`
  margin: 50px 16px 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
