const UserList = ({ users = [] }) => {
  // Mock data if no users provided
  const mockUsers = [
    {
      id: 1,
      fullName: "Alice Johnson",
      email: "alice@example.com",
      phoneNumber: "+1234567892",
      createdAt: "22/09/2025",
    },
    {
      id: 2,
      fullName: "Bob Wilson",
      email: "bob@example.com",
      phoneNumber: "+1234567893",
      createdAt: "22/09/2025",
    },
    {
      id: 3,
      fullName: "Carol Brown",
      email: "carol@example.com",
      phoneNumber: "+1234567894",
      createdAt: "22/09/2025",
    },
    {
      id: 4,
      fullName: "David Miller",
      email: "david@example.com",
      phoneNumber: "+1234567895",
      createdAt: "21/09/2025",
    },
  ]

  const displayUsers = users.length > 0 ? users : mockUsers

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">All Users</h2>
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
            {displayUsers.map((user, index) => (
              <tr key={user.id || index} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-600">{user.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-600">{user.createdAt}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly cards for smaller screens */}
      <div className="sm:hidden">
        {displayUsers.map((user, index) => (
          <div key={user.id || index} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
            <div className="space-y-2">
              <div className="font-medium text-gray-900">{user.fullName}</div>
              <div className="text-sm text-gray-600">{user.email}</div>
              <div className="text-sm text-gray-600">{user.phoneNumber}</div>
              <div className="text-xs text-gray-500">{user.createdAt}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {displayUsers.length === 0 && (
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding new users.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserList
