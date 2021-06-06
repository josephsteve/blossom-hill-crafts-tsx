import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';

const cellPriceCurrent = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem?.price_current ?? 0;
  return <td style={{ textAlign: 'right', fontSize: 'large', fontWeight: 'bold' }}>{formatter.format(price)}</td>
}

const DeleteCommandCell = (props: any) => {
  return (
    <td>
      <Button look={'flat'} onClick={() => props.onDeleteItem(props.dataItem)}>Remove</Button>
    </td>
  );
}

export default function CartDetailDataTable ({cartproducts, onDeleteItem}: {cartproducts: any, onDeleteItem: any}) {

  const DeleteCommand = (props: GridCellProps) => {
    return <DeleteCommandCell {...props} onDeleteItem={onDeleteItem} />
  }

  return (
    <div style={{ marginTop: 60 }}>
      <Grid data={cartproducts}>
        <Column field="product_id" title="ID" width={90} />
        <Column field="display_name" title="Product Name" />
        <Column field="description" title="Description" />
        <Column field="supplier_name" title="Supplier Name" />
        <Column field="price_current" format="{0: $#,##.00}" title="Price Cur" width={137} cell={cellPriceCurrent} />
        <Column cell={DeleteCommand} width={200} />
      </Grid>
    </div>
  );
}
