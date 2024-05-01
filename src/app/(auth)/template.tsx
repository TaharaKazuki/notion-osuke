import { type ReactNode } from 'react';

type TemplateProps = {
  children: ReactNode;
};

const template = ({ children }: TemplateProps) => {
  return <div className="flex h-screen justify-center p-6">{children}</div>;
};

export default template;
