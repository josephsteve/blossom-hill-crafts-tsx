import { DashboardData } from '@/utils/models/dashboard.model';
import { Card, CardActions, CardBody, CardTitle, TileLayout } from '@progress/kendo-react-layout';
import { useState } from 'react';

export default function Dashboard ({data}: {data: DashboardData}) {
  /*const [positions, setPositions] = useState([
    {
      col: 1,
      colSpan: 1,
      rowSpan: 1
    },
    {
      col: 2,
      colSpan: 1,
      rowSpan: 1
    },
    {
      col: 3,
      colSpan: 1,
      rowSpan: 1
    }
  ]);

  const tiles = [
    {
      header: "Products",
      body: <div style={{ textAlign: 'right' }}>
        <h3 style={{
          marginBottom: "-1px",
          marginTop: "-10px"
        }}>2399</h3>
        <p>Total Products</p>
      </div>
    },
    {
      header: "Store",
      body: <>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{
            marginBottom: "-1px",
            marginTop: "-10px"
          }}>2399</h3>
          <p>Products In Display</p>
        </div>
        <div style={{ textAlign: 'right', marginTop: '40px' }}>
          <h3 style={{
            marginBottom: "-1px",
            marginTop: "-10px"
          }}>2399</h3>
          <p>Products On Stock</p>
        </div>
      </>
    },
    {
      header: "Sales",
      body: <div style={{ textAlign: 'right' }}>
        <h3 style={{
          marginBottom: "-1px",
          marginTop: "-10px"
        }}>0</h3>
        <p>Producs Sold</p>
      </div>
    }
  ];

  const handleReposition = (e: any) => {
    setPositions(e.value);
    console.log(e.value);
  };*/

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}>
        <Card style={{width: '20%', boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)"}} type={'primary'}>
          <CardBody>
            <CardTitle>Products</CardTitle>
            <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%'}}>
              <div>
                <h2>{data.products_all_count}</h2>Total
              </div>
              <div>
                <h2>{data.products_in_studio_count}</h2>In Studio
              </div>
            </div>
          </CardBody>
        </Card>
        <Card style={{width: '20%', boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)"}} type={'primary'}>
          <CardBody>
            <CardTitle>Store</CardTitle>
            <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%'}}>
              <div>
                <h2>{data.products_in_display_count}</h2>In Display
              </div>
              <div>
                <h2>{data.products_in_stock_count}</h2>On Stock
              </div>
            </div>
          </CardBody>
        </Card>
        <Card style={{width: '20%', boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)"}} type={'primary'}>
          <CardBody>
            <CardTitle>Sales</CardTitle>
            <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%'}}>
              <div>
                <h2>{data.products_sold_count}</h2>Sold
              </div>
              <div>
                <h2>{data.products_return_count}</h2>Return
              </div>
            </div>
          </CardBody>
        </Card>
        <Card style={{width: '28%', boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)"}} type={'primary'}>
          <CardBody>
            <CardTitle>Sales</CardTitle>
            <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%'}}>
              <div>
                <h2>$0.00</h2>Today
              </div>
              <div>
                <h2>$0.00</h2>Total
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      {/*<TileLayout columns={3} rowHeight={300} positions={positions} gap={{rows: 10, columns: 10}} items={tiles}  onReposition={handleReposition} />*/}

    </>
  );
}
