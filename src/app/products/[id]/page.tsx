import { Metadata } from 'next';
import ProductClient from './ProductClient';

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  return products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

type PageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: PageProps) {
  return <ProductClient id={params.id} />;
}

export const generateMetadata = ({ params }: PageProps): Metadata => {
  return {
    title: `Product ${params.id}`,
  };
}