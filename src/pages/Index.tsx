
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import ProductGrid from "@/components/ProductGrid";
import CollectionBanner from "@/components/CollectionBanner";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

// Sample product data
const menProducts = [
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

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="heading-md mb-4">Curated solutions with our exclusive range of products</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Your one-stop solution provider in the world of fashion. With our exclusive range of furniture, custom fabrics, timeless wallpapers, and coordinating art both volume-based and personal dwellings.
          </p>
        </div>
        
        <FeaturedProducts />
        
        <ProductGrid 
          title="MAJOR MOMENTS CALL FOR MAJOR STYLE" 
          description="Select our curated collection of classically inspired fine shirts" 
          products={menProducts}
          viewAllLink="/shop"
        />
        
        <CollectionBanner
          title="Women's Collection"
          description="Explore the women's collection, where elegant design meets comfort. Find beautifully crafted pieces for every occasion."
          image="https://images.unsplash.com/photo-1588117260148-b47818741c74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
          link="/women"
          direction="right"
        />
        
        <CollectionBanner
          title="Kids' Collection"
          description="Bright, comfortable, and durable clothing for the little ones. Dress with love."
          image="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80"
          link="/kids"
        />
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
