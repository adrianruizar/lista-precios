import React from 'react';
import { ShoppingBag } from 'lucide-react';
import productsData from '../data/products.json';

export default function ProductList() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Lista de Precios</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-red-600">ROSADIOR JR</span>
              <ShoppingBag className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <span className="text-gray-600">Artículo: </span>
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm text-gray-600">Color: {product.color}</p>
                <div className="mt-2 bg-black rounded-lg py-2 px-3">
                  <p className="text-xl font-bold text-white text-right">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}