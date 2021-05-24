import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSuppliers } from '@/utils/Fauna';
import SupplierDataTable from '@/components/SupplierDataTable';
import Page from '@/components/layout/Page';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const suppliers = await getSuppliers();
    return {
      props: { suppliers }
    }
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Supplier({suppliers}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <SupplierDataTable suppliers={suppliers} />
    </Page>
  );
}
