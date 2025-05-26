// DeviconIcon.tsx
import React from 'react';

type DeviconIconProps = {
  name: string; 
  colored?: boolean;
  size?: number | string;
};

const DeviconIcon: React.FC<DeviconIconProps> = ({ name, colored = true, size }) => {
  return (
    <i
      className={`devicon-${name}-plain${colored ? ' colored' : ''}`}
      style={{ fontSize: size ? size : '1em' }}
    ></i>
  )
}

export default DeviconIcon;
