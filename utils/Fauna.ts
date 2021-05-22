import * as faunadb from 'faunadb';
import { Product } from './models';

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

export async function getProducts() {
  const faunaresp: { data: { ref: any, ts: number, data: Product[] }[] } =
    await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('products'))),
        q.Lambda('ref', q.Get(q.Var('ref')))
      ));

  const products: Product[] = faunaresp.data.map((product: any) => {
    product.data.id = product.ref.id;
    delete product.ref;
    // delete product.data.supplier;
    return product.data;
  });

  return products;
}
