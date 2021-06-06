import Page from '@/components/layout/Page';
import { useState } from 'react';
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { FormInputField } from '@/components/fields/FormInputField';
import { Button } from '@progress/kendo-react-buttons';
import CartSearchProductTable from '@/components/CartSearchProductTable';
import CartTotalDataTable from '@/components/CartTotalDataTable';
import CartDetailDataTable from '@/components/CartDetailDataTable';
import { filterBy } from '@progress/kendo-data-query';

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

  const handleAddToCart = (dataItem: any) => {
    const filtered = filterBy(cartproducts, { logic: 'and', filters: [{field:'id', operator:'eq', value:dataItem.id}]});
    if (!filtered || filtered.length === 0) {
      // @ts-ignore
      addCartProduct(prevState => ([...prevState, dataItem]));

      setShowSearchProductTable(false);
      const amount = dataItem.price_current;
      const subtotal = cartTotal.detail_total + amount;
      const total_items = cartTotal.total_items + 1;
      setCartTotal(prevState => ({...prevState,
        total_items: total_items,
        detail_total: subtotal,
        tax_amount: subtotal * 0.0925,
        total_price: subtotal + (subtotal * 0.0925)
      }));
      resetSearch({ product_id: '' });
    } else {
      setShowProductAlreadyInCart(true);
      setShowSearchProductTable(false);
    }
  }

  const onDeleteItem = (dataItem: any) => {
    console.log(dataItem);

    // @ts-ignore
    addCartProduct(prevState => {
      let newdata = filterBy(prevState, { logic: 'and', filters: [{ field: 'id', operator: 'neq', value: dataItem.id }]});
      console.log(newdata);
      return newdata;
    });

    const amount = dataItem.price_current;
    const subtotal = cartTotal.detail_total - amount;
    const total_items = cartTotal.total_items - 1;
    setCartTotal(prevState => ({...prevState,
      total_items: total_items,
      detail_total: subtotal,
      tax_amount: subtotal * 0.0925,
      total_price: subtotal + (subtotal * 0.0925)
    }));
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
        <CartTotalDataTable cart={cartTotal} onPayClick={() => null} />
      </div>
      {showSearchProductTable && <CartSearchProductTable products={products} onAddToCart={handleAddToCart} onSearchClose={onSearchClose}/>}
      {showProductNotFound && <div style={{ marginTop: 20, marginInlineStart: 30 }}>Product Not Found</div>}
      {showProductAlreadyInCart && <div style={{ marginTop: 20, marginInlineStart: 30 }}>Product Already In Cart</div>}
      <CartDetailDataTable cartproducts={cartproducts} onDeleteItem={onDeleteItem} />
    </Page>
  );
}
