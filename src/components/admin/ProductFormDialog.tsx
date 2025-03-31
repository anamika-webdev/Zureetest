
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

type ProductFormData = Omit<Product, 'id'>;

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: ProductFormData) => void;
  currentProduct: Product | null;
  formData: ProductFormData;
}

const ProductFormDialog = ({
  isOpen,
  onClose,
  onSave,
  currentProduct,
  formData
}: ProductFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{currentProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {currentProduct 
              ? "Update the product details below" 
              : "Fill in the details to add a new product"}
          </DialogDescription>
        </DialogHeader>
        
        <ProductForm 
          initialData={formData}
          onCancel={onClose}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
