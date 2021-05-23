import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSuppliers } from '@/utils/Fauna';
import SupplierDataTable from '@/components/SupplierDataTable';

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
    <SupplierDataTable suppliers={suppliers} />
  );
}
