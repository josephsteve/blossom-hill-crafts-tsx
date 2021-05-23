import React from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Grid } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import '@progress/kendo-theme-bootstrap/dist/all.css';
import { Supplier } from '@/utils/models';

export default function SupplierDataTable ({suppliers}: {suppliers: Supplier[]}) {
  return (
    <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
      <Grid data={suppliers}>
        <Column field="supplier_id" title="ID" width={80} />
        <Column field="display_name" title="Supplier Name" />
      </Grid>
      <Flex direction="row" mt={4}>
        <Button colorScheme="blue">Add New Supplier</Button>
      </Flex>
    </Box>
  );
}
