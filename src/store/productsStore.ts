import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  isLiked?: boolean;
}

interface ProductsState {
  products: Product[];
  likedProducts: Product[];
  filter: 'all' | 'liked';
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleLike: (id: string) => void;
  setFilter: (filter: 'all' | 'liked') => void;
  setSearchQuery: (query: string) => void;
  getFilteredProducts: () => Product[];
  fetchProducts: () => Promise<void>;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      likedProducts: [],
      filter: 'all',
      searchQuery: '',
      isLoading: false,
      error: null,

      fetchProducts: async () => {
        // Пользователь будет создавать продукты вручную
        set({ isLoading: false });
      },

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: uuidv4(),
        };
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
          likedProducts: state.likedProducts.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          likedProducts: state.likedProducts.filter((product) => product.id !== id),
        }));
      },

      toggleLike: (id) => {
        set((state) => {
          const updatedProducts = state.products.map((product) =>
            product.id === id ? { ...product, isLiked: !product.isLiked } : product
          );

          const likedProducts = updatedProducts.filter((product) => product.isLiked);

          return {
            products: updatedProducts,
            likedProducts,
          };
        });
      },

      setFilter: (filter) => {
        set({ filter });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      getFilteredProducts: () => {
        const { products, likedProducts, filter, searchQuery } = get();
        const source = filter === 'liked' ? likedProducts : products;

        if (!searchQuery) return source;

        return source.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },

      getProductById: (id) => {
        const { products } = get();
        return products.find(product => product.id === id);
      },
    }),
    {
      name: 'products-store',
      partialize: (state) => ({ 
        products: state.products, 
        likedProducts: state.likedProducts 
      }),
    }
  )
);
