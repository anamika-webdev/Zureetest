
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import ProductTable from "@/components/admin/ProductTable";
import ProductFormDialog from "@/components/admin/ProductFormDialog";
import DeleteProductDialog from "@/components/admin/DeleteProductDialog";

// Sample product data
const dummyProducts = [
  { id: 1, name: "White T-Shirt", category: "Men", price: 29.99, stock: 45, image: "/placeholder.svg" },
  { id: 2, name: "Black Jeans", category: "Men", price: 39.99, stock: 32, image: "/placeholder.svg" },
  { id: 3, name: "Summer Dress", category: "Women", price: 49.99, stock: 21, image: "/placeholder.svg" },
  { id: 4, name: "Sneakers", category: "Kids", price: 34.99, stock: 18, image: "/placeholder.svg" },
  { id: 5, name: "Hoodie", category: "Men", price: 59.99, stock: 27, image: "/placeholder.svg" },
];

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

type ProductFormData = Omit<Product, 'id'>;

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    image: "/placeholder.svg"
  });
  
  const { toast } = useToast();

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setFormData({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      image: "/placeholder.svg"
    });
    setIsFormDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image
    });
    setIsFormDialogOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(p => p.id !== currentProduct.id));
      toast({
        title: "Product Deleted",
        description: `${currentProduct.name} has been removed.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const saveProduct = (formData: ProductFormData) => {
    if (currentProduct) {
      // Edit existing product
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...formData, id: currentProduct.id } : p
      ));
      toast({
        title: "Product Updated",
        description: `${formData.name} has been updated.`,
      });
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { ...formData, id: newId }]);
      toast({
        title: "Product Added",
        description: `${formData.name} has been added to the catalog.`,
      });
    }
    setIsFormDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <ProductTable 
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      <ProductFormDialog
        isOpen={isFormDialogOpen}
        onClose={() => setIsFormDialogOpen(false)}
        onSave={saveProduct}
        currentProduct={currentProduct}
        formData={formData}
      />

      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        product={currentProduct}
      />
    </div>
  );
};

export default ProductManagement;
