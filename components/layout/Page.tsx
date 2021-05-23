import React, { PropsWithChildren, HTMLAttributes } from 'react';
import Head, { HeadProps } from '@/components/layout/Head';
import Header from '@/components/layout/Header';

type PageProps = PropsWithChildren<HeadProps> & HTMLAttributes<HTMLDivElement> & { mainClassName?: string; };

export default function Page(props: PageProps) {
  return (
    <>
      <Head {...props} />
      <Header />
      {props.children}
    </>
  );
}
