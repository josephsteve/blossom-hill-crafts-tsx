import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next'
import styles from '@/styles/Home.module.css'
import { Grid, GridCellProps, GridColumn as Column } from '@progress/kendo-react-grid';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { getProducts } from '@/utils/Fauna';
import { Box, Flex, Button } from '@chakra-ui/react';

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await getProducts();
  return {
    props: {
      products,
    }
  }
}

const cellStatus = (props: GridCellProps) => {
  const status = props.dataItem.status;
  if (status === 'in_display') {
    return <td style={{backgroundColor: "rgb(55, 180, 0, 0.32)"}}>
      {status}
    </td>;
  } else {
    return <td style={{backgroundColor: "rgb(243, 23, 0, 0.32)"}}>
      {status}
    </td>;
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
      <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
        <Grid data={products}>
          <Column field="product_id" title="ID" width={80} />
          <Column field="display_name" title="Product Name" />
          <Column field="status" title="Status" cell={cellStatus} />
          <Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
          <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
          <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />
          <Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>
        </Grid>
        <Flex direction="row" mt={4}>
          <Button colorScheme="blue">Add New Product</Button>
        </Flex>
      </Box>
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
