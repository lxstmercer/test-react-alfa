'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Star } from 'lucide-react'
import { useProductsStore } from '@/store/productsStore'
import { Product } from '@/store/productsStore'


export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = useParams()
  const { getProductById, toggleLike, fetchProducts } = useProductsStore()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true)
      
      // Сначала пытаемся найти продукт в store
      let foundProduct = getProductById(id as string)
      
      // Если не нашли, загружаем продукты
      if (!foundProduct) {
        await fetchProducts()
        foundProduct = getProductById(id as string)
      }
      
      setProduct(foundProduct || null)
      setIsLoading(false)
    }

    loadProduct()
  }, [id, getProductById, fetchProducts])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка продукта...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Продукт не найден</h1>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Вернуться к списку продуктов
          </button>
        </div>
      </div>
    )
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={index < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Кнопка назад */}
        <button
          onClick={() => router.push('/products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Назад к списку продуктов</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:flex">
            {/* Изображение продукта */}
            <div className="lg:flex-shrink-0 lg:w-1/2 p-8 flex items-center justify-center bg-gray-50">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 w-auto object-contain rounded-lg"
              />
            </div>
            
            {/* Информация о продукте */}
            <div className="p-8 lg:w-1/2">
              <div className="flex items-start justify-between mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <button
                  onClick={() => toggleLike(product.id)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    product.isLiked
                      ? 'text-red-500 bg-red-50 hover:bg-red-100 shadow-sm'
                      : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Heart size={24} fill={product.isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Рейтинг и отзывы */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating.rate}
                  </span>
                </div>
                <span className="text-gray-500 text-lg">
                  ({product.rating.count} отзывов)
                </span>
              </div>

              {/* Цена и кнопки */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-4xl font-bold text-green-600">
                      ${product.price}
                    </span>
                    <p className="text-gray-500 text-sm mt-1">включая все налоги</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">В наличии</p>
                    <p className="text-green-600 font-medium">✓ Готов к отправке</p>
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push(`/edit-product/${product.id}`)}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Редактировать продукт
                </button>
                
                <button
                  onClick={() => router.push('/products')}
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-semibold"
                >
                  Назад
                </button>
              </div>

              {/* Дополнительная информация */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Характеристики</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Категория:</span>
                    <p className="font-medium text-gray-900">{product.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Рейтинг:</span>
                    <p className="font-medium text-gray-900">{product.rating.rate}/5</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Отзывы:</span>
                    <p className="font-medium text-gray-900">{product.rating.count}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Статус:</span>
                    <p className="font-medium text-green-600">В наличии</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}