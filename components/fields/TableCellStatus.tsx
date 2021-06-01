import { GridCellProps } from '@progress/kendo-react-grid';
import React from 'react';

export default function TableCellStatus (props: GridCellProps) {
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
