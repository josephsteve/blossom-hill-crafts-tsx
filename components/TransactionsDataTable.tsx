import { Transaction } from '@/utils/models/transaction.model';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import React from 'react';

const cellTotalItems = (props: GridCellProps) => {
  return <td style={{ textAlign: 'center' }}>{props.dataItem.total_items}</td>
}

const cellTaxRate = (props: GridCellProps) => {
  return <td style={{ textAlign: 'center' }}>{props.dataItem.tax_rate}</td>
}

const cellSubTotal = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.detail_total;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const cellTaxAmount = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.tax_amount;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const cellTotalSales = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.total_price;
  return <td style={{ textAlign: 'right', fontWeight: 'bolder' }}>{formatter.format(price)}</td>
}

export default function TransactionsDataTable ({transactions}: {transactions: Transaction[]}) {
  return (
    <>
      <Grid data={transactions}>
        <Column field="transaction_date" title="Transaction Date" />
        <Column field="total_items" title="Total Items" cell={cellTotalItems} />
        <Column field="detail_total" title="SubTotal" cell={cellSubTotal} />
        <Column field="tax_rate" title="Tax Rate" cell={cellTaxRate} />
        <Column field="tax_amount" title="Tax Amount" cell={cellTaxAmount} />
        <Column field="total_price" title="Total Sales" cell={cellTotalSales} />
      </Grid>
    </>
  );
}
