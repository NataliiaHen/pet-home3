import './IconBox.scss';
import React, { memo } from 'react';

export const IconBox: React.FC = memo(({ children }) => (
  <div className="icon__box">
    {children}
  </div>
));
