import { Product } from '@/utils/models';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';

const cellPriceCurrent = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.price_current;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const AddToCartCommandCell = (props: any) => {
  return (
    <td>
      <Button primary={true} onClick={() => props.onAddToCart(props.dataItem)}>Add</Button>
    </td>
  );
}

export default function CartSearchProductTable({products, onAddToCart}:
  {products: Product[], onAddToCart: any}) {

  const AddToCartCommand = (props: GridCellProps) => (
    <AddToCartCommandCell {...props} onAddToCart={onAddToCart} />
  );

  return (
    <div style={{ marginTop: 15 }}>
      <Grid data={products}>
        <Column field="display_name" title="Product Name" />
        <Column field="description" title="Description" />
        <Column field="supplier_name" title="Supplier Name" />
        <Column field="status" title="Status" />
        {/*<Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
        <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
        <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />*/}
        <Column field="price_current" format="{0: $#,##.00}" title="Price Cur" cell={cellPriceCurrent} />
        {/*<Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>*/}
        <Column cell={AddToCartCommand} width={100} />
      </Grid>
    </div>
  );
}
