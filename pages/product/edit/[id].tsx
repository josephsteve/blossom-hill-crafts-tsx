import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getProductById, getSuppliers } from '@/utils/Fauna';
import { useRouter } from 'next/router';
import { Product } from '@/utils/models';
import Page from '@/components/layout/Page';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormInputField } from '@/components/fields/FormInputField';
import { FormProductStatusField } from '@/components/fields/FormProductStatusField';
import { FormProductSupplierField } from '@/components/fields/FormProductSupplierField';
import { Button } from '@progress/kendo-react-buttons';
import Link from 'next/link';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // @ts-ignore
    const id = context.params.id;
    console.log(id);
    const product = await getProductById(typeof id === 'string' ? id : '');
    const suppliers = await getSuppliers();
    const statuses = ['in_studio','in_display','in_stock','sold','return'];

    return {
      props: { product, suppliers, statuses }
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Home({product, suppliers, statuses}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const ProductStatusValidator = (value: string) => !value ? 'Product Status is required' : '';
  const ProductNameValidator = (value: string) => !value ? 'Product Name is required' : '';
  const SupplierValidator = (value: any) => !value ? 'Supplier is required' : '';
  const PriceValidator = (value: any) => !value ? 'Price is required' : isNaN(value) ? 'Price should be number' : '';

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
      await router.push('/product');
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
      await router.push('/product');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Page>
        <Form initialValues={{ id: product.id,
          product_id: product.product_id, status: product.status, display_name: product.display_name, description: product.description, supplier: product.supplier_ref_id, price_current: product.price_current
        }} onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement style={{ marginInline: 40 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Field id={'product_id'} name={'product_id'} component={FormInputField} disabled={true} label={'Product Id'} placeholder={'Product Id (AutoIncrement)'} wrapperStyle={{ width: '100%', marginRight: '18px' }}/>
              <Field id={'status_id'} name={'status'} component={FormProductStatusField} statuses={statuses} label={'Product Status'} validator={ProductStatusValidator} wrapperStyle={{ width: '100%' }}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Field id={'display_name'} name={'display_name'} component={FormInputField} label={'Product Name'} validator={ProductNameValidator} placeholder={'Enter Product Name'} wrapperStyle={{ width: '100%', marginRight: '18px' }}/>
              <Field id={'description'} name={'description'} component={FormInputField} label={'Description'} placeholder={'Enter Product Description'} wrapperStyle={{ width: '100%' }}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Field id={'supplier'} name={'supplier'} component={FormProductSupplierField} suppliers={suppliers} label={'Supplier'} validator={SupplierValidator} wrapperStyle={{ width: '100%', marginRight: '18px' }}/>
              <Field id={'price_current'} name={'price_current'} component={FormInputField} label={'Price (Current)'} validator={PriceValidator} placeholder={'Enter Current Price'} wrapperStyle={{ width: '100%' }}/>
            </div>
            <div className="k-form-buttons" style={{ marginTop: '20px' }}>
              <Button primary={true} type={'submit'} disabled={!formRenderProps.allowSubmit}>Save</Button>
              <Link href="/product"><Button>Cancel</Button></Link>
              <Button onClick={() => handleDelete(product.id)}>Delete</Button>
            </div>
          </FormElement>
        )} />
        <style>{`
          .k-input {
            background-color: #ffffff;
          }
        `}</style>
      </Page>
    </>
  );
}
