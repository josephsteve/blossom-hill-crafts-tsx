import Page from '@/components/layout/Page';
import Dashboard from '@/components/Dashboard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getProductsCount, getSuppliers } from '@/utils/Fauna';
import { DashboardData } from '@/utils/models/dashboard.model';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const products_all_count: any = await getProductsCount();
    const products_in_display_count: any = await getProductsCount('in_display');
    const products_in_stock_count: any = await getProductsCount('in_stock');
    const products_in_studio_count: any = await getProductsCount('in_studio');
    const products_sold_count: any = await getProductsCount('sold');
    const products_return_count: any = await getProductsCount('return');
    const dashboard: DashboardData = {
      products_all_count: products_all_count,
      products_in_display_count: products_in_display_count,
      products_in_stock_count: products_in_stock_count,
      products_in_studio_count: products_in_studio_count,
      products_sold_count: products_sold_count,
      products_return_count: products_return_count,
      products_sales: 0
    };
    return {
      props: { dashboard }
    }
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Home({dashboard}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <Dashboard data={dashboard} />
    </Page>
  );
}
