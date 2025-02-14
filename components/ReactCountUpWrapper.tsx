'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

type ReactCountUpWrapperProps = {
  value: number;
};

export const ReactCountUpWrapper = ({ value }: ReactCountUpWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return '-';

  return <CountUp duration={0.5} preserveValue end={value} decimals={0} />;
};
