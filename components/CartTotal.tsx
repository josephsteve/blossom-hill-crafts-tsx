import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormInputField } from '@/components/fields/FormInputField';
import { Button } from '@progress/kendo-react-buttons';

export default function CartTotal({cart_total}: {cart_total: any}) {
  return (
    <div style={{ marginInlineStart: 10 }}>
      <p>{cart_total.detail_total}</p>
      <Form initialValues={cart_total} render={formRenderProps =>
        <FormElement>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Field id={'detail_total'} name={'detail_total'} component={FormInputField} label={'Subtotal'}
                     value={formRenderProps.valueGetter('detail_total')} />
              <Field id={'tax_rate'} name={'tax_rate'} component={FormInputField} label={'Tax Rate'}
                     value={formRenderProps.valueGetter('tax_rate')} />
              <Field id={'tax_amount'} name={'tax_amount'} component={FormInputField} label={'Tax Amount'}
                     value={formRenderProps.valueGetter('tax_amount')} />
              <Field id={'total_price'} name={'total_price'} component={FormInputField} label={'Total'}
                     value={formRenderProps.valueGetter('total_price')} />
            </div>
            <div className="k-form-buttons k-justify-content-end">
              <Button primary={true} type={'submit'} disabled={!formRenderProps.allowSubmit}>Search</Button>
            </div>

        </FormElement>
      }/>
    </div>
  );
}
