import React, { useState } from 'react';
import Link from 'next/link';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { FormInputField } from '@/components/fields/FormInputField';
import { FormProductStatusField } from '@/components/fields/FormProductStatusField';
import { FormProductSupplierField } from '@/components/fields/FormProductSupplierField';
import { useRouter } from 'next/router';

export default function ProductDataForm ({initialValues, handleSubmit, statuses, suppliers, handleDelete, back_url}:
  {initialValues: any, handleSubmit: any, statuses: any, suppliers: any, handleDelete?: any, back_url?: any }) {
  const [deleteConfirm, showDeleteConfirm] = useState(false);
  const router = useRouter();

  const ProductStatusValidator = (value: string) => !value ? 'Product Status is required' : '';
  const ProductNameValidator = (value: string) => !value ? 'Product Name is required' : '';
  const SupplierValidator = (value: any) => !value ? 'Supplier is required' : '';
  const PriceValidator = (value: any) => !value ? 'Price is required' : isNaN(value) ? 'Price should be number' : '';

  function onCancelClicked() {
    const url = back_url || '/product';
    router.push(url);
  }

  return (
    <>
      <Form initialValues={initialValues} onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement>
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
              <Button onClick={onCancelClicked}>Cancel</Button>
              {handleDelete && <Button onClick={() => showDeleteConfirm(true)}>Delete</Button>}
            </div>
          </FormElement>
        )} />
      {deleteConfirm &&
      <Dialog title={'Please Confirm'} onClose={() => showDeleteConfirm(false)}>
        <p style={{textAlign:'center'}}>Are you sure you want to delete?</p>
        <DialogActionsBar>
          <button className={'k-button'} onClick={() => showDeleteConfirm(false)}>No</button>
          <button className={'k-button'} onClick={handleDelete}>Yes</button>
        </DialogActionsBar>
      </Dialog>}
    </>

  );
}
