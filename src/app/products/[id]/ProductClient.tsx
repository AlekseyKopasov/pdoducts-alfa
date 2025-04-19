'use client'

import { useProductsStore } from '@/store/products'
import Image from 'next/image'
import Link from 'next/link'

interface ProductClientProps {
  id: string;
}

export default function ProductClient({ id }: ProductClientProps) {
  const { allProducts } = useProductsStore()
  const product = allProducts.find(p => p.id === Number(id))

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/products" className="mb-4 inline-block text-blue-500">Return back</Link>

      <div className="max-w-2xl mx-auto">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-64 object-contain mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold">${product.price}</p>
      </div>
    </div>
  )
}
