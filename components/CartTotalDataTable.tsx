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
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

export default function CartTotalDataTable({cart, onPayClick}: {cart: any, onPayClick: any}) {

  const PayCommandCell = (props: GridCellProps) => (
    <PayCommand {...props} onPayClick={onPayClick}/>
  )

  return (
    <div style={{ marginTop: 40 }}>
      <Grid data={[cart]}>
        <Column field="detail_total" title="Sub Total" cell={cellDetailTotal}/>
        <Column field="tax_rate" title="Tax Rate" />
        <Column field="tax_amount" title="Tax Amount" cell={cellTaxAmount} />
        <Column field="total_price" title="Total" cell={cellTotalAmount} />
        <Column cell={PayCommandCell} width={200} />
      </Grid>
    </div>
  );
}
