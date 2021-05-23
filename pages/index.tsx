import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next'
import styles from '../styles/Home.module.css'
import { Grid, GridCellProps, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { getProducts } from '../utils/Fauna';

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
    <div className={styles.container}>
      <Head>
        <title>Blossom Hill Crafts</title>
        <meta name="description" content="Blossom Hill Crafts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Products
        </h1>

        <Grid data={products}>
          <Column field="product_id" title="ID" width={80} />
          <Column field="display_name" title="Product Name" />
          <Column field="status" title="Status" cell={cellStatus} />
          <Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
          <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
          <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />
          <Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>
        </Grid>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
