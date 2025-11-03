import Link from 'next/link'
import { ShoppingBag, Heart, Plus } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Добро пожаловать в Product Manager
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Создавайте и управляйте вашими продуктами с легкостью
          </p>
        </div>

        {/* Убрал фиксированную высоту и добавил адаптивные классы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {/* Карточка 1 - Управление продуктами */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Управление продуктами
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Создавайте, редактируйте и управляйте вашими продуктами в удобном интерфейсе
              </p>
              <div className="mt-auto">
                <Link
                  href="/products"
                  className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
                >
                  Начать управление
                </Link>
              </div>
            </div>
          </div>

          {/* Карточка 2 - Избранное */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
              <Heart className="text-red-600" size={24} />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Избранное
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Отмечайте понравившиеся продукты для быстрого доступа и удобного просмотра
              </p>
              <div className="mt-auto">
                <Link
                  href="/products?filter=liked"
                  className="block w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-center font-medium"
                >
                  Перейти в избранное
                </Link>
              </div>
            </div>
          </div>

          {/* Карточка 3 - Создать продукт */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
              <Plus className="text-green-600" size={24} />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Создать продукт
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Добавьте новый продукт с помощью удобной формы с валидацией и предпросмотром
              </p>
              <div className="mt-auto">
                <Link
                  href="/create-product"
                  className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-center font-medium"
                >
                  Создать продукт
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center">
            Как начать работу?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-gray-700">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <p className="pt-1">Перейдите в раздел "Создать продукт"</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <p className="pt-1">Заполните информацию о вашем продукте</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <p className="pt-1">Сохраните продукт - он появится в общем списке</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                  4
                </div>
                <p className="pt-1">Управляйте продуктами: редактируйте, добавляйте в избранное, удаляйте</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}