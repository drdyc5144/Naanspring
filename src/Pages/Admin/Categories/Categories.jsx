import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTag,
  FaFolder,
  FaFolderOpen,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { Button, Input, Modal } from "../../../Components/Common";
import { categoryService } from "../../../Service/category.service";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "📦",
  });

  const iconOptions = [
    "📦",
    "🍞",
    "🥩",
    "🐟",
    "🌾",
    "🌿",
    "🥥",
    "🍚",
    "🫘",
    "🌽",
    "🥜",
    "🫒",
    "🌶️",
    "🧅",
    "🧄",
    "🍋",
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await categoryService.getCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        icon: category.icon || "📦",
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        icon: "📦",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", icon: "📦" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      await fetchCategories();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    try {
      await categoryService.deleteCategory(deleteModal.id);
      await fetchCategories();
      setDeleteModal(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const getProductCount = (categoryId) => {
    // This would come from API in real implementation
    return Math.floor(Math.random() * 20) + 1;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-sm text-gray-500">
            {categories.length} categories found
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{category.icon || "📦"}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {category.description || "No description"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteModal(category)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaFolder className="w-4 h-4" />
                    <span>{getProductCount(category.id)} products</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Active
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No categories found
          </h3>
          <p className="text-gray-500 mb-4">
            Start creating categories to organize your products
          </p>
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Add First Category
          </Button>
        </div>
      )}

      {/* Add/Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Category Name"
            placeholder="e.g., Stock Fish, Egusi, etc."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Brief description of the category..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category Icon
            </label>
            <div className="grid grid-cols-8 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`
                    text-2xl p-2 rounded-lg border-2 transition-all
                    ${
                      formData.icon === icon
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              <FaSave className="w-4 h-4 mr-2" />
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Category"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrash className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Are you sure?
          </h3>
          <p className="text-gray-500 mb-6">
            This action cannot be undone. This will permanently delete the
            category "{deleteModal?.name}".
            <br />
            <span className="text-sm text-red-500">
              Note: Products in this category will become uncategorized.
            </span>
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => setDeleteModal(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete Category
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCategories;
