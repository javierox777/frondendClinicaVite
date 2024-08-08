import React, { useState } from 'react';
import { useThemeContext } from './themeContext';
import colors from '../styles/colors';
import diente from '../assets/dientes/diente 16.png';

const Tooth = () => {
  const { mode } = useThemeContext();

  const [selectedPart, setPart] = useState('');

  const [activePart, setActive] = useState({
    bucal: false,
    oclusal: false,
    mesial: false,
    distal: false,
    lingualpalatino: false,
  });

  const setPartToTrue = (part: string) => {
    setActive({
      bucal: part === 'bucal',
      oclusal: part === 'oclusal',
      mesial: part === 'mesial',
      distal: part === 'distal',
      lingualpalatino: part === 'lingualpalatino',
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 border-black w-20 h-20 cursor-pointer">
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className={`col-start-2 row-start-1 border border-black rounded-t-md mt-1 border-b-0 hover:scale-[1.30] transition-all ${activePart.bucal ? 'bg-green-200' : ''}`}
          onClick={() => {
            setPart('bucal');
            setPartToTrue('bucal');
          }}
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className={`${activePart.distal ? 'bg-green-200' : ''} col-start-1 row-start-2 border border-black rounded-l-md ml-1 border-r-0 hover:scale-[1.30] transition-all`}
          onClick={() => {
            setPart('distal');
            setPartToTrue('distal');
          }}
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className={`${activePart.oclusal ? 'bg-green-200' : ''} col-start-2 row-start-2 border border-black hover:scale-[1.30] transition-all`}
          onClick={() => {
            setPart('oclusal');
            setPartToTrue('oclusal');
          }}
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className={`${activePart.mesial ? 'bg-green-200' : ''} col-start-3 row-start-2 border border-black rounded-r-md mr-1 border-l-0 hover:scale-[1.30] transition-all`}
          onClick={() => {
            setPart('mesial');
            setPartToTrue('mesial');
          }}
        ></div>
        <div
          style={{
            borderColor:
              mode === 'dark' ? colors.darkModeBorder : colors.lightModeBorder,
          }}
          className={`${activePart.lingualpalatino ? 'bg-green-200' : ''} col-start-2 row-start-3 border border-black rounded-b-md mb-1 border-t-0 hover:scale-[1.30] transition-all`}
          onClick={() => {
            setPart('lingual/Palatino');
            setPartToTrue('lingualpalatino');
          }}
        ></div>
      </div>
      <div className="capitalize">{selectedPart}</div>
    </>
  );
};

export default Tooth;
