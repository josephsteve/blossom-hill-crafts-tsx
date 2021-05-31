import { useRouter } from 'next/router';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import React, { useState } from 'react';
import Page from '@/components/layout/Page';
import { Button } from "@progress/kendo-react-buttons";
import { DropDownList, ListItemProps } from '@progress/kendo-react-dropdowns';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSuppliers } from '@/utils/Fauna';
import Link from 'next/link';
import { Product } from '@/utils/models';
import styles from '@/styles/Product.module.scss';
import { classNames } from '@progress/kendo-react-common';
import { Label } from '@progress/kendo-react-labels';
import { FormInputField } from '@/components/fields/FormInputField';
import { FormProductStatusField } from '@/components/fields/FormProductStatusField';
import { FormProductSupplierField } from '@/components/fields/FormProductSupplierField';

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

  const ProductStatusValidator = (value: string) => !value ? 'Product Status is required' : '';
  const ProductNameValidator = (value: string) => !value ? 'Product Name is required' : '';
  const SupplierValidator = (value: any) => !value ? 'Supplier is required' : '';
  const PriceValidator = (value: any) => !value ? 'Price is required' : isNaN(value) ? 'Price should be number' : '';

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

  return (
    <>
      <Page>
        <Form initialValues={{
            product_id: '', status: '', display_name: '', description: '', supplier: '', price_current: ''
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
