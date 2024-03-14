/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, createContext } from 'react';
import { PageSizes } from '../types/PageSizes';

type Context = {
  width: number;
  currentPageSize: PageSizes | null;
};

const breakpoints = {
  mobile: 320,
  tablet: 640,
  laptop: 1024,
  desktop: 1440,
};

export const PageSizeContext = createContext<Context>({
  width: 0,
  currentPageSize: null,
});

type Props = {
  children: React.ReactNode;
};

export const PageSizeProvider: React.FC<Props> = ({ children }) => {
  const { tablet, laptop, desktop } = breakpoints;

  const [
    currentPageSize,
    setCurrentPageSize,
  ] = useState<PageSizes | null>(null);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;

      setWidth(newWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    switch (true) {
      case width <= tablet:
        setCurrentPageSize('MOBILE');
        break;
      case width <= laptop:
        setCurrentPageSize('TABLET');
        break;
      case width <= desktop:
        setCurrentPageSize('LAPTOP');
        break;
      default:
        setCurrentPageSize('DESKTOP');
    }
  }, [width]);

  const value = {
    width,
    currentPageSize,
  };

  return (
    <PageSizeContext.Provider value={value}>
      {children}
    </PageSizeContext.Provider>
  );
};
