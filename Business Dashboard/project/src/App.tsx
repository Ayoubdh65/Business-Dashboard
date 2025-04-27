import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import { AppProvider } from './context/AppContext';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <AppProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AppProvider>
  );
}

export default App;