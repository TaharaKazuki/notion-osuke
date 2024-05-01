import React, { type ReactNode } from 'react';
import Header from '@/components/landing-page/header';

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default HomePageLayout;
