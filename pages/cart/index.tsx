import Page from '@/components/layout/Page';
import { useState } from 'react';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormInputField } from '@/components/fields/FormInputField';
import { Button } from '@progress/kendo-react-buttons';
import CartSearchProductTable from '@/components/CartSearchProductTable';
import CartTotalDataTable from '@/components/CartTotalDataTable';

export default function Home() {
  const [cartTotal, setCartTotal] = useState({
    detail_total: 0,
    tax_rate: 0.0925,
    tax_amount: 0,
    total_price: 0
  });
  const [showSearchProductTable, setShowSearchProductTable] = useState(false);
  const [products, setProducts] = useState([]);
  const apiUrl = (product_id: string) => `/api/products_by_product_id?product_id=${product_id}`;

  const productIdValidator = (value: any) => !value ? 'Enter Product Id' : isNaN(value) ? 'Product Id should be a number' : '';

  const handleAddToCart = (amount: number) => {
    const subtotal = cartTotal.detail_total + amount;
    setCartTotal({
      detail_total: subtotal,
      tax_rate: 0.0925,
      tax_amount: subtotal * 0.0925,
      total_price: subtotal + (subtotal * 0.0925)
    });
  };

  async function handleSubmit(values: {[p: string]: any }) {
    try {
      const response = await fetch(apiUrl(values.product_id), {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'})
      });
      setProducts(await response.json());
      setShowSearchProductTable(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Page>
      <h3>Cart</h3>
      <div style={{ flexDirection: 'row', display: 'inline-flex', justifyContent: 'space-between' }}>
        <div style={{ marginInlineEnd: 30 }}>
        <Form initialValues={{ product_id: '' }} onSubmit={handleSubmit}
          render={formRenderProps =>
            <FormElement>
              <fieldset className={'k-form-fieldset'} style={{ width: 200 }}>
                <Field id={'product_id'} label={'Product Id'} value={formRenderProps.valueGetter('product_id')} name={'product_id'} component={FormInputField} validator={productIdValidator} />
                <div className="k-form-buttons k-justify-content-end">
                  <Button primary={true} type={'submit'} disabled={!formRenderProps.allowSubmit}>Search</Button>
                </div>
              </fieldset>
            </FormElement>} />
        </div>
        {showSearchProductTable && <CartSearchProductTable products={products} onAddToCart={() => null}/>}
      </div>
      <CartTotalDataTable cart={cartTotal} onPayClick={() => null} />

    </Page>
  );
}
