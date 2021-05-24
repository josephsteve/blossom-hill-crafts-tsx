import React from 'react';
import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Product } from '@/utils/models';

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

export default function ProductDataTable ({products}: {products: Product[]}) {
  return (
    <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" mt={4}>
      <Grid data={products}>
        <Column field="product_id" title="ID" width={80} />
        <Column field="display_name" title="Product Name" />
        <Column field="supplier_name" title="Supplier Name" />
        <Column field="status" title="Status" cell={cellStatus} />
        <Column field="price_min" format="{0: $#,##.00}" title="Price Min" />
        <Column field="price_max" format="{0: $#,##.00}" title="Price Max" />
        <Column field="price_sell" format="{0: $#,##.00}" title="Price Sell" />
        <Column field="last_price_change" format="{0:MM/dd/yyyy}" title="Last Price Change"/>
      </Grid>
      <Flex direction="row" mt={4}>
        <Button colorScheme="blue">Add New Product</Button>
      </Flex>
    </Box>
  );
}
