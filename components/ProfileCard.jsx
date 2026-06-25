export default function ProfileCard({ user }) {
  const profile = user || {
    name: 'KK Vinay',
    email: 'Vinay090@gmail.com',
    username: 'vinay060',
  }

  const genres = user?.categories?.length
    ? user.categories.map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    : ['Action', 'Drama', 'Fantasy']

  return (
    <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#6B4EFF] to-[#5D4DE8] p-8 shadow-[0_20px_80px_rgba(107,78,255,0.25)]" style={{ width: '100%', maxWidth: '500px', minHeight: '250px' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_40%)]"></div>
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center gap-6">
          <div className="relative rounded-full border-4 border-white/80 bg-white/10 w-[120px] h-[120px] flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-black/25">
            {profile.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm text-white/80 uppercase tracking-[0.24em]">Username</p>
            <p className="mt-2 text-[42px] font-bold text-white leading-tight">{profile.username}</p>
          </div>
        </div>

        <div className="grid gap-3 text-white/90">
          <div className="rounded-[16px] bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-white/70">Name</p>
            <p className="mt-2 text-lg font-semibold">{profile.name}</p>
          </div>
          <div className="rounded-[16px] bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-white/70">Email</p>
            <p className="mt-2 text-lg font-semibold">{profile.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span key={genre} className="rounded-[20px] bg-white/20 px-4 py-2 text-sm text-white">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
