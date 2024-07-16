export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  ref: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  order: OrderItem[];
}
