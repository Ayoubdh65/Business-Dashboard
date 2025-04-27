import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import DataTable from '../components/common/DataTable';
import { Edit, Trash, PackagePlus, Search, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Product } from '../types';

const Products: React.FC = () => {
  const { products, deleteProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Product',
      accessor: (product: Product) => (
        <div className="flex items-center">
          <div className="h-12 w-12 flex-shrink-0 rounded overflow-hidden">
            <img
              className="h-12 w-12 object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Price',
      accessor: (product: Product) => formatCurrency(product.price),
      className: 'text-right',
    },
    {
      header: 'Stock',
      accessor: (product: Product) => (
        <div className="flex items-center">
          <span
            className={`w-2 h-2 rounded-full mr-2 ${
              product.stock > 20
                ? 'bg-success-500'
                : product.stock > 0
                ? 'bg-warning-500'
                : 'bg-error-500'
            }`}
          ></span>
          <span>{product.stock} units</span>
        </div>
      ),
    },
    {
      header: 'Added',
      accessor: (product: Product) => formatDate(product.createdAt),
    },
    {
      header: 'Actions',
      accessor: (product: Product) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              // Edit product logic would go here
              console.log('Edit product:', product);
            }}
            className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setShowDeleteConfirm(true);
            }}
            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setShowDeleteConfirm(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <p className="text-gray-500">Manage your product catalog</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
            <PackagePlus size={18} className="mr-2" />
            Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="flex space-x-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Furniture">Furniture</option>
                <option value="Health">Health</option>
              </select>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter size={18} className="mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredProducts}
          keyExtractor={(product) => product.id}
          onRowClick={(product) => {
            setSelectedProduct(product);
            // View product details logic would go here
            console.log('View product details:', product);
          }}
          emptyMessage="No products found matching your search criteria."
        />
      </div>

      {showDeleteConfirm && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete the product <span className="font-medium">{selectedProduct.name}</span>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;