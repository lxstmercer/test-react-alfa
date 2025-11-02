'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, Plus, Search, Package } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useProductsStore } from '@/store/productsStore'

const ITEMS_PER_PAGE = 8



export default function ProductsPage() {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') as 'all' | 'liked' | null || 'all'
  
  const {
    products,
    setFilter,
    searchQuery,
    setSearchQuery,
    getFilteredProducts,
  } = useProductsStore()

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setFilter(filter)
  }, [filter, setFilter])

  const filteredProducts = getFilteredProducts()
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Если нет продуктов, показываем сообщение
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-100 mb-6">
              <Package className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Пока нет продуктов
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Создайте свой первый продукт, чтобы начать работу с системой управления продуктами
            </p>
            <Link
              href="/create-product"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
            >
              <Plus size={24} />
              <span>Создать первый продукт</span>
            </Link>
            <div className="mt-8 text-sm text-gray-500">
              <p>После создания продукта вы сможете:</p>
              <ul className="mt-2 space-y-1">
                <li>• Редактировать информацию о продукте</li>
                <li>• Добавлять продукты в избранное</li>
                <li>• Искать и фильтровать продукты</li>
                <li>• Просматривать детальную информацию</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок и кнопки */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-2">
              {filter === 'all' 
                ? `Все продукты (${products.length})`
                : `Избранные продукты (${filteredProducts.length})`
              }
            </p>
          </div>
          
          <Link
            href="/create-product"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus size={20} />
            <span>Добавить продукт</span>
          </Link>
        </div>

        {/* Фильтры и поиск */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex space-x-2">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Все продукты
            </Link>
            <Link
              href="/products?filter=liked"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                filter === 'liked'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart size={16} fill={filter === 'liked' ? 'currentColor' : 'none'} />
              <span>Избранное</span>
            </Link>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск продуктов..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Список продуктов */}
        {paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Назад
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Вперед
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {filter === 'liked' ? 'Нет избранных продуктов' : 'Продукты не найдены'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
