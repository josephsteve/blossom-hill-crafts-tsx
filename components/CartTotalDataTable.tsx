import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';

const PayCommand = (props: any) => {
  return (
    <td>
      <Button primary={true} onClick={props.onPayClick}>Pay Now</Button>
    </td>
  );
}

const cellDetailTotal = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.detail_total;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const cellTaxAmount = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.tax_amount;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const cellTotalAmount = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.total_price;
  return <td style={{ textAlign: 'right', fontSize: 'x-large', fontWeight: 'bolder' }}>{formatter.format(price)}</td>
}

const cellTaxRate = (props: GridCellProps) => {
  return <td style={{ textAlign: 'right' }}>{props.dataItem.tax_rate}</td>
}

const cellTotalItems = (props: GridCellProps) => {
  return <td style={{ textAlign: 'right' }}>{props.dataItem.total_items}</td>
}

export default function CartTotalDataTable({cart, onPayClick}: {cart: any, onPayClick: any}) {

  const PayCommandCell = (props: GridCellProps) => (
    <PayCommand {...props} onPayClick={onPayClick}/>
  )

  return (
    <div style={{ marginInlineStart: 40 }}>
      <Grid data={[cart]}>
        <Column field="total_items" title="Total Items" cell={cellTotalItems} />
        <Column field="detail_total" title="Sub Total" cell={cellDetailTotal}/>
        <Column field="tax_rate" title="Tax Rate" cell={cellTaxRate}/>
        <Column field="tax_amount" title="Tax Amount" cell={cellTaxAmount} />
        <Column field="total_price" title="Total" cell={cellTotalAmount} />
        <Column cell={PayCommandCell} width={200} />
      </Grid>
    </div>
  );
}
