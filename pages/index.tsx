import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useSWR from 'swr';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-bootstrap/dist/all.css';

export default function Home() {

  const {data: products, mutate} = useSWR('/api/products');

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
          <Column field="product_id" title="ID" />
          <Column field="display_name" title="Product Name" />
          <Column field="status" title="Status" />
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
