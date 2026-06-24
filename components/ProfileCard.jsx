export default function ProfileCard({ user }){
  if (!user) return <div className="text-sm text-gray-400">No profile data.</div>

  return (
    <div className="space-y-3">
      <div><p className="text-sm text-gray-400">Name</p><p className="font-medium">{user.name}</p></div>
      <div><p className="text-sm text-gray-400">Username</p><p className="font-medium">@{user.username}</p></div>
      <div><p className="text-sm text-gray-400">Email</p><p className="font-medium">{user.email}</p></div>
      <div><p className="text-sm text-gray-400">Mobile</p><p className="font-medium">{user.mobile}</p></div>
      <div><p className="text-sm text-gray-400">Categories</p><div className="flex flex-wrap gap-2 mt-1">{(user.categories||[]).map(c=> <span key={c} className="px-3 py-1 bg-neon-green text-black rounded-full text-xs font-medium">{c}</span>)}</div></div>
    </div>
  )
}
