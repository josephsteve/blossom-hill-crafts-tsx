import Page from '@/components/layout/Page';
import { useState } from 'react';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormInputField } from '@/components/fields/FormInputField';
import { Button } from '@progress/kendo-react-buttons';
import CartSearchProductTable from '@/components/CartSearchProductTable';
import CartTotalDataTable from '@/components/CartTotalDataTable';
import CartDetailDataTable from '@/components/CartDetailDataTable';
import { filterBy } from '@progress/kendo-data-query';
import { Transaction, TransactionDetail } from '@/utils/models/transaction.model';
import moment from 'moment';

export default function Home() {
  const [productSearch, resetSearch] = useState({ product_id: '' });

  const [cartTotal, setCartTotal] = useState({
    total_items: 0,
    detail_total: 0,
    tax_rate: '9.25%',
    tax_amount: 0,
    total_price: 0
  });
  const [showSearchProductTable, setShowSearchProductTable] = useState(false);
  const [showProductNotFound, setShowProductNotFound] = useState(false);
  const [showProductAlreadyInCart, setShowProductAlreadyInCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartproducts, addCartProduct] = useState([]);
  const apiUrl = (product_id: string) => `/api/products_by_product_id?product_id=${product_id}`;

  const productIdValidator = (value: any) => !value ? 'Enter Product Id' : isNaN(value) ? 'Product Id should be a number' : '';

  const calculateTotal = (amount: number) => {
    const detail_total = cartTotal.detail_total + amount;
    const tax_amount = Number((detail_total * 0.0925).toFixed(2));
    const total_price = detail_total + tax_amount;
    const total_items = cartTotal.total_items + (amount >= 0 ? 1 : -1);
    setCartTotal(prevState => ({...prevState, total_items, detail_total, tax_amount, total_price }));

    setShowProductAlreadyInCart(false);
    setShowSearchProductTable(false);
    resetSearch({ product_id: '' });
  }

  const handleAddToCart = (dataItem: any) => {
    const filtered = filterBy(cartproducts, { logic: 'and', filters: [{field:'id', operator:'eq', value:dataItem.id}]});
    if (!filtered || filtered.length === 0) {
      // @ts-ignore
      addCartProduct(prevState => ([...prevState, dataItem]));

      setShowSearchProductTable(false);
      const amount = dataItem.price_current;
      calculateTotal(amount);
    } else {
      setShowProductAlreadyInCart(true);
      setShowSearchProductTable(false);
    }
  }

  const onDeleteItem = (dataItem: any) => {
    // @ts-ignore
    addCartProduct(prevState => {
      let newdata = filterBy(prevState, { logic: 'and', filters: [{ field: 'id', operator: 'neq', value: dataItem.id }]});
      console.log(newdata);
      return newdata;
    });

    const amount = dataItem.price_current;
    calculateTotal(-amount);
  }

  async function onSearchClick(values: {[p: string]: any }) {
    try {
      setShowProductAlreadyInCart(false);

      const response = await fetch(apiUrl(values.product_id), {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'})
      });
      const newproducts = await response.json();
      if (newproducts.length > 0) {
        setProducts(newproducts);
        setShowSearchProductTable(true);
        setShowProductNotFound(false);
      } else {
        setShowProductNotFound(true);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const onSearchClose = () => {
    setShowSearchProductTable(false);
    resetSearch({ product_id: '' });
  }

  const onPayNow = async () => {
    const cart_total: Transaction = {
      trans_date: moment().format('yyyy-MM-DD'),
      total_items: cartTotal.total_items,
      detail_total: cartTotal.detail_total,
      tax_rate: cartTotal.tax_rate,
      tax_amount: cartTotal.tax_amount,
      total_price: cartTotal.total_price
    };
    const cart_details: TransactionDetail[] = cartproducts.map((p: any) => {
      return {
        product_ref_id: p.id,
        product_id: p.product_id,
        product_display_name: p.display_name,
        product_description: p.description,
        price_current: p.price_current,
        price_sell: p.price_current, // TODO: get the price sell vs current
        supplier_ref_id: p.supplier_ref_id,
        supplier_name: p.supplier_name
      };
    });
    const data = {cart_total, cart_details};

    const response = await fetch('api/cart_pay_now', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    console.log('response', '=>', response);
  }

  return (
    <Page>
      <h3>Cart</h3>
      <div style={{ flexDirection: 'row', display: 'inline-flex', alignItems: 'flex-start' }}>
        <div style={{ marginInlineEnd: 30 }}>
        <Form initialValues={productSearch} onSubmit={onSearchClick}
          render={formRenderProps =>
            <FormElement>
              <fieldset className={'k-form-fieldset'} style={{ width: 200 }}>
                <Field id={'product_id'} label={'Product Id'} name={'product_id'} value={'product_id'} component={FormInputField} validator={productIdValidator} />
                <div className="k-form-buttons k-justify-content-end">
                  <Button primary={true} type={'submit'} disabled={!formRenderProps.allowSubmit}>Search</Button>
                </div>
              </fieldset>
            </FormElement>} />
        </div>
        <CartTotalDataTable cart={cartTotal} onPayClick={onPayNow} />
      </div>
      {showSearchProductTable && <CartSearchProductTable products={products} onAddToCart={handleAddToCart} onSearchClose={onSearchClose}/>}
      {showProductNotFound && <div style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold', color: 'red' }}>Product Not Found</div>}
      {showProductAlreadyInCart && <div style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold', color: 'red' }}>Product Already In Cart</div>}
      <CartDetailDataTable cartproducts={cartproducts} onDeleteItem={onDeleteItem} />
    </Page>
  );
}
