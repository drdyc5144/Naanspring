import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaHome,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Button, Input, Modal } from "../../../Components/Common";
import { customerService } from "../../../Service/customer.service";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    label: "home",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    isDefault: false,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await customerService.getAddresses();
      setAddresses(response.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({
        label: "home",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        isDefault: addresses.length === 0, // First address becomes default
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingAddress) {
        await customerService.updateAddress(editingAddress.id, formData);
      } else {
        await customerService.createAddress(formData);
      }
      await fetchAddresses();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await customerService.deleteAddress(id);
        await fetchAddresses();
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await customerService.setDefaultAddress(id);
      await fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  const getLabelIcon = (label) => {
    switch (label) {
      case "home":
        return FaHome;
      case "work":
        return FaBriefcase;
      default:
        return FaMapMarkerAlt;
    }
  };

  const getLabelColor = (label) => {
    switch (label) {
      case "home":
        return "bg-blue-100 text-blue-600";
      case "work":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Address Book</h1>
        <Button
          variant="primary"
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add New Address
        </Button>
      </div>

      {/* Address List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-100 rounded-xl"></div>
            </div>
          ))}
        </div>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {addresses.map((address) => {
              const LabelIcon = getLabelIcon(address.label);
              const labelColor = getLabelColor(address.label);

              return (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-white rounded-xl shadow-sm p-5 border-2 transition-all ${
                    address.isDefault
                      ? "border-primary-500"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${labelColor}`}>
                        <LabelIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {address.firstName} {address.lastName}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                            {address.label}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-600 rounded-full flex items-center gap-1">
                              <FaCheckCircle className="w-3 h-3" />
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenModal(address)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1">
                        <FaPhone className="w-3 h-3 text-gray-400" />
                        {address.phone}
                      </span>
                    </div>
                  </div>

                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Set as Default
                    </button>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaMapMarkerAlt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No addresses saved
          </h3>
          <p className="text-gray-500 mb-4">
            Add your first shipping address to get started.
          </p>
          <Button variant="primary" onClick={() => handleOpenModal()}>
            Add Address
          </Button>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAddress ? "Edit Address" : "Add New Address"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
            <Input
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          <Input
            label="Phone Number"
            type="tel"
            placeholder="080 1234 5678"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />

          <Input
            label="Street Address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="Lagos"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
            <Input
              label="State"
              placeholder="Lagos"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              required
            />
            <Input
              label="Postal Code"
              placeholder="100001"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Address Label
              </label>
              <select
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              {editingAddress ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressBook;
