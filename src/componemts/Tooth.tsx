import { useState } from 'react';
import { useThemeContext } from './themeContext';
import colors from '../styles/colors';

import { Diente } from '../interfaces/Diente';

interface Props {
  tooth: Diente;
  onUpdate: CallableFunction;
  treatment: any;
}

const Tooth = ({ tooth, onUpdate, treatment }: Props) => {
  const { mode } = useThemeContext();

  const [selectedPart] = useState('');

  const [activePart] = useState({
    bucal: false,
    oclusal: false,
    mesial: false,
    distal: false,
    lingualpalatino: false,
    raiz: false,
  });

  const handleTreatment = (
    part: 'bucal' | 'oclusal' | 'mesial' | 'distal' | 'lingualpalatino'
  ) => {
    const updatedTooth = tooth;

    updatedTooth[part].color = treatment.color;

    onUpdate(updatedTooth, part);
  };

  return (
    <div className="flex-col">
      <div className="flex justify-center items-center min-w-full gap-3">
        <div className="grid grid-cols-3 grid-rows-3 border-black w-14 h-14 cursor-pointer ">
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
              backgroundColor: tooth.bucal.color,
            }}
            className={`col-start-2 row-start-1 border border-black rounded-t-md mt-1 border-b-0 hover:scale-[1.30] transition-all ${activePart.bucal ? 'bg-green-200 transition-colors duration-300' : ''}`}
            onClick={() => {
              handleTreatment('bucal');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
              backgroundColor: tooth.distal.color,
            }}
            className={`${activePart.distal ? 'bg-green-200 transition-colors duration-300' : ''} col-start-1 row-start-2 border border-black rounded-l-md ml-1 border-r-0 hover:scale-[1.30] transition-all`}
            onClick={() => {
              handleTreatment('distal');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
              backgroundColor: tooth.oclusal.color,
            }}
            className={`${activePart.oclusal ? 'bg-green-200 transition-colors duration-300' : ''} col-start-2 row-start-2 border border-black hover:scale-[1.30] transition-all`}
            onClick={() => {
              handleTreatment('oclusal');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
              backgroundColor: tooth.mesial.color,
            }}
            className={`${activePart.mesial ? 'bg-green-200 transition-colors duration-300' : ''} col-start-3 row-start-2 border border-black rounded-r-md mr-1 border-l-0 hover:scale-[1.30] transition-all`}
            onClick={() => {
              handleTreatment('mesial');
            }}
          ></div>
          <div
            style={{
              borderColor:
                mode === 'dark'
                  ? colors.darkModeBorder
                  : colors.lightModeBorder,
              backgroundColor: tooth.lingualpalatino.color,
            }}
            className={`${activePart.lingualpalatino ? 'bg-green-200 transition-colors duration-300' : ''} col-start-2 row-start-3 border border-black rounded-b-md mb-1 border-t-0 hover:scale-[1.30] transition-all`}
            onClick={() => {
              handleTreatment('lingualpalatino');
            }}
          ></div>
        </div>
        {/* <div className="grid grid-cols-3 grid-rows-3 border-black w-20 h-20 cursor-pointer ">
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
        </div> */}
      </div>
      <div className="capitalize text-center font-semibold h-4">
        {selectedPart}
      </div>
    </div>
  );
};

export default Tooth;
