import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="col-span-1 bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
            {children && children.profile}
          </aside>

          <main className="lg:col-span-3 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Super Dashboard</h2>
            <div className="space-y-6">
              {children && children.main}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
