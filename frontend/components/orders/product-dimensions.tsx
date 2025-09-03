'use client';

import React, { useState, useEffect } from 'react';

interface DimensionInputsProps {
  onChange?: (dimensions: {
    length: string;
    height: string;
    width: string;
  }) => void;
  initialDimensions?: {
    id: string,
    length?: string;
    height?: string;
    width?: string;
  };
}

const DimensionInputs: React.FC<DimensionInputsProps> = ({ 
  onChange, 
  initialDimensions 
}) => {
  const [dimensions, setDimensions] = useState({
    id: initialDimensions?.id || '',
    length: initialDimensions?.length || '',
    height: initialDimensions?.height || '',
    width: initialDimensions?.width || '',
  });

  useEffect(() => {
    if (initialDimensions) {
      setDimensions({
        id: initialDimensions?.id || '',
        length: initialDimensions.length || '',
        height: initialDimensions.height || '',
        width: initialDimensions.width || '',
      });
    }
  }, [initialDimensions]);


  const applyIdentifier = (prefix: string, id: string = '1') => `product-dimensions-${prefix}-${id}`;
  const handleInputChange = (
    field: 'length' | 'height' | 'width',
    value: string
  ) => {
    const numericValue = value.replace(/\d/g, '');

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
        <label htmlFor={applyIdentifier('length', dimensions.id) } className="text-sm font-bold text-foreground mb-1 text-left">
          Largo
        </label>
        <div className="flex items-center border-input-border-color rounded-l-lg bg-white p-[14px] border">
          <input
            type="text"
            value={dimensions.length}
            onChange={(e) => handleInputChange('length', e.target.value)}
            className="w-[35px] h-[20px] border-none outline-none bg-transparent font-medium"
            placeholder="15"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete='off'
            maxLength={3}
            name={applyIdentifier('length', dimensions.id)}
            autoCapitalize="none"
            spellCheck="false"
          />
          <span className="ml-1 text-xs text-inner-info-labels">cm</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-[87px]">
        <label htmlFor={applyIdentifier('height', dimensions.id)} className="text-sm font-bold text-foreground mb-1 text-left">
          Alto
        </label>
        <div className="flex items-center border-input-border-color bg-white p-[14px] border">
          <input
            type="text"
            value={dimensions.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="w-[35px] h-[20px] text-center border-none outline-none bg-transparent font-medium"
            placeholder="15"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete='off'
            maxLength={3}
            id={applyIdentifier('height', dimensions.id)}
            name={applyIdentifier('height', dimensions.id)}
          />
          <span className="ml-1 text-xs text-inner-info-labels">cm</span>
        </div>
      </div>

      <div className="flex flex-col items-start w-[87px]">
        <label htmlFor={applyIdentifier('width', dimensions.id)}  className="text-sm font-bold text-foreground mb-1 text-left">
          Ancho
        </label>
        <div className="flex items-center bg-white border-input-border-color rounded-r-lg p-[14px] border">
          <input
            type="text"
            value={dimensions.width}
            onChange={(e) => handleInputChange('width', e.target.value)}
            className="w-[28px] h-[20px] text-center border-none outline-none bg-transparent font-medium"
            placeholder="15"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete='off'
            maxLength={3}
            name={applyIdentifier('width', dimensions.id)}
            id={applyIdentifier('width', dimensions.id)}
          />
          <span className="ml-1 text-xs text-inner-info-labels">cm</span>
        </div>
      </div>
    </div>
  );
};

export default DimensionInputs;
