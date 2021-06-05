import { Grid } from '@progress/kendo-react-grid';
import { StatusLog } from '@/utils/models';
import { GridColumn as Column } from '@progress/kendo-react-grid/dist/npm/GridColumn';
import React from 'react';

export default function StatusPricingLog ({statuslog}: {statuslog: StatusLog[]}) {

  return (
    <div>
      <Grid data={statuslog} style={{ marginInlineEnd: 10 }}>
        <Column field="log_date" title="Log Date" />
        <Column field="status" title="Status" />
      </Grid>
    </div>
  );
}
