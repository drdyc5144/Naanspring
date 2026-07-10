import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaShoppingBag,
  FaEye,
} from "react-icons/fa";
import { Button, Loader, Modal } from "../../../Components/Common";
import { customerService } from "../../../Service/customer.service";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchQuery]);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await customerService.getCustomers();
      setCustomers(response.data || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.firstName?.toLowerCase().includes(query) ||
          customer.lastName?.toLowerCase().includes(query) ||
          customer.email?.toLowerCase().includes(query) ||
          customer.phone?.includes(query),
      );
    }

    setFilteredCustomers(filtered);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading customers..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-sm text-gray-500">
            {filteredCustomers.length} customers found
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customers by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((customer) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold text-lg">
                    {customer.firstName?.charAt(0)}
                    {customer.lastName?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaEnvelope className="w-3 h-3" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaPhone className="w-3 h-3" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <FaEye className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaShoppingBag className="w-4 h-4" />
                    <span>{customer.orderCount || 0} orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>Joined {formatDate(customer.createdAt)}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      customer.isActive !== false
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.isActive !== false ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No customers found
          </h3>
          <p className="text-gray-500">
            {searchQuery
              ? "Try adjusting your search"
              : "Customers will appear here once they register"}
          </p>
        </div>
      )}

      {/* Customer Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customer Details"
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-4">
            {/* Profile */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold text-2xl">
                {selectedCustomer.firstName?.charAt(0)}
                {selectedCustomer.lastName?.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
                </h3>
                <p className="text-gray-500">{selectedCustomer.email}</p>
                <p className="text-gray-500">{selectedCustomer.phone}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {selectedCustomer.orderCount || 0}
                </p>
                <p className="text-xs text-gray-500">Orders</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-green-600">
                  ₦{selectedCustomer.totalSpent?.toLocaleString() || "0"}
                </p>
                <p className="text-xs text-gray-500">Total Spent</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {formatDate(selectedCustomer.createdAt)}
                </p>
                <p className="text-xs text-gray-500">Joined</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Recent Orders</h4>
              {selectedCustomer.recentOrders?.length > 0 ? (
                <div className="space-y-2">
                  {selectedCustomer.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-800">
                          ₦{order.total?.toLocaleString()}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No orders yet</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button variant="primary">
                <FaEnvelope className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminCustomers;
