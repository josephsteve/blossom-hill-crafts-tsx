import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSuppliers } from '@/utils/Fauna';
import SupplierDataTable from '@/components/SupplierDataTable';
import Page from '@/components/layout/Page';

export const getStaticProps: GetStaticProps = async (context) => {
  const suppliers = await getSuppliers();
  return {
    props: {
      suppliers,
    }
  }
}

export default function Supplier({suppliers}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Page>
      <SupplierDataTable suppliers={suppliers} />
    </Page>
  );
}
