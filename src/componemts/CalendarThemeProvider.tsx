import React, { PropsWithChildren } from 'react';
import { CustomProvider } from 'rsuite';
import { useThemeContext } from './themeContext';

const CalendarThemeProvider = ({ children }: PropsWithChildren) => {
  const { mode } = useThemeContext();

  return <CustomProvider theme={mode}>{children}</CustomProvider>;
};

export default CalendarThemeProvider;
