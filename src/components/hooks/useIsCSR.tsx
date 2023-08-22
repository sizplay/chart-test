import { useEffect, useState } from 'react';

const useIsCSR = () => {
  const [isCSR, setIsCSR] = useState(false);
  useEffect(() => {
    setIsCSR(true);
  }, []);

  return isCSR;
};

export default useIsCSR;
//  const isCSR = useIsCSR();
//   if (!isCSR) return null;
