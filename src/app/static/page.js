// app/products/page.js
export default async function ProductsPage() {
  const res = await fetch('https://dummyjson.com/products', {
    next: { revalidate: false }, // 👈 ensures it's static
  });
  const data = await res.json();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {data.products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
