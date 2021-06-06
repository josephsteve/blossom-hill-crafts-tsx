import Page from '@/components/layout/Page';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";
import React from 'react';
import Link from 'next/link';
import { Supplier } from '@/utils/models';
import { useRouter } from 'next/router';
import SupplierDataForm from '@/components/SupplierDataForm';

export default function SupplierNew() {
  const router = useRouter();

  const supplierIdField = (props: FieldRenderProps) => {
    return (
      <Input disabled={true} value={props.value} label={'Supplier Id (AutoIncrement)'} />
    );
  };

  const SupplierNameValidator = (value: string) => !value ? 'Supplier Name is required' : '';

  async function handleSubmit(values: { [p: string]: any }) {
    const supplier: Supplier = {supplier_id: Number(values.supplier_id), display_name: values.display_name};
    try {
      await fetch('/api/supplier_add', {
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

  const initialValues = { supplier_id: 0, display_name: ""};

  return (
    <Page>
      <h3>Add New Supplier</h3>
      <SupplierDataForm initialValues={initialValues} handleSubmit={handleSubmit} />
      <style>{`
          .k-input {
            background-color: #ffffff;
          }
      `}</style>
    </Page>
  );
}
