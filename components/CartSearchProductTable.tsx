import { Product } from '@/utils/models';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';

const cellPriceCurrent = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.price_current;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const AddToCartCommandCell = (props: any) => {
  return (
    <td>
      <Button primary={true} disabled={props.dataItem.status === 'sold'} onClick={() => props.onAddToCart(props.dataItem)}>Add</Button>
      <Button onClick={props.onSearchClose} style={{ marginInlineStart: 10 }}>Close</Button>
    </td>
  );
}

export default function CartSearchProductTable({products, onAddToCart, onSearchClose}:
  {products: Product[], onAddToCart: any, onSearchClose: any}) {

  const AddToCartCommand = (props: GridCellProps) => (
    <AddToCartCommandCell {...props} onAddToCart={onAddToCart} onSearchClose={onSearchClose} />
  );

  const statusCell = (props: GridCellProps) => {
    return (<td><span style={props.dataItem.status === 'sold' ? { fontWeight: 'bold', color: 'red' } : {}}>{props.dataItem.status}</span></td>);
  }

  const inEditProducts = products.map(item => ({ ...item, inEdit: true }));

  const [data, setData] = useState(inEditProducts);

  const itemChange = (e: any) => {
    let newData = data.map(item => {
      if (item.id === e.dataItem.id) {
        // @ts-ignore
        item[e.field || ''] = e.value;
      }

      return item;
    });
    setData(newData);
  };

  return (
    <div style={{ marginTop: 15 }}>
      <Grid data={data} editField={'inEdit'} onItemChange={itemChange}>
        <Column field="display_name" title="Product Name" editable={false} />
        <Column field="description" title="Description" editable={false} />
        <Column field="supplier_name" title="Supplier Name" editable={false} />
        <Column field="status" title="Status" editable={false} cell={statusCell} />
        {/*<Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
        <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
        <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />*/}
        <Column field="price_current" format="{0: $#,##.00}" title="Price Cur"  editor={'numeric'} />
        {/*<Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>*/}
        <Column cell={AddToCartCommand} />
      </Grid>
    </div>
  );
}
