import React, { PropsWithChildren, HTMLAttributes } from 'react';
import Head, { HeadProps } from '@/components/layout/Head';
import Header from '@/components/layout/Header';

type PageProps = PropsWithChildren<HeadProps> & HTMLAttributes<HTMLDivElement> & { mainClassName?: string; };

export default function Page(props: PageProps) {
  return (
    <>
      <Head {...props} />
      <Header />
      <div className="page-content">
        {props.children}
      </div>
      <style>{`
        .page-content {
            background: white;
            padding: 25px 10px;
            margin-top: 1px;
            padding-inline: 40px;
        }
        .page-content.sticky {
            padding: 25px 10px;
        }
        .page-content.fixed {
            padding: 70px 10px;
        }      
      `}</style>
    </>
  );
}
