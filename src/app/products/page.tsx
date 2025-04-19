'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useProductsStore } from '@/store/products';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function ProductsPage() {
  const {
    visibleProducts,
    allProducts,
    isLoading,
    fetchProducts,
    loadMoreProducts
  } = useProductsStore();

  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация товаров
  const filteredProducts = visibleProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'favorites' ? product.liked : true;
    return matchesSearch && matchesFilter;
  });

  // Загружаем товары при монтировании
  useEffect(() => {
    if (allProducts.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, allProducts]);

  // Подключаем бесконечный скролл
  useInfiniteScroll(() => {
    if (filter === 'all' && !searchQuery) {
      loadMoreProducts();
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Поиск */}
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Фильтр */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'favorites')}
            className="p-2 border rounded"
          >
            <option value="all">All Products</option>
            <option value="favorites">Favorites</option>
          </select>

          {/* Кнопка создания */}
          <Link
            href="/create-product"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Create Product
          </Link>
        </div>
      </div>

      {/* Список товаров */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500 py-8">
            {isLoading ? 'Loading...' : 'No products found'}
          </p>
        )}
      </div>

      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}