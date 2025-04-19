import ProductClient from './ProductClient';

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
  params: { id: string }
}) {
  return {
    title: `Product ${params.id}`,
  };
};
