import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import productsData from './data/products.json';

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  color: string;
  price: number;
  image: string;
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const brands = useMemo(() => 
    Array.from(new Set(productsData.products.map(product => product.brand))),
    []
  );

  const categories = useMemo(() => 
    Array.from(new Set(productsData.products.map(product => product.category))),
    []
  );

  const filteredProducts = useMemo(() => {
    return productsData.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesBrand && matchesCategory;
    });
  }, [searchTerm, selectedBrand, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Lista de Precios</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-red-600">ROSADIOR JR</span>
              <ShoppingBag className="h-8 w-8 text-pink-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Todas las marcas</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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

export default App;