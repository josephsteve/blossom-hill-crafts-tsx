import { Supplier } from '@/utils/models';
import { useRouter } from 'next/router';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSupplierById } from '@/utils/Fauna';
import Page from '@/components/layout/Page';
import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // @ts-ignore
    const id = context.params.id;
    const supplier = await getSupplierById(typeof id === 'string' ? id : '');
    return {
      props: { supplier },
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Home({supplier}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const supplierIdField = (props: FieldRenderProps) => {
    return (
      <Input disabled={true} value={props.value} label={'Supplier Id (AutoIncrement)'} />
    );
  };

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

  return (
    <Page>
      <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
        <Form
          initialValues={supplier}
          onSubmit={handleSubmit} render={(formRenderProps) => (
          <FormElement style={{maxWidth: 650}}>
            <fieldset className={'k-form-fieldset'}>
              <legend className={'k-form-legend'}>Fill in the fields:</legend>

              <div className="mb-3">
                <Field id={'supplier_id_edit'} name={'supplier_id'} component={supplierIdField} />
              </div>

              <div className="mb-3">
                <Field id={'display_name_edit'} name={'display_name'} component={Input} label={'Supplier Name'} />
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