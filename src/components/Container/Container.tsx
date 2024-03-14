import React, { memo } from 'react';
import './Container.scss';

export const Container: React.FC = memo(({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
});
