'use client'

import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '../../../components/ProductForm'
import { useProductsStore } from '../../../store/productsStore'

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const { products } = useProductsStore()

  const product = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Продукт не найден</h1>
          <button
            onClick={() => router.push('/products')}
            className="text-blue-600 hover:text-blue-700"
          >
            Вернуться к списку продуктов
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Назад к продуктам</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Редактировать продукт
          </h1>
          
          <ProductForm initialData={product} isEdit={true} />
        </div>
      </div>
    </div>
  )
}