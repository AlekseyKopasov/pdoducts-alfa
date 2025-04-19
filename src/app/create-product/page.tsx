'use client'

import { useProductsStore } from '@/store/products'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  title: yup.string().required('Title is required').min(3),
  description: yup.string().required('Description is required').min(10),
  price: yup.number().required('Price is required').positive(),
  image: yup.string().required('Image URL is required')
    .test('is-url', 'Invalid URL', (value) => {
      if (!value) return false;
      try {
        // Пробуем создать URL, но не проверяем его доступность
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }),
})

export default function CreateProductPage() {
  const { addProduct } = useProductsStore()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onSubmit = (data: any) => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    addProduct(data)
    router.push('/products')
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input {...register('title')} className="w-full p-2 border rounded" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea {...register('description')} className="w-full p-2 border rounded" rows={4} />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input type="number" {...register('price')} className="w-full p-2 border rounded" />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input {...register('image')} className="w-full p-2 border rounded" />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  )
}