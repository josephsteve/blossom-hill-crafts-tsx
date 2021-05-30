import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import Link from 'next/link';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Supplier } from '@/utils/models';
import { useRouter } from 'next/router';

const EditCommandCell = (props: any) => {
  return (
    <td>
      <Button look={'flat'} onClick={() => props.enterEdit(props.dataItem)}>Edit</Button>
    </td>
  );
}

export default function SupplierDataTable ({suppliers}: {suppliers: Supplier[]}) {
  const router = useRouter();

  const enterEdit = (item: Supplier) => {
    router.push(`/supplier/edit/${item.id}`);
  };
  const MyEditCommandCell = (props: GridCellProps) => (
    <EditCommandCell {...props} enterEdit={enterEdit} />
  );

  return (
    <>
      <Grid data={suppliers}>
        <Column field="supplier_id" title="ID" width={80} />
        <Column field="display_name" title="Supplier Name" />
        <Column cell={MyEditCommandCell} />
      </Grid>
      <Link href="/supplier/new"><Button primary={true} style={{ marginTop: 15 }}>Add New Supplier</Button></Link>
    </>
  );
}
