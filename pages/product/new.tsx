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

  const productIdField = (props: FieldRenderProps) => {
    return (
      <div style={{ width: '100%', marginRight: '18px' }}>
        <label id={'product_label_id'}>Product Id</label>
        <Input id={'product_input_id'} disabled={true} value={props.value} placeholder={'(AutoIncrement)'} />
      </div>
    );
  }

  const customSupplierItemRender = (el: React.ReactElement<HTMLLIElement>, props: ListItemProps) => (
    <el.type {...el.props} className={classNames('pl-2', el.props.className, styles['ddl-list-item'], { [styles['k-state-selected']]: props.selected })}>
      <span className="ml-3">{props.dataItem.display_name}</span>
    </el.type>
  );

  const customSupplierValueRender = (el: any, value: any) => (
    <el.type {...el.props} className={classNames("pl-2", el.props.className, styles['ddl-list-item'])}>
      {value ? <span className="ml-3">{value.display_name}</span> : null}
    </el.type>)

  const SupplierField = (props: any) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = props;

    const editorRef = React.useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    const handleSupplierChange = React.useCallback(
      (event) => {
        if (props.onChange) {
          props.onChange.call(undefined, { value: event.target.value.id })
        }
      },
      [props.onChange]
    )

    return (
      <div style={{ width: '100%', marginRight: '18px' }}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
        <DropDownList data={suppliers} itemRender={customSupplierItemRender} valueRender={customSupplierValueRender} ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef}
                      value={suppliers.find((i: any) => i.id === props.value)} textField={'display_name'}
                      onChange={handleSupplierChange} valid={valid} id={id} disabled={disabled} {...others}/>
        {/*{showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}*/}
      </div>
    );
  }

  const StatusItemRender = (el: React.ReactElement<HTMLLIElement>, props: ListItemProps) => (
    <el.type {...el.props} className={classNames('pl-2', el.props.className, styles['ddl-list-item'], { [styles['k-state-selected']]: props.selected })}>
      <span className="ml-3">{props.dataItem}</span>
    </el.type>
  );

  const ProductStatusField = (props: FieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = props;

    const statuses = ['in_studio','in_display','in_stock','sold','return'];

    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
      <div style={{ width: '100%'}}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
        <DropDownList data={statuses} itemRender={StatusItemRender} ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef}
                      valid={valid} id={id} disabled={disabled} {...others}/>
        {/*{showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}*/}
      </div>
    );
  }

  const ProductStatusValidator = (value: string) => !value ? 'Product Status is required' : '';
  const ProductNameValidator = (value: string) => !value ? 'Product Name is required' : '';
  const SupplierValidator = (value: any) => !value ? 'Supplier is required' : '';
  const PriceValidator = (value: any) => !value ? 'Price is required' : isNaN(value) ? 'Price should be number' : '';

  async function handleSubmit(values: {[p: string]: any }) {
    console.log('handleSubmit');
    try {
      console.log('form values', '=>', values);
      const product: Product = { product_id: 0, display_name: values.display_name,
        status: values.status,
        // price_max: Number(values.price_max), price_min: Number(values.price_min),
        price_current: Number(values.price_current),
        // price_sell: Number(values.price_sell),
        // last_price_change: '',
        supplier_ref_id: values.supplier.id
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
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
            <FormElement style={{ marginInline: 40 }}>
                <div className="k-mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
                  <Field id={'product_id'} name={'product_id'} component={productIdField} />
                  <Field id={'status_id'} name={'status'} component={ProductStatusField} label={'Product Status'} validator={ProductStatusValidator} />
                </div>
                <div className="k-mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
                  <Field id={'display_name'} name={'display_name'} component={Input} label={'Product Name'} validator={ProductNameValidator} placeholder={'Enter Product Name'} style={{ marginRight: '18px' }} />
                  <Field id={'description'} name={'description'} component={Input} label={'Description'} placeholder={'Enter Product Description'} />
                </div>
                <div className="k-mb-3" style={{ display: "flex", justifyContent: "space-between" }}>
                  <Field id={'supplier'} name={'supplier'} component={SupplierField} label={'Supplier'} validator={SupplierValidator} />
                  <Field id={'price_current'} name={'price_current'} component={Input} label={'Price (Current)'} validator={PriceValidator} placeholder={'Enter Current Price'}/>
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
