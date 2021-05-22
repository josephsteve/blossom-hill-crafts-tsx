export interface Product {
  id: string;
  product_id: number;
  display_name: string;
  status: string; // "in_studio", "in_stock", "in_display", "sold", "return"
  price_min: number;
  price_max: number;
  price_sell: number;
  last_price_change: timestamp;
}

interface timestamp {
  "@ts": string;
}
