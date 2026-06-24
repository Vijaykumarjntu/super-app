export default function DashboardLayout({ children }){
  return (
    <div className="min-h-screen p-6 bg-bg-deep text-white">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  )
}
