import React from 'react';
import { useThemeContext } from './themeContext';
import colors from '../styles/colors';
import diente from '../assets/dientes/diente 16.png';

const Tooth = () => {
  const { mode } = useThemeContext();
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 border-black w-10 h-10 cursor-pointer">
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className="col-start-2 row-start-1 border border-black rounded-t-md mt-1 border-b-0 hover:scale-[1.30] transition-all"
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className="col-start-1 row-start-2 border border-black rounded-l-md ml-1 border-r-0 hover:scale-[1.30] transition-all"
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className="col-start-2 row-start-2 border border-black hover:scale-[1.30] transition-all"
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className="col-start-3 row-start-2 border border-black rounded-r-md mr-1 border-l-0 hover:scale-[1.30] transition-all"
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className="col-start-2 row-start-3 border border-black rounded-b-md mb-1 border-t-0 hover:scale-[1.30] transition-all"
        ></div>
      </div>
    </>
  );
};

export default Tooth;
