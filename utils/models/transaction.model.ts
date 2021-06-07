export interface Terminal {
  id?: string;
  terminal_name: string;
  is_store?: boolean;  // this is for stores only
  is_online?: boolean; // this is for e-commerce (online orders)
}

export interface Cart {
  id?: string;
  cart_date: string;
  terminal_ref_id?: string;
  terminal_name?: string;
  detail_total: number;
  tax_rate: number;
  tax_amount: number;
  total_price: number;
}

export interface CartDetail {
  id?: string;
  cart_ref_id?: string;
  terminal_ref_id?: string;
  product_ref_id: string;
  product_display_name: string;
  product_description: string;
  price_current: number;
  price_sell: number;
  supplier_ref_id?: string;
}

export interface Transaction {
  id?: string;
  transaction_date?: string; // fauna date
  trans_date: string; // short date (i.e. 2021-06-06)
  cart_ref_id?: string;
  terminal_ref_id?: string;
  terminal_name?: string;
  total_items: number;
  detail_total: number;
  tax_rate: string;
  tax_amount: number;
  total_price: number;
}

export interface TransactionDetail {
  id?: string;
  transaction_ref_id?: string;
  cart_ref_id?: string;
  terminal_ref_id?: string;
  product_ref_id: string;
  product_id: number;
  product_display_name: string;
  product_description: string;
  price_current: number;
  price_sell: number;
  supplier_ref_id?: string;
  supplier_name?: string;
}
