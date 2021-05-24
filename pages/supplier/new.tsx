import Page from '@/components/layout/Page';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Box, Button } from '@chakra-ui/react';
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
      <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
        <Form
          initialValues={
            { supplier_id: 0, display_name: ""}
          }
          onSubmit={handleSubmit} render={(formRenderProps) => (
          <FormElement style={{maxWidth: 650}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>Fill in the fields:</legend>

              <div className="mb-3">
                <Field id={'supplier_id'} name={'supplier_id'} component={supplierIdField} />
              </div>

              <div className="mb-3">
                <Field id={'display_name'} name={'display_name'} component={Input} label={'Supplier Name'} />
              </div>
            </fieldset>
            <div className="k-form-buttons">
              <Button colorScheme="blue" type={'submit'} disabled={!formRenderProps.allowSubmit}>Save</Button>
              <Link href="/supplier"><Button colorScheme="gray">Cancel</Button></Link>
            </div>
          </FormElement>
        )} />
      </Box>
    </Page>
  );
}
