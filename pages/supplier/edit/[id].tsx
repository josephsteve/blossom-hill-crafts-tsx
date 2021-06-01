import { Supplier } from '@/utils/models';
import { useRouter } from 'next/router';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getProductsBySupplierId, getSupplierById } from '@/utils/Fauna';
import Page from '@/components/layout/Page';
import { Button } from '@progress/kendo-react-buttons';
import Link from 'next/link';
import SupplierDataForm from '@/components/SupplierDataForm';
import SupplierProductsTable from '@/components/SupplierProductsTable';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // @ts-ignore
    const id = context.params.id;
    console.log(id);
    const supplier = await getSupplierById(typeof id === 'string' ? id : '');
    const products = await getProductsBySupplierId(typeof id === 'string' ? id : '');
    return {
      props: { supplier, products },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Home({supplier, products}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const supplierIdField = (props: FieldRenderProps) => {
    return (
      <Input disabled={true} value={props.value} label={'Supplier Id (AutoIncrement)'} />
    );
  };

  const SupplierNameValidator = (value: string) => !value ? 'Supplier Name is required' : '';

  async function handleSubmit(values: { [p: string]: any }) {
    const supplier: Supplier = {id: values.id, supplier_id: Number(values.supplier_id), display_name: values.display_name};
    try {
      await fetch('/api/supplier_edit', {
        method: 'POST',
        body: JSON.stringify(supplier),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await router.push('/supplier');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/supplier_delete?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await router.push('/supplier');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Page>
      <SupplierDataForm initialValues={supplier} handleSubmit={handleSubmit} handleDelete={() => handleDelete(supplier.id)} />
      <SupplierProductsTable products={products} />
      <style>{`
          .k-input {
            background-color: #ffffff;
          }
      `}</style>
    </Page>
  );
}
