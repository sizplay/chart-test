import styled from '@emotion/styled';
import Link from 'next/link';

const Home = () => {
  return (
    <Container>
      <Link href="/recharts">Recharts</Link>
      <Link href="/visx">Visx</Link>
    </Container>
  );
};

export default Home;

const Container = styled.section`
  margin: 50px 16px 0;
  width: 100%;
  height: 100vh;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
`;
