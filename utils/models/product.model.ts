export interface Product {
  id?: string;
  product_id: number;
  display_name: string;
  description?: string;
  status: string; // "in_studio", "in_stock", "in_display", "sold", "return"
  price_min?: number; // TODO: calculate price minimum from pricing_log
  price_max?: number; // TODO: calculate price maximum from pricing_log
  price_current: number;
  price_sell?: number;
  last_price_change?: string;
  supplier_ref_id?: string;
  supplier_name?: string;
}

export interface PricingLog {
  product_log_ref_id: string; // Ref(Collection("products"), "300132873901441545")
  price: number;
  log_date: string;
}

export interface StatusLog {
  status_log_ref_id: string; // Ref(Collection("products"), "300132873901441545")
  status: string;
  log_date: string;
}
