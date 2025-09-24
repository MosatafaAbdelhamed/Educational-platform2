const AdminList = ({ admins = [] }) => {
  // Mock data if no admins provided
  const mockAdmins = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "+1234567890",
      createdAt: "22/09/2025",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "+1234567891",
      createdAt: "22/09/2025",
    },
    {
      id: 3,
      fullName: "Ahmed Hassan",
      email: "ahmed@example.com",
      phoneNumber: "+1234567892",
      createdAt: "21/09/2025",
    },
    {
      id: 4,
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      phoneNumber: "+1234567893",
      createdAt: "20/09/2025",
    },
  ]

  const displayAdmins = admins.length > 0 ? admins : mockAdmins

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">All Admins</h2>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                Phone Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayAdmins.map((admin, index) => (
              <tr key={admin.id || index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{admin.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{admin.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-600">{admin.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-600">{admin.createdAt}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly cards for smaller screens */}
      <div className="sm:hidden">
        {displayAdmins.map((admin, index) => (
          <div key={admin.id || index} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
            <div className="space-y-2">
              <div className="font-medium text-gray-900">{admin.fullName}</div>
              <div className="text-sm text-gray-600">{admin.email}</div>
              <div className="text-sm text-gray-600">{admin.phoneNumber}</div>
              <div className="text-xs text-gray-500">{admin.createdAt}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {displayAdmins.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No admins found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new admin.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminList
