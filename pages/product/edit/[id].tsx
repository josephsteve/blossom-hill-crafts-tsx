import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Page from '@/components/layout/Page';
import { getPricingLogByProductId, getProductById, getStatusLogByProductId, getSuppliers } from '@/utils/Fauna';
import ProductDataForm from '@/components/ProductDataForm';
import { Product } from '@/utils/models';
import ProductPricingLog from '@/components/ProductPricingLog';
import { useAppContext } from '../../AppWrapper';
import StatusPricingLog from '@/components/StatusPricingLog';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // @ts-ignore
    const id = context.params.id;
    //console.log(id);
    const product = await getProductById(typeof id === 'string' ? id : '');
    const suppliers = await getSuppliers();
    const pricinglog = await getPricingLogByProductId(typeof id === 'string' ? id : '');
    const statuslog = await getStatusLogByProductId(typeof id === 'string' ? id : '');
    const statuses = ['in_studio','in_display','in_stock','sold','return'];

    return {
      props: { product, suppliers, statuses, pricinglog, statuslog }
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Home({product, suppliers, statuses, pricinglog, statuslog}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const appContext = useAppContext();
  const back_url = appContext.back_url;

  async function handleSubmit(values: {[p: string]: any }) {
    try {
      console.log('form values', '=>', values);
      const product: Product = { id: values.id,
        product_id: values.product_id, display_name: values.display_name,
        status: values.status, description: values.description,
        price_current: Number(values.price_current),
        supplier_ref_id: values.supplier
      };
      console.log('product', '=>', product);
      await fetch('/api/product_edit', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const url = back_url || '/product';
      await router.push(url);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/product_delete?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const url = back_url || '/product';
      await router.push(url);
    } catch (error) {
      console.error(error);
    }
  }

  const initialValues = { id: product.id,
    product_id: product.product_id, status: product.status, display_name: product.display_name, description: product.description, supplier: product.supplier_ref_id, price_current: product.price_current
  };

  return (
    <>
      <Page>
        <h3>Edit Product ({initialValues.display_name})</h3>
        <ProductDataForm initialValues={initialValues} handleSubmit={handleSubmit} statuses={statuses} suppliers={suppliers} handleDelete={() => handleDelete(product.id)}
                         back_url={back_url} />
        <div style={{ flexDirection: 'row', display: 'inline-flex', marginTop: 40, justifyContent: 'space-between' }}>
          <StatusPricingLog statuslog={statuslog} />
          <ProductPricingLog pricinglog={pricinglog} />
        </div>
        <style>{`
          .k-input {
            background-color: #ffffff;
          }
        `}</style>
      </Page>
    </>
  );
}
