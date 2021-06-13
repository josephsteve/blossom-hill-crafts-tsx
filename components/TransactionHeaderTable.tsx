import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid } from '@progress/kendo-react-grid';
import React from 'react';
import TableCellTransactionFields from '@/components/fields/TableCellTransactionFields';

export default function TransactionHeaderTable({transaction}: {transaction: any}) {
  return (
    <>
      <Grid data={[transaction]}>
        <Column field="id" title="Id" width={205} />
        <Column field="transaction_date" title="Date" width={220} cell={TableCellTransactionFields} />
        <Column field="total_items" title="Total Items" cell={TableCellTransactionFields} />
        <Column field="detail_total" title="Sub Total" cell={TableCellTransactionFields}/>
        <Column field="tax_rate" title="Tax Rate" cell={TableCellTransactionFields}/>
        <Column field="tax_amount" title="Tax Amount" cell={TableCellTransactionFields} />
        <Column field="total_price" title="Total" cell={TableCellTransactionFields} />
      </Grid>
    </>
  );
}
