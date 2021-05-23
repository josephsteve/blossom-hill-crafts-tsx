import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getProducts } from '@/utils/Fauna';
import ProductDataTable from '@/components/ProductDataTable';
import Page from '@/components/layout/Page';

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await getProducts();
  return {
    props: {
      products,
    }
  }
}

export default function Product({products}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <ProductDataTable products={products} />
    </Page>
  );
}
