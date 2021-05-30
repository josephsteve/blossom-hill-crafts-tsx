import React from 'react';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Button } from '@progress/kendo-react-buttons';
import { Product } from '@/utils/models';
import Link from 'next/link';
import { useRouter } from 'next/router';

const cellStatus = (props: GridCellProps) => {
  const status = props.dataItem.status;
  if (status === 'in_display') {
    return <td style={{backgroundColor: "rgb(55, 180, 0, 0.32)"}}>
      {status}
    </td>;
  } else {
    return <td style={{backgroundColor: "rgb(243, 23, 0, 0.32)"}}>
      {status}
    </td>;
  }
}

const cellPriceCurrent = (props: GridCellProps) => {
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  const price = props.dataItem.price_current;
  return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
}

const EditCommandCell = (props: any) => {
  return (
    <td>
      <Button look={'flat'} onClick={() => props.enterEdit(props.dataItem)}>Edit</Button>
    </td>
  );
}

export default function ProductDataTable ({products}: {products: Product[]}) {
  const router = useRouter();

  const enterEdit = (item: Product) => {
    console.log(item);
  }
  const MyEditCommandCell = (props: GridCellProps) => (
    <EditCommandCell {...props} enterEdit={enterEdit} />
  );

  return (
    <>
      <Grid data={products}>
        <Column field="product_id" title="ID" width={90} />
        <Column field="display_name" title="Product Name" />
        <Column field="description" title="Description" />
        <Column field="supplier_name" title="Supplier Name" />
        <Column field="status" title="Status" cell={cellStatus} width={110} />
        {/*<Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
        <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
        <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />*/}
        <Column field="price_current" format="{0: $#,##.00}" title="Price Cur" width={120} cell={cellPriceCurrent} />
        {/*<Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>*/}
        <Column cell={MyEditCommandCell} width={100} />
      </Grid>
      <Link href="/product/new"><Button primary={true} style={{ marginTop: 15 }}>Add New Product</Button></Link>
    </>
  );
}
