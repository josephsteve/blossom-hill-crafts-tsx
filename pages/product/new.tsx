import { useRouter } from 'next/router';
import { Field, FieldRenderProps, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import React, { useState } from 'react';
import Page from '@/components/layout/Page';
import { Box, Button, Select } from '@chakra-ui/react';
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSuppliers } from '@/utils/Fauna';
import Link from 'next/link';
import { Product } from '@/utils/models';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const suppliers = await getSuppliers();
    return {
      props: { suppliers },
    }
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function ProductNew({suppliers}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [statusValue, setStatusValue] = useState('');
  const [supplierValue, setSupplierValue] = useState('');

  const productIdField = (props: FieldRenderProps) => {
    return (
      <>
        <label>Product Id</label>
        <Input id={'product_input_id'} disabled={true} value={props.value} label={'(AutoIncrement)'} />
      </>
    );
  }

  const statusOnChange = (event: any) => {
    setStatusValue(event.target.value);
  }

  const statusField = (props: FieldRenderProps) => {
    const statuses = ['in_studio','in_display','in_stock','sold','return'];
    return (
      <>
        <label id={'status_label_id'}>Status</label>
        <Select id={'status_select_id'} placeholder="Select option" bg="white" onChange={statusOnChange} value={statusValue}>
          {statuses.map((value) => (
            <option key={value.toString()} value={value}>{value}</option>
          ))}
        </Select>
      </>
    );
    /*return (
      <DropDownList data={statuses} value={statusValue} label={'Status'} onChange={statusOnChange} />
    );*/
  }

  const supplierOnChange = (event: any) => {
    setSupplierValue(event.target.value);
  }

  const supplierField = (props: FieldRenderProps) => {
    return (
      <>
        <label id={'supplier_label_id'}>Supplier</label>
        <Select id={'supplier_select_id'} placeholder="Select option" bg="white" onChange={supplierOnChange} value={supplierValue}>
          {suppliers.map((item: any) => (
            <option key={item.id} value={item.id}>({item.supplier_id}) {item.display_name}</option>
          ))}
        </Select>
      </>
    );
    /*return (
      <DropDownList data={suppliers} textField="display_name"
                    value={supplierNameValue} label={'Supplier'} onChange={supplierOnChange} />
    );*/
  }

  async function handleSubmit(values: {[p: string]: any }) {
    try {
      /*const product: any = { ...value };
      product.status = statusValue;
      product.supplier_ref_id = supplierValue;
      console.log(product);*/
      const product: Product = { product_id: 0, display_name: values.display_name,
        status: statusValue, price_max: Number(values.price_max), price_min: Number(values.price_min),
        price_current: Number(values.price_current), price_sell: Number(values.price_sell),
        last_price_change: '', supplier_ref_id: supplierValue };
      console.log(product);
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
    <Page>
      <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
          <FormElement>
            <fieldset>
              <legend className={'k-form-legend'}>Fill in the fields:</legend>
              <div className="k-mb-3">
                <Field id={'product_id'} name={'product_id'} component={productIdField} />
              </div>
              <div className="k-mb-3">
                <Field id={'display_name'} name={'display_name'} component={Input} label={'Product Name'} placeholder={'Enter Product Description'} />
              </div>
              <div className="k-mb-3">
                <Field id={'supplier_ref_id'} name={'supplier_ref_id'} component={supplierField} />
              </div>
              <div className="k-mb-3">
                <Field id={'price_min'} name={'price_min'} component={Input} label={'Price (Min)'} placeholder={'Enter Minimum Price'} />
              </div>
              <div className="k-mb-3">
                <Field id={'price_max'} name={'price_max'} component={Input} label={'Price (Max)'} placeholder={'Enter Maximum Price'}/>
              </div>
              <div className="k-mb-3">
                <Field id={'price_current'} name={'price_current'} component={Input} label={'Price (Current)'} placeholder={'Enter Current Price'}/>
              </div>
              <div className="mb-3">
                <Field id={'price_sell'} name={'price_sell'} component={Input} label={'Price (Sell)'} placeholder={'Enter Selling Price'} />
              </div>
              <div>
                <Field id={'status'} name={'status'} component={statusField} label={'Status'} />
              </div>
              <div className="k-form-buttons">
                <Button colorScheme="blue" type={'submit'} disabled={!formRenderProps.allowSubmit}>Save</Button>
                <Link href="/product"><Button colorScheme="gray">Cancel</Button></Link>
              </div>
            </fieldset>
          </FormElement>
        )} />
      </Box>
    </Page>
  );
}
