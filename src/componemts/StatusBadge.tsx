import { Typography } from '@mui/material';
import React, { PropsWithChildren, ReactNode } from 'react';

interface Props {
  title: string;
  status: 'in-progress' | 'finished' | 'cancelled';
}

const StatusBadge = ({ title, status }: Props) => {
  return (
    <div
      className={`flex justify-center items-center p-1 rounded-lg ${status === 'in-progress' ? 'bg-yellow-200' : status === 'finished' ? 'bg-green-300' : 'bg-red-300'} `}
    >
      <span
        className={`font-semibold ${status === 'in-progress' ? 'text-yellow-900' : status === 'finished' ? 'text-green-900' : 'text-red-900'}`}
      >
        {title}
      </span>
    </div>
  );
};

export default StatusBadge;
