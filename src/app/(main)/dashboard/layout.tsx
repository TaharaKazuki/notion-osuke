import layout from '@/app/layout';
import React, { type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  params: any;
};

const Layout = ({ children, params }: LayoutProps) => {
  return <main className="flex h-screen overflow-hidden">{children}</main>;
};

export default Layout;
