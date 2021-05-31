import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Page from '@/components/layout/Page';
import { getSuppliers } from '@/utils/Fauna';
import ProductDataForm from '@/components/ProductDataForm';
import { Product } from '@/utils/models';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const suppliers = await getSuppliers();
    const statuses = ['in_studio','in_display','in_stock','sold','return'];

    return {
      props: { suppliers, statuses },
    }
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function ProductNew({suppliers, statuses}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  async function handleSubmit(values: {[p: string]: any }) {
    try {
      console.log('form values', '=>', values);
      const product: Product = { product_id: 0, display_name: values.display_name,
        status: values.status, description: values.description,
        price_current: Number(values.price_current),
        supplier_ref_id: values.supplier
      };
      console.log('product', '=>', product);
      await fetch('/api/product_add', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await router.push('/product');
    } catch (error) {
      console.error(error);
    }
  }

  const initialValues = { product_id: '', status: '', display_name: '', description: '', supplier: '', price_current: '' };

  return (
    <>
      <Page>
        <ProductDataForm initialValues={initialValues} handleSubmit={handleSubmit} statuses={statuses} suppliers={suppliers} />
        <style>{`
          .k-input {
            background-color: #ffffff;
          }
        `}</style>
      </Page>
    </>
  );
}
