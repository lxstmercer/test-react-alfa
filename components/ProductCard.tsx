'use client'

import { useRouter } from 'next/navigation'
import { Heart, Trash2 } from 'lucide-react'
import { Product } from '@/store/productsStore'
import { useProductsStore } from '@/store/productsStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { toggleLike, deleteProduct } = useProductsStore()

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    router.push(`/products/${product.id}`)
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLike(product.id)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    deleteProduct(product.id)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      onClick={handleCardClick}
    >
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {truncateText(product.title, 50)}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 flex-1">
          {truncateText(product.description, 100)}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-green-600">
            ${product.price}
          </span>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLikeClick}
              className={`p-2 rounded-full transition-colors duration-200 ${
                product.isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <Heart size={18} fill={product.isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-full text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
