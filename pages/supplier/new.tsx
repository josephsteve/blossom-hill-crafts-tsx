import Page from '@/components/layout/Page';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from "@progress/kendo-react-buttons";
import React from 'react';
import Link from 'next/link';
import { Supplier } from '@/utils/models';
import { useRouter } from 'next/router';

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

  return (
    <Page>
      <Form
        initialValues={
          { supplier_id: 0, display_name: ""}
        }
        onSubmit={handleSubmit} render={(formRenderProps) => (
        <FormElement style={{ marginInline: 40 }}>
          <div className="k-mb-3">
            <Field id={'supplier_id'} name={'supplier_id'} component={supplierIdField} />
          </div>
          <div className="k-mb-3">
            <Field id={'display_name'} name={'display_name'} component={Input} validator={SupplierNameValidator} label={'Supplier Name'} placeholder={'Enter Supplier'} />
          </div>
          <div className="k-form-buttons" style={{ marginTop: '20px' }}>
            <Button primary={true} type={'submit'} disabled={!formRenderProps.allowSubmit}>Save</Button>
            <Link href="/supplier"><Button>Cancel</Button></Link>
          </div>
        </FormElement>
      )} />
      <style>{`
          .k-input {
            background-color: #ffffff;
          }
      `}</style>
    </Page>
  );
}
