'use client'

import { Product } from '@/store/products';
import Link from 'next/link';
import { useProductsStore } from '@/store/products';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import { memo } from 'react';

const ProductCard = ({ product }: { product: Product }) => {
  const { deleteProduct, toggleLike } = useProductsStore()

  return (
    <Link href={`/products/${product.id}`} className='group relative block'>
      <div className="flex flex-col h-full border p-4 rounded-lg hover:shadow-lg transition-shadow">
        <div className="relative h-48 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleLike(product.id)
              }}
              className={`p-2 ${product.liked ? 'text-red-500' : 'text-gray-400'}`}
            >
              <FiHeart size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                deleteProduct(product.id)
              }}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>

        <h3 className='font-bold truncate'>{product.title}</h3>
        <p className='mb-2 text-gray-600 line-clamp-3'>{product.description}</p>
        <p className='mt-auto font-bold'>${product.price}</p>
      </div>
    </Link>
  )
}

ProductCard.displayName = 'ProductCard'

export default memo(ProductCard)
