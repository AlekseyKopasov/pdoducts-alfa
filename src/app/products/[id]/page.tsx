import ProductClient from './ProductClient';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  // eslint-disable-next-line
  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductClient id={params.id} />;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Product ${params.id}`,
  };
}