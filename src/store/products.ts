import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  liked?:boolean; 
}

interface ProductsState {
  allProducts: Product[];
  visibleProducts: Product[];
  isLoading: boolean;
  // CRUD-методы
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
  toggleLike: (id: number) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  // Пагинация
  fetchProducts: () => Promise<void>;
  loadMoreProducts: () => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      allProducts: [],
      visibleProducts: [],
      isLoading: false,

      // Добавление товара
      addProduct: (product) => {
        const newProduct = { ...product, id: Date.now() }; // Генерация ID
        set({
          allProducts: [newProduct, ...get().allProducts],
          visibleProducts: [newProduct, ...get().visibleProducts.slice(0, 5)] // Добавляем в начало видимых
        });
      },

      // Удаление товара
      deleteProduct: (id) => {
        set({
          allProducts: get().allProducts.filter(p => p.id !== id),
          visibleProducts: get().visibleProducts.filter(p => p.id !== id)
        });
      },

      // Лайк/дизлайк
      toggleLike: (id) => {
        const updateLiked = (products: Product[]) => 
          products.map(p => 
            p.id === id ? { ...p, liked: !p.liked } : p
          );
        
        set({
          allProducts: updateLiked(get().allProducts),
          visibleProducts: updateLiked(get().visibleProducts)
        });
      },

      // Обновление товара
      updateProduct: (id, updates) => {
        const updateProduct = (products: Product[]) => 
          products.map(p => 
            p.id === id ? { ...p, ...updates } : p
          );
        
        set({
          allProducts: updateProduct(get().allProducts),
          visibleProducts: updateProduct(get().visibleProducts)
        });
      },

      // Загрузка товаров
      fetchProducts: async () => {
        set({ isLoading: true });
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        
        // eslint-disable-next-line
        const products = data.map((p: any) => ({
          ...p,
          liked: false,
          description: p.description,
        }));
        set({ 
          allProducts: products,
          visibleProducts: products.slice(0, 6),
          isLoading: false
        });
      },

      // Подгрузка при скролле
      loadMoreProducts: () => {
        const { allProducts, visibleProducts } = get();
        if (visibleProducts.length >= allProducts.length) return;
        
        set({
          visibleProducts: [
            ...visibleProducts,
            ...allProducts.slice(
              visibleProducts.length,
              visibleProducts.length + 3
            )
          ]
        });
      }
    }),
    { name: 'products-store' }
  )
);
