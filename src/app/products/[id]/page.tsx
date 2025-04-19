import ProductClient from './ProductClient';
import type { PageProps } from '@/app/types';

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  // eslint-disable-next-line
  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: PageProps<{ id: string }>) {
  return <ProductClient id={params.id} />;
}