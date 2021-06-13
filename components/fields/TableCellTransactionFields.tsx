import { GridCellProps } from '@progress/kendo-react-grid';
import React from 'react';
import moment from 'moment';

export default function TableCellTransactionFields (props: GridCellProps) {
  const dataItem = props.dataItem;
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
  switch (props.field) {
    case 'detail_total':
      return <td style={{ textAlign: 'right' }}>{formatter.format(dataItem.detail_total)}</td>
    case 'tax_amount':
      return <td style={{ textAlign: 'right' }}>{formatter.format(dataItem.tax_amount)}</td>
    case 'total_price':
      return <td style={{ textAlign: 'right', fontSize: 'larger', fontWeight: 'bolder' }}>{formatter.format(dataItem.total_price)}</td>
    case 'tax_rate':
      return <td style={{ textAlign: 'center' }}>{dataItem.tax_rate}</td>
    case 'total_items':
      return <td style={{ textAlign: 'center' }}>{dataItem.total_items}</td>
    case 'transaction_date':
      const dt = moment.utc(dataItem.transaction_date);
      return <td>{dt.local().format('MM/DD/yyyy h:mmA')}</td>
    case 'price_current':
      return <td style={{ textAlign: 'right' }}>{formatter.format(dataItem.price_current)}</td>
    case 'price_sell':
      return <td style={{ textAlign: 'right', fontSize: 'large', fontWeight: 'bold' }}>{formatter.format(dataItem.price_sell)}</td>
    default:
      return <td />
  }
}
