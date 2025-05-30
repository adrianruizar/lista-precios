import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Edit, Plus, LogOut } from 'lucide-react';
import productsData from '../data/products.json';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  color: string;
  price: number;
  image: string;
}

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    setShowDeleteConfirm(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (product: Product) => {
    const updatedProducts = products.map(p => 
      p.id === product.id ? product : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: '',
      brand: '',
      category: '',
      color: '',
      price: 0,
      image: ''
    };
    setEditingProduct(newProduct);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-900">Panel Administrativo</h1>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Nuevo
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-600">{product.brand}</p>
                <p className="text-xs text-gray-600">{product.category}</p>
                <p className="text-xs text-gray-600">Color: {product.color}</p>
                <div className="mt-1 bg-black rounded py-1 px-2">
                  <p className="text-sm font-bold text-white text-right">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
                  >
                    <Edit className="h-3 w-3" />
                    Editar
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(product.id)}
                    className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100"
                  >
                    <Trash2 className="h-3 w-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              {editingProduct.id ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                <input
                  type="text"
                  value={editingProduct.brand}
                  onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                  className="mt-1 block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                <input
                  type="text"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  className="mt-1 block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  value={editingProduct.color}
                  onChange={(e) => setEditingProduct({ ...editingProduct, color: e.target.value })}
                  className="mt-1 block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="mt-1 block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL de la imagen</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="mt-1 block w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSave(editingProduct)}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-3">Confirmar eliminación</h2>
            <p className="text-sm mb-4">¿Está seguro que desea eliminar este producto?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}