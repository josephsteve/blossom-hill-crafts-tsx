import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { getProducts } from '@/utils/Fauna';
import { Box } from '@chakra-ui/react';
import ProductDataTable from '@/components/ProductDataTable';

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await getProducts();
  return {
    props: {
      products,
    }
  }
}

export default function Home({products}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Blossom Hill Crafts</title>
        <meta name="description" content="Blossom Hill Crafts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" >
        <AppBar id="AppBar">
          <AppBarSection>
            <button className="k-button k-button-clear">
              <span className="k-icon k-i-menu" />
            </button>
          </AppBarSection>
          <AppBarSpacer style={{ width: 4 }} />
          <AppBarSection>
            <h1 className="title">Blossom Hill Crafts</h1>
          </AppBarSection>
          <AppBarSpacer style={{ width: 32 }} />
        </AppBar>
      </Box>
      <ProductDataTable products={products} />
      <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                ul {
                    font-size: 16px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                li {
                    margin: 0 20px;
                }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
            `}</style>
    </>
  )
}
