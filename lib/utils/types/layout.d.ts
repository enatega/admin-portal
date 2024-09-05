import React, {
  Dispatch,
  HTMLAttributeAnchorTarget,
  SetStateAction,
} from 'react';

/* Context Types */
export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  profileSidebarVisible: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
};

export type LayoutConfig = {
  ripple: boolean;
  inputStyle: string;
  menuMode: string;
  colorScheme: string;
  theme: string;
  scale: number;
};

export interface LayoutContextProps {
  isSidebarVisible: boolean;
  showSidebar: (isOpen?: boolean) => void;
}

export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

/* AppConfig Types */
export interface AppConfigProps {
  simple?: boolean;
}

/* AppTopbar Types */
// export type NodeRef = MutableRefObject<ReactNode>;
export interface AppTopbarRef {
  menubutton?: HTMLButtonElement | null;
  topbarmenu?: HTMLDivElement | null;
  topbarmenubutton?: HTMLButtonElement | null;
}

/* AppMenu Types */
type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  //item: MenuModelItem;
  item: string;
};

export interface MenuProps {
  model: MenuModel[];
}

export interface MenuModel {
  label: string;
  icon?: string;
  items?: MenuModel[];
  to?: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  seperator?: boolean;
}

export interface AppMenuItem extends MenuModel {
  items?: AppMenuItem[];
  badge?: 'UPDATED' | 'NEW';
  badgeClass?: string;
  class?: string;
  preventExact?: boolean;
  visible?: boolean;
  disabled?: boolean;
  replaceUrl?: boolean;
  command?: ({ originalEvent, item }: CommandProps) => void;
}

export interface AppMenuItemProps {
  item?: AppMenuItem;
  parentKey?: string;
  index?: number;
  root?: boolean;
  className?: string;
}
