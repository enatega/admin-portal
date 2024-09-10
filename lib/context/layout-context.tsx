'use client';

// Core
import { createContext, useState } from 'react';

// Interface
import { IProvider } from '@/lib/utils/interfaces';

// Types
import { LayoutContextProps } from '@/lib/utils/interfaces';

export const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutProvider = ({ children }: IProvider) => {
  const [isSidebarVisible, setShowSidebar] = useState<boolean>(true);

  const onShowSidebarHandler = (val?: boolean) => {
    setShowSidebar((prevState) => (val === undefined ? !prevState : val));
  };

  const value: LayoutContextProps = {
    isSidebarVisible: isSidebarVisible,
    showSidebar: onShowSidebarHandler,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
