import { Product } from '@/store/products';
import ProductClient from './ProductClient';

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductClient id={params.id} />;
}