import React, { useState } from 'react';
import { useThemeContext } from './themeContext';
import colors from '../styles/colors';
import diente from '../assets/dientes/diente 16.png';

interface Props {
  setPartParent: CallableFunction;
}

const Tooth = ({ setPartParent }: Props) => {
  const { mode } = useThemeContext();

  const [selectedPart, setPart] = useState('');

  const [activePart, setActive] = useState({
    bucal: false,
    oclusal: false,
    mesial: false,
    distal: false,
    lingualpalatino: false,
    raiz: false,
  });

  const setPartToTrue = (part: string) => {
    setActive({
      bucal: part === 'bucal',
      oclusal: part === 'oclusal',
      mesial: part === 'mesial',
      distal: part === 'distal',
      lingualpalatino: part === 'lingualpalatino',
      raiz: part === 'raiz',
    });
  };

  return (
    <div className="flex-col">
      <div className="flex justify-center items-center min-w-full gap-3">
        <div className="grid grid-cols-3 grid-rows-3 border-black w-20 h-20 cursor-pointer ">
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
            }}
            className={`col-start-2 row-start-1 border border-black rounded-t-md mt-1 border-b-0 hover:scale-[1.30] transition-all ${activePart.bucal ? 'bg-green-200 transition-colors duration-300' : ''}`}
            onClick={() => {
              setPart('bucal');
              setPartParent('bucal');
              setPartToTrue('bucal');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
            }}
            className={`${activePart.distal ? 'bg-green-200 transition-colors duration-300' : ''} col-start-1 row-start-2 border border-black rounded-l-md ml-1 border-r-0 hover:scale-[1.30] transition-all`}
            onClick={() => {
              setPart('distal');
              setPartParent('distal');
              setPartToTrue('distal');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
            }}
            className={`${activePart.oclusal ? 'bg-green-200 transition-colors duration-300' : ''} col-start-2 row-start-2 border border-black hover:scale-[1.30] transition-all`}
            onClick={() => {
              setPart('oclusal');
              setPartParent('oclusal');
              setPartToTrue('oclusal');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
            }}
            className={`${activePart.mesial ? 'bg-green-200 transition-colors duration-300' : ''} col-start-3 row-start-2 border border-black rounded-r-md mr-1 border-l-0 hover:scale-[1.30] transition-all`}
            onClick={() => {
              setPart('mesial');
              setPartParent('mesial');
              setPartToTrue('mesial');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
            }}
            className={`${activePart.lingualpalatino ? 'bg-green-200 transition-colors duration-300' : ''} col-start-2 row-start-3 border border-black rounded-b-md mb-1 border-t-0 hover:scale-[1.30] transition-all`}
            onClick={() => {
              setPart('lingual/Palatino');
              setPartParent('lingualpalatino');
              setPartToTrue('lingualpalatino');
            }}
          ></div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 border-black w-20 h-20 cursor-pointer ">
          <div
            className={`${activePart.raiz ? 'bg-green-200 transition-colors duration-300' : ''} col-start-2 border border-black row-span-3`}
            onClick={() => {
              setPart('raíz');
              setPartParent('raiz');
              setPartToTrue('raiz');
            }}
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
            }}
          ></div>
        </div>
      </div>
      <div className="capitalize text-center font-semibold h-4">
        {selectedPart}
      </div>
    </div>
  );
};

export default Tooth;
