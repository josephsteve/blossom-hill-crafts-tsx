import * as faunadb from 'faunadb';
import { Product } from './models';
import moment from 'moment';

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

export async function getProducts() {
  let products: Product[];
  ({data: products} = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('products'))),
      // q.Lambda('ref', q.Get(q.Var('ref')))
      q.Lambda('productRef', q.Let(
        {productDoc: q.Get(q.Var('productRef'))},
        {
          id: q.Select(['ref', 'id'], q.Var('productDoc')),
          product_id: q.Select(['data', 'product_id'], q.Var('productDoc')),
          display_name: q.Select(['data', 'display_name'], q.Var('productDoc')),
          status: q.Select(['data', 'status'], q.Var('productDoc')),
          price_min: q.Select(['data', 'price_min'], q.Var('productDoc')),
          price_max: q.Select(['data', 'price_max'], q.Var('productDoc')),
          price_current: q.Select(['data', 'price_current'], q.Var('productDoc')),
          price_sell: q.Select(['data', 'price_sell'], q.Var('productDoc')),
          last_price_change: q.ToString(q.Select(['data', 'last_price_change'], q.Var('productDoc'))),
        }
      ))
    )));

  const prods = products.map(prod => {
    const dt = moment(prod.last_price_change);
    prod.last_price_change = dt.format('MM/DD/yyyy H:mA');
    return prod;
  });

  return prods;
}
