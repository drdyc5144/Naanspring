import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaSave,
  FaImage,
  FaTag,
  FaBox,
  FaDollarSign,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import { Button, Input, Loader } from "../../../Components/Common";
import { productService } from "../../../Service/product.service";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    image: "",
    isFeatured: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProductData();
    fetchCategories();
  }, [id]);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const response = await productService.getProductById(id);
      const product = response.data;
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        categoryId: product.categoryId || "",
        image: product.image || "",
        isFeatured: product.isFeatured || false,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("/admin/products");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    if (!formData.stock) newErrors.stock = "Stock quantity is required";
    else if (isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = "Please enter a valid stock quantity";
    }
    if (!formData.categoryId) newErrors.categoryId = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      };
      await productService.updateProduct(id, productData);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      setErrors({ general: "Failed to update product. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading product..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FaArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-sm text-gray-500">Update product information</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        {errors.general && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={FaTag}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.description && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price (₦)"
                type="number"
                name="price"
                placeholder="1000"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                icon={FaDollarSign}
                required
              />
              <Input
                label="Stock Quantity"
                type="number"
                name="stock"
                placeholder="50"
                value={formData.stock}
                onChange={handleChange}
                error={errors.stock}
                icon={FaBox}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.categoryId ? "border-red-500" : "border-gray-300"
                }`}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.categoryId}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors">
                <FaImage className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, WEBP (Max 5MB)
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({
                          ...prev,
                          image: reader.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              {formData.image && (
                <div className="mt-3 relative">
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: "" }))
                    }
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isFeatured"
                className="ml-2 text-sm text-gray-700"
              >
                Feature this product
              </label>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Product Tips
                  </p>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Update product information regularly</li>
                    <li>• Keep stock levels accurate</li>
                    <li>• Add high-quality product images</li>
                    <li>• Monitor product performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSaving}
                className="flex items-center gap-2"
              >
                <FaSave className="w-4 h-4" />
                Update Product
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
