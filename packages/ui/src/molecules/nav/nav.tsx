import type { ReactNode } from 'react';
import { navStyle } from './nav.css';

type NavProps = {
  children: ReactNode;
};

export const Nav = ({ children }: NavProps) => {
  return <nav className={navStyle}>{children}</nav>;
};
