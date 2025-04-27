import { User, Product, Order, SalesData } from '../types';
import { subDays, format } from 'date-fns';

// Generate dates for the past 30 days
const generateDates = (days: number): string[] => {
  return Array.from({ length: days }).map((_, i) => {
    return format(subDays(new Date(), i), 'MMM dd');
  }).reverse();
};

// Generate random sales data
export const generateSalesData = (): SalesData[] => {
  const dates = generateDates(30);
  return dates.map(date => ({
    date,
    amount: Math.floor(Math.random() * 10000) + 1000
  }));
};

export const salesData = generateSalesData();

export const users: User[] = [
  {
    id: '1',
    name: 'Youssef Ben Ali',
    email: 'youssef@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2023-06-10T10:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Leila Trabelsi',
    email: 'leila@example.com',
    role: 'Manager',
    status: 'active',
    lastActive: '2023-06-09T14:20:00',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '3',
    name: 'Karim Gharbi',
    email: 'karim@example.com',
    role: 'Customer',
    status: 'inactive',
    lastActive: '2023-05-28T09:15:00',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    name: 'Amira Mansour',
    email: 'amira@example.com',
    role: 'Customer',
    status: 'active',
    lastActive: '2023-06-10T08:45:00',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '5',
    name: 'Mehdi Bouazizi',
    email: 'mehdi@example.com',
    role: 'Staff',
    status: 'active',
    lastActive: '2023-06-09T16:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: '6',
    name: 'Sarra Chebbi',
    email: 'sarra@example.com',
    role: 'Customer',
    status: 'inactive',
    lastActive: '2023-06-01T11:20:00',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    stock: 45,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-01T10:00:00'
  },
  {
    id: '2',
    name: 'Ultra HD Smart TV',
    description: '55-inch 4K Ultra HD Smart TV with HDR',
    price: 699.99,
    stock: 12,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/6782266/pexels-photo-6782266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-05T11:30:00'
  },
  {
    id: '3',
    name: 'Designer Watch',
    description: 'Luxury designer watch with leather strap',
    price: 349.99,
    stock: 28,
    category: 'Fashion',
    image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-10T09:45:00'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic office chair with lumbar support',
    price: 249.99,
    stock: 18,
    category: 'Furniture',
    image: 'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-15T14:20:00'
  },
  {
    id: '5',
    name: 'Professional Camera',
    description: 'High-resolution DSLR camera with multiple lenses',
    price: 1299.99,
    stock: 7,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-20T08:30:00'
  },
  {
    id: '6',
    name: 'Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring',
    price: 129.99,
    stock: 32,
    category: 'Health',
    image: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2023-05-25T16:15:00'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      id: '4',
      name: 'Amira Mansour',
      email: 'amira@example.com'
    },
    products: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 199.99,
        quantity: 1
      }
    ],
    status: 'completed',
    totalAmount: 199.99,
    date: '2023-06-08T09:30:00',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-002',
    customer: {
      id: '2',
      name: 'Leila Trabelsi',
      email: 'leila@example.com'
    },
    products: [
      {
        id: '3',
        name: 'Designer Watch',
        price: 349.99,
        quantity: 1
      },
      {
        id: '6',
        name: 'Fitness Tracker',
        price: 129.99,
        quantity: 1
      }
    ],
    status: 'processing',
    totalAmount: 479.98,
    date: '2023-06-09T11:45:00',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    customer: {
      id: '6',
      name: 'Sarra Chebbi',
      email: 'sarra@example.com'
    },
    products: [
      {
        id: '4',
        name: 'Ergonomic Office Chair',
        price: 249.99,
        quantity: 1
      }
    ],
    status: 'pending',
    totalAmount: 249.99,
    date: '2023-06-10T10:15:00',
    paymentMethod: 'Debit Card'
  },
  {
    id: 'ORD-004',
    customer: {
      id: '3',
      name: 'Karim Gharbi',
      email: 'karim@example.com'
    },
    products: [
      {
        id: '2',
        name: 'Ultra HD Smart TV',
        price: 699.99,
        quantity: 1
      }
    ],
    status: 'completed',
    totalAmount: 699.99,
    date: '2023-06-07T14:20:00',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-005',
    customer: {
      id: '5',
      name: 'Mehdi Bouazizi',
      email: 'mehdi@example.com'
    },
    products: [
      {
        id: '5',
        name: 'Professional Camera',
        price: 1299.99,
        quantity: 1
      }
    ],
    status: 'cancelled',
    totalAmount: 1299.99,
    date: '2023-06-05T09:10:00',
    paymentMethod: 'Bank Transfer'
  },
  {
    id: 'ORD-006',
    customer: {
      id: '4',
      name: 'Amira Mansour',
      email: 'amira@example.com'
    },
    products: [
      {
        id: '6',
        name: 'Fitness Tracker',
        price: 129.99,
        quantity: 2
      }
    ],
    status: 'completed',
    totalAmount: 259.98,
    date: '2023-06-06T16:30:00',
    paymentMethod: 'Credit Card'
  }
];