import { Transaction } from '@/utils/models/transaction.model';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import React from 'react';
import TableCellTransactionFields from '@/components/fields/TableCellTransactionFields';
import { useRouter } from 'next/router';
import { Button } from '@progress/kendo-react-buttons';


export default function TransactionsDataTable ({transactions}: {transactions: Transaction[]}) {
  const router = useRouter();

  const refIdCell = (props: GridCellProps) => {
    return <td><Button look={'flat'} onClick={() => router.push(`/transaction/detail/${props.dataItem.id}`)}>{props.dataItem.id}</Button></td>
  }

  return (
    <>
      <Grid data={transactions}>
        <Column field="id" title="Id" width={230} cell={refIdCell} />
        <Column field="transaction_date" width={200} title="Transaction Date" cell={TableCellTransactionFields} />
        <Column field="total_items" title="Total Items" cell={TableCellTransactionFields} />
        <Column field="detail_total" title="SubTotal" cell={TableCellTransactionFields} />
        <Column field="tax_rate" title="Tax Rate" cell={TableCellTransactionFields} />
        <Column field="tax_amount" title="Tax Amount" cell={TableCellTransactionFields} />
        <Column field="total_price" title="Total Sales" cell={TableCellTransactionFields} />
      </Grid>
    </>
  );
}
