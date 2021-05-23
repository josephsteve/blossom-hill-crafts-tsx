import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import { getProducts } from '@/utils/Fauna';
import { Box } from '@chakra-ui/react';
import ProductDataTable from '@/components/ProductDataTable';
import Page from '@/components/layout/Page';

export default function Home() {
  return (
    <Page>

    </Page>
  )
}
