import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getProducts } from '@/utils/Fauna';
import ProductDataTable from '@/components/ProductDataTable';
import Page from '@/components/layout/Page';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const products = await getProducts();
    return {
      props: { products }
    }
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Product({products}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <h3>Products</h3>
      <ProductDataTable products={products} />
    </Page>
  );
}
