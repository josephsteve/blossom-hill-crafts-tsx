import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Supplier } from '@/utils/models';
import { useRouter } from 'next/router';

const EditCommandCell = (props: any) => {
  return (
    <td>
      <Button colorScheme="blue" onClick={() => props.enterEdit(props.dataItem)}>Edit</Button>
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
    <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
      <Grid data={suppliers}>
        <Column field="supplier_id" title="ID" width={80} />
        <Column field="display_name" title="Supplier Name" />
        <Column cell={MyEditCommandCell} />
      </Grid>
      <Flex direction="row" mt={4}>
        <Link href="/supplier/new"><Button colorScheme="blue">Add New Supplier</Button></Link>
      </Flex>
    </Box>
  );
}
