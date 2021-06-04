import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import React from 'react';
import TableCellStatus from '@/components/fields/TableCellStatus';
import { Button } from '@progress/kendo-react-buttons';
import { Product } from '@/utils/models';
import { useRouter } from 'next/router';
import { useAppContext } from '../pages/AppWrapper';

const EditCommandCell = (props: any) => {
  return (
    <td>
      <Button look={'flat'} onClick={() => props.enterEdit(props.dataItem)}>Edit</Button>
    </td>
  );
}

export default function SupplierProductsTable ({products, supplier_ref_id}: {products: any, supplier_ref_id: string}) {
  const router = useRouter();
  const appContext = useAppContext();

  const enterEdit = (item: Product) => {
    appContext.back_url = `/supplier/edit/${supplier_ref_id}`;
    router.push(`/product/edit/${item.id}`);
  }

  const MyEditCommandCell = (props: GridCellProps) => (
    <EditCommandCell {...props} enterEdit={enterEdit} />
  );

  const cellPriceCurrent = (props: GridCellProps) => {
    const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    const price = props.dataItem.price_current;
    return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
  }

  return (
    <>
      <Grid data={products} style={{ marginInline: 40, marginTop: 40 }}>
        <Column field="product_id" title="ID" width={90} />
        <Column field="display_name" title="Product Name" />
        <Column field="description" title="Description" />
        <Column field="supplier_name" title="Supplier Name" />
        <Column field="status" title="Status" cell={TableCellStatus} width={110} />
        {/*<Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
        <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
        <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />*/}
        <Column field="price_current" format="{0: $#,##.00}" title="Price Cur" width={120} cell={cellPriceCurrent} />
        {/*<Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>*/}
        <Column cell={MyEditCommandCell} />
      </Grid>
    </>
  );
}
