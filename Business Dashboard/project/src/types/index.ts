export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  date: string;
  paymentMethod: string;
}

export interface SalesData {
  date: string;
  amount: number;
}

export interface DashboardStat {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}