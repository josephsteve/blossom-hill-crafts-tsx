import * as faunadb from 'faunadb';
import { Product, Supplier } from './models';
import moment from 'moment';
import { Transaction, TransactionDetail } from '@/utils/models/transaction.model';

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

export async function getProductByProductId(product_id: number) {
  let products: Product[];
  ({data: products} = await faunaClient.query(
    q.Map(q.Paginate(q.Match(q.Index('products_by_product_id'), product_id)),
      productLambda()
    )));

  return products;
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
        product_log_ref_id: q.Select(['ref', 'id'], q.Var('pricingDoc')),
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

export async function getStatusLogByProductId(id: string) {
  const data: any = await faunaClient.query(
    q.Map(q.Paginate(q.Match(q.Index('status_log_by_product'), q.Ref(q.Collection('products'), id))),
      q.Lambda('statusRef', q.Let({
        statusDoc: q.Get(q.Var('statusRef'))
      }, {
        status_log_ref_id: q.Select(['ref', 'id'], q.Var('statusDoc')),
        status: q.Select(['data', 'status'], q.Var('statusDoc')),
        log_date: q.ToString(q.Select(['data', 'log_date'], q.Var('statusDoc')))
      }))
    )
  );

  const statuslogs = data.data.map((log: any) => {
    const dt = moment(log.log_date);
    log.log_date = dt.format('MM/DD/yyyy h:mmA');
    return log;
  });

  return statuslogs;
}

export async function getSuppliers() {
  let suppliers: Supplier[];
  ({data: suppliers} = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('suppliers'))),
      q.Lambda('supplierRef', q.Let({
          supplierDoc: q.Get(q.Var('supplierRef')),
          productsCount: q.Call(q.Function('getProductsCountBySupplier'), q.Select(['ref', 'id'], q.Var('supplierDoc')))
        },
        {
          id: q.Select(['ref', 'id'], q.Var('supplierDoc')),
          supplier_id: q.Select(['data', 'supplier_id'], q.Var('supplierDoc')),
          display_name: q.Select(['data', 'display_name'], q.Var('supplierDoc')),
          products_count: q.Select(['count'], q.Var('productsCount'))
        }
      ))
  )));

  return suppliers;
}

export async function getSupplierById(id: string) {
  const data: any = await faunaClient.query(
    q.Let({
      supplierDoc: q.Get(q.Ref(q.Collection('suppliers'), id)),
      productsCount: q.Call(q.Function('getProductsCountBySupplier'), id)
      }, {
        id: q.Select(['ref', 'id'], q.Var('supplierDoc')),
        supplier_id: q.Select(['data', 'supplier_id'], q.Var('supplierDoc')),
        display_name: q.Select(['data', 'display_name'], q.Var('supplierDoc')),
        products_count: q.Select(['count'], q.Var('productsCount'))
    })
  );
  return data;
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

export async function cartPayNow(cart_total: Transaction, cart_details: TransactionDetail[]) {
  return await faunaClient.query(
    q.Call(q.Function('submitOrder'), [cart_total, cart_details])
  );
}

export async function getTransactions() {
  let transactions: Transaction[];
  ({data: transactions} = await faunaClient.query(
    q.Map(q.Map(q.Paginate(q.Match(q.Index('transactions_by_date'))), q.Lambda(['transaction_date', 'ref'], q.Get(q.Var('ref')))),
      q.Lambda('docRef', q.Let({ transDoc: q.Var('docRef') }, {
        id: q.Select(['ref', 'id'], q.Var('transDoc')),
        trans_date: q.Select(['data', 'trans_date'], q.Var('transDoc')),
        total_items: q.Select(['data', 'total_items'], q.Var('transDoc')),
        detail_total: q.Select(['data', 'detail_total'], q.Var('transDoc')),
        tax_rate: q.Select(['data', 'tax_rate'], q.Var('transDoc')),
        tax_amount: q.Select(['data', 'tax_amount'], q.Var('transDoc')),
        total_price: q.Select(['data', 'total_price'], q.Var('transDoc')),
        transaction_date: q.ToString(q.Select(['data', 'transaction_date'], q.Var('transDoc')))
      })))
  ));
  const transdata = transactions.map((t: any) => {
    const dt = moment.utc(t.transaction_date);
    t.transaction_date = dt.local().format('MM/DD/yyyy h:mmA');
    return t;
  });
  return transdata;
}

export async function getTransactionById(id: string) {
  const data: any = await faunaClient.query(
    q.Let({
      transDoc: q.Get(q.Ref(q.Collection('transactions'), id))
    }, {
      id: q.Select(['ref', 'id'], q.Var('transDoc')),
      transaction_date: q.ToString(q.Select(['data', 'transaction_date'], q.Var('transDoc'))),
      total_items: q.Select(['data', 'total_items'], q.Var('transDoc')),
      detail_total: q.Select(['data', 'detail_total'], q.Var('transDoc')),
      tax_rate: q.Select(['data', 'tax_rate'], q.Var('transDoc')),
      tax_amount: q.Select(['data', 'tax_amount'], q.Var('transDoc')),
      total_price: q.Select(['data', 'total_price'], q.Var('transDoc'))
    })
  );
  return data;
}

export async function getTransactionDetailsByTransId(id: string) {
  const data = await faunaClient.query(
    q.Map(q.Paginate(q.Match(q.Index('transaction_details_by_transaction'), q.Ref(q.Collection('transactions'), id))),
      q.Lambda('detailRef', q.Let({
        detailDoc: q.Get(q.Var('detailRef'))
      }, {
        product_id: q.Select(['data', 'product_id'], q.Var('detailDoc')),
        display_name: q.Select(['data', 'product_display_name'], q.Var('detailDoc')),
        description: q.Select(['data', 'product_description'], q.Var('detailDoc')),
        price_sell: q.Select(['data', 'price_sell'], q.Var('detailDoc')),
        supplier_name: q.Select(['data', 'supplier_name'], q.Var('detailDoc'))
      }))
    )
  );
  return data;
}
