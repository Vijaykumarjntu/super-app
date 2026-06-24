import React from 'react'

export default function ProfileCard({ user }) {
  if (!user || !user.registered) {
    return <p className="text-sm text-gray-600">No profile data available.</p>
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-medium">{user.name}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Username</p>
        <p className="font-medium">{user.username}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium">{user.email}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Mobile</p>
        <p className="font-medium">{user.mobile}</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Categories</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {user.categories && user.categories.length > 0 ? (
            user.categories.map(c => (
              <span key={c} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">{c}</span>
            ))
          ) : (
            <span className="text-sm text-gray-600">No categories selected.</span>
          )}
        </div>
      </div>
    </div>
  )
}
