import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormInputField } from '@/components/fields/FormInputField';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

export default function SupplierDataForm ({initialValues, handleSubmit, handleDelete}: {initialValues: any, handleSubmit: any, handleDelete?: any}) {
  const [deleteConfirm, showDeleteConfirm] = useState(false);

  const SupplierNameValidator = (value: string) => !value ? 'Supplier Name is required' : '';

  return (
    <>
      <Form initialValues={initialValues} onSubmit={handleSubmit}
        render={(formRenderProps) => (
          <FormElement style={{ marginInline: 40 }}>
            <div className="k-mb-3">
              <Field id={'supplier_id_edit'} name={'supplier_id'} component={FormInputField} disabled={true} placeholder={'Supplier Id (AutoIncrement)'} wrapperStyle={{ width: '100%', marginRight: '18px' }}/>
            </div>
            <div className="k-mb-3">
              <Field id={'display_name_edit'} name={'display_name'} component={FormInputField} validator={SupplierNameValidator} label={'Supplier Name'} wrapperStyle={{ width: '100%' }}/>
            </div>
            <div className="k-form-buttons">
              <Button primary={true} type={'submit'} disabled={!formRenderProps.allowSubmit}>Save</Button>
              <Link href="/supplier"><Button>Cancel</Button></Link>
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
