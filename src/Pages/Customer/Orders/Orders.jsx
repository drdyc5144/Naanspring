import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FaBox, 
  FaClock, 
  FaTruck, 
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter
} from 'react-icons/fa'
import { orderService } from '../../../Service/order.service'
import { Loader, EmptyState } from '../../../Components/Common'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const statusIcons = {
    pending: FaClock,
    processing: FaBox,
    shipped: FaTruck,
    delivered: FaCheckCircle,
    cancelled: FaTimesCircle,
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, statusFilter, searchQuery])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const response = await orderService.getUserOrders()
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(order => 
        order.id?.toString().includes(query) ||
        order.items?.some(item => item.name?.toLowerCase().includes(query))
      )
    }

    setFilteredOrders(filtered)
  }

  if (isLoading) {
    return <Loader size="lg" text="Loading your orders..." />
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={FaBox}
        title="No orders yet"
        description="You haven't placed any orders yet. Start shopping to see your orders here."
        actionText="Start Shopping"
        actionLink="/shop"
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-48"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white w-full sm:w-40"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = statusIcons[order.status] || FaBox
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-800">
                        Order #{order.id}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{order.items?.length || 0} items</span>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex items-center gap-2 mt-2">
                      {order.items?.slice(0, 3).map((item, idx) => (
                        <div
                          key={idx}
                          className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={item.image || '/placeholder-product.jpg'}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xs font-medium text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Total & Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-primary-800">
                        ₦{order.total?.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <StatusIcon className="w-4 h-4 text-gray-400" />
                      <Link
                        to={`/account/orders/${order.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found matching your filters.</p>
        </div>
      )}
    </div>
  )
}

export default Orders