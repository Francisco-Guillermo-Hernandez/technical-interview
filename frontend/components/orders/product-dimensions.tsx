'use client';

import React, { useState } from 'react';

interface DimensionInputsProps {
  onChange?: (dimensions: {
    largo: string;
    alto: string;
    ancho: string;
  }) => void;
}

const DimensionInputs: React.FC<DimensionInputsProps> = ({ onChange }) => {
  const [dimensions, setDimensions] = useState({
    largo: '',
    alto: '',
    ancho: '',
  });

  const handleInputChange = (
    field: 'largo' | 'alto' | 'ancho',
    value: string
  ) => {
    const numericValue = value.replace(/[^0-9]/g, '');

    const newDimensions = {
      ...dimensions,
      [field]: numericValue,
    };

    setDimensions(newDimensions);

    if (onChange) {
      onChange(newDimensions);
    }
  };

  return (
    <div className="flex items-center gap-0">
      <div className="flex flex-col items-start w-[87px]">
        <label className="text-sm font-bold text-foreground mb-1 text-left">
          Largo
        </label>
        <div className="flex items-center border-input-border-color rounded-l-lg bg-white p-[14px] border">
          <input
            type="text"
            value={dimensions.largo}
            onChange={(e) => handleInputChange('largo', e.target.value)}
            className="w-[35px] h-[20px] border-none outline-none bg-transparent font-medium"
            placeholder="15"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={3}
          />
          <span className="ml-1 text-xs text-inner-info-labels">cm</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-[87px]">
        <label className="text-sm font-bold text-foreground mb-1 text-left">
          Alto
        </label>
        <div className="flex items-center border-input-border-color bg-white p-[14px] border">
          <input
            type="text"
            value={dimensions.alto}
            onChange={(e) => handleInputChange('alto', e.target.value)}
            className="w-[35px] h-[20px] text-center border-none outline-none bg-transparent font-medium"
            placeholder="15"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={3}
          />
          <span className="ml-1 text-xs text-inner-info-labels">cm</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-[87px]">
        <label className="text-sm font-bold text-foreground mb-1 text-left">
          Ancho
        </label>
        <div className="flex items-center bg-white border-input-border-color rounded-r-lg p-[14px] border">
          <input
            type="text"
            value={dimensions.ancho}
            onChange={(e) => handleInputChange('ancho', e.target.value)}
            className="w-[28px] h-[20px] text-center border-none outline-none bg-transparent font-medium"
            placeholder="15"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={3}
          />
          <span className="ml-1 text-xs text-inner-info-labels">cm</span>
        </div>
      </div>
    </div>
  );
};

export default DimensionInputs;
