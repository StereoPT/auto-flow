'use client';

import { ParamProps } from '@/types/appNode';

export const BrowserInstanceParam = ({ param }: ParamProps) => {
  return <p className="text-xs">{param.name}</p>;
};
