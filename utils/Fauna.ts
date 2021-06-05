import * as faunadb from 'faunadb';
import { Product, Supplier } from './models';
import moment from 'moment';

const faunaClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

const productLambda = () => q.Lambda('productRef', q.Let({
  productDoc: q.Get(q.Var('productRef')),
  supplierDoc: q.Get(q.Select(['data', 'supplier'], q.Var('productDoc')))
}, {
  id: q.Select(['ref', 'id'], q.Var('productDoc')),
  product_id: q.Select(['data', 'product_id'], q.Var('productDoc')),
  display_name: q.Select(['data', 'display_name'], q.Var('productDoc')),
  description: q.If(q.ContainsPath(['data', 'description'], q.Var('productDoc')), q.Select(['data', 'description'], q.Var('productDoc')), ''),
  status: q.Select(['data', 'status'], q.Var('productDoc')),
  price_current: q.Select(['data', 'price_current'], q.Var('productDoc')),
  supplier_ref_id: q.Select(['ref', 'id'], q.Var('supplierDoc')),
  supplier_name: q.Select(['data', 'display_name'], q.Var('supplierDoc'))
}));

export async function getProducts() {
  let products: Product[];
  ({data: products} = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('products'))),
      // q.Lambda('ref', q.Get(q.Var('ref')))
      productLambda()
    )));

  return products;
}

export async function getProductById(id: string) {
  const data: any = await faunaClient.query(
    q.Let({
      productDoc: q.Get(q.Ref(q.Collection('products'), id)),
      supplierDoc: q.Get(q.Select(['data', 'supplier'], q.Var('productDoc')))
    }, {
      id: q.Select(['ref', 'id'], q.Var('productDoc')),
      product_id: q.Select(['data', 'product_id'], q.Var('productDoc')),
      display_name: q.Select(['data', 'display_name'], q.Var('productDoc')),
      description: q.If(q.ContainsPath(['data', 'description'], q.Var('productDoc')), q.Select(['data', 'description'], q.Var('productDoc')), ''),
      status: q.Select(['data', 'status'], q.Var('productDoc')),
      price_current: q.Select(['data', 'price_current'], q.Var('productDoc')),
      supplier_ref_id: q.Select(['ref', 'id'], q.Var('supplierDoc')),
      supplier_name: q.Select(['data', 'display_name'], q.Var('supplierDoc'))
    })
  );

  return data;
}

export async function getProductsBySupplierId(id: string) {
  let products: Product[];
  ({data: products} = await faunaClient.query(
    q.Map(q.Paginate(q.Match(q.Index('products_by_supplier'), q.Ref(q.Collection('suppliers'), id))),
      productLambda()
    )));

  return products;
}

export async function getProductsCount(status?: string) {
  if (status) {
    return await faunaClient.query(q.Count(q.Match(q.Index('products_by_status'), status)));
  } else {
    return await faunaClient.query(q.Count(q.Match(q.Index('all_products'))));
  }
}

export async function addProduct(product: Product) {
  if (product.product_id === 0) {
    const data: any = await faunaClient.query(
      q.Call(q.Function('getMaxProductId'))
    );
    const d = data.data.map((sid: any) => sid.product_id);
    product.product_id = d[0] + 1; // increment
  }
  return await faunaClient.query(
    q.Call(q.Function('addProduct'), product)
  );
}

export async function updateProduct(product: Product) {
  return await faunaClient.query(
    q.Call(q.Function('updateProduct'), product)
  );
}

export async function deleteProduct(id: string) {
  return await faunaClient.query(
    q.Call(q.Function('deleteProduct'), id)
  );
}

export async function getPricingLogByProductId(id: string) {
  const data: any = await faunaClient.query(
    q.Map(q.Paginate(q.Match(q.Index('pricing_log_by_product'), q.Ref(q.Collection('products'), id))),
      q.Lambda('pricingRef', q.Let({
        pricingDoc: q.Get(q.Var('pricingRef'))
      }, {
        product_ref_id: q.Select(['ref', 'id'], q.Var('pricingDoc')),
        price: q.Select(['data', 'price'], q.Var('pricingDoc')),
        log_date: q.ToString(q.Select(['data', 'log_date'], q.Var('pricingDoc')))
      }))
      )
  );

  const pricinglogs = data.data.map((log: any) => {
    const dt = moment(log.log_date);
    log.log_date = dt.format('MM/DD/yyyy h:mmA');
    return log;
  });

  return pricinglogs;
}

export async function getSuppliers() {
  let suppliers: Supplier[];
  ({data: suppliers} = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('suppliers'))),
      q.Lambda('supplierRef', q.Let(
        {supplierDoc: q.Get(q.Var('supplierRef'))},
        {
          id: q.Select(['ref', 'id'], q.Var('supplierDoc')),
          supplier_id: q.Select(['data', 'supplier_id'], q.Var('supplierDoc')),
          display_name: q.Select(['data', 'display_name'], q.Var('supplierDoc'))
        }
      ))
  )));

  return suppliers;
}

export async function getSupplierById(id: string) {
  const data: any = await faunaClient.query(
    q.Get(q.Ref(q.Collection('suppliers'), id))
  );
  const supplier: Supplier = {
    id: data.ref.id,
    supplier_id: data.data.supplier_id,
    display_name: data.data.display_name
  };
  return supplier;
}

export async function addSupplier(supplier: Supplier) {
  if (supplier.supplier_id === 0) {
    const data: any = await faunaClient.query(
      q.Call(q.Function('getMaxSupplierId'), '')
    );
    const d = data.data.map((sid: any) => sid.supplier_id);
    supplier.supplier_id = d[0] + 1; // increment
  }
  return await faunaClient.query(
    q.Create(q.Collection('suppliers'), {
      data: supplier
    })
  );
}

export async function updateSupplier(supplier: Supplier) {
  return await faunaClient.query(
    q.Update(q.Ref(q.Collection('suppliers'), supplier.id), {
      data: {
        supplier_id: supplier.supplier_id,
        display_name: supplier.display_name
      }
    })
  );
}

export async function deleteSupplier(id: string) {
  return await faunaClient.query(
    q.Delete(q.Ref(q.Collection('suppliers'), id))
  );
}
