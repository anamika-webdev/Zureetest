
import ProductCard, { ProductProps } from "./ProductCard";

// Sample product data
const menProducts: ProductProps[] = [
  {
    id: "white-shirt-slim",
    name: "White Shirt Slim Fit Plain",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts"
  },
  {
    id: "checkered-shirt-slim",
    name: "White Blue Checkered Shirt",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts"
  },
  {
    id: "pink-shirt-slim",
    name: "Pink Shirt Slim Fit Plain",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts"
  },
  {
    id: "dotted-shirt-slim",
    name: "Dotted Black Slim Fit Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1593757147298-e064ed51a29d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    category: "shirts"
  }
];

interface ProductGridProps {
  title: string;
  description?: string;
  products: ProductProps[];
  viewAllLink?: string;
}

const ProductGrid = ({ title, description, products, viewAllLink }: ProductGridProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="heading-md text-left">{title}</h2>
            {description && <p className="text-gray-600 mt-2">{description}</p>}
          </div>
          
          {viewAllLink && (
            <a href={viewAllLink} className="text-sm font-medium underline hover:text-zuree-red transition-colors">
              View all products →
            </a>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
