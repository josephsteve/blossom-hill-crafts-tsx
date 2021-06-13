import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid } from '@progress/kendo-react-grid';
import React from 'react';
import TableCellTransactionFields from '@/components/fields/TableCellTransactionFields';

export default function TransactionDetailTable ({transaction_details}: {transaction_details: any}) {
  return (
    <div style={{ marginTop: 40 }}>
      <h3>Details</h3>
      <Grid data={transaction_details}>
        <Column field="product_id" title="ID" width={90} />
        <Column field="display_name" title="Product Name" />
        <Column field="description" title="Description" />
        <Column field="supplier_name" title="Supplier Name" />
        <Column field="price_sell" title="Price" width={137} cell={TableCellTransactionFields} />
      </Grid>
    </div>
  );
}
