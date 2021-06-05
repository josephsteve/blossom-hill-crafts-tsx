import { Grid, GridCellProps } from '@progress/kendo-react-grid';
import { PricingLog } from '@/utils/models';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import React from 'react';

export default function ProductPricingLog ({pricinglog}: {pricinglog: PricingLog[]}) {

  const cellPrice = (props: GridCellProps) => {
    const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
    const price = props.dataItem.price;
    return <td style={{ textAlign: 'right' }}>{formatter.format(price)}</td>
  }

  return (
    <div>
      <Grid data={pricinglog} style={{ marginInlineStart: 10 }}>
        <Column field="log_date" title="Log Date" />
        <Column field="price" title="Price" cell={cellPrice} />
      </Grid>
    </div>
  );
}
