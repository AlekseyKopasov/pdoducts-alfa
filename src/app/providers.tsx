'use client'

import { useProductsStore } from '@/store/products';
import React, { useRef } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const initialised = useRef(false)

  if (!initialised.current) {
    useProductsStore.getState().fetchProducts()
    initialised.current = true
  }

  return <>{children}</>
}