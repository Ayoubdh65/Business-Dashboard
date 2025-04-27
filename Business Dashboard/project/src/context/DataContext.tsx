import React, { createContext, useContext, useState, ReactNode } from 'react';
import { users, products, orders, salesData } from '../data/mockData';
import { User, Product, Order, SalesData } from '../types';

interface DataContextType {
  users: User[];
  products: Product[];
  orders: Order[];
  salesData: SalesData[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User[]>(users);
  const [productData, setProductData] = useState<Product[]>(products);
  const [orderData, setOrderData] = useState<Order[]>(orders);
  const [salesDataState] = useState<SalesData[]>(salesData);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: `${userData.length + 1}`,
    };
    setUserData([...userData, newUser]);
  };

  const updateUser = (user: User) => {
    setUserData(userData.map((u) => (u.id === user.id ? user : u)));
  };

  const deleteUser = (id: string) => {
    setUserData(userData.filter((user) => user.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: `${productData.length + 1}`,
    };
    setProductData([...productData, newProduct]);
  };

  const updateProduct = (product: Product) => {
    setProductData(productData.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = (id: string) => {
    setProductData(productData.filter((product) => product.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrderData(
      orderData.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const value = {
    users: userData,
    products: productData,
    orders: orderData,
    salesData: salesDataState,
    addUser,
    updateUser,
    deleteUser,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};