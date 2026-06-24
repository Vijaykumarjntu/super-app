import React from 'react'

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white max-w-2xl w-full rounded-2xl p-6 text-black">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">{movie.Title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">✕</button>
        </div>

        <div className="mt-4 flex gap-4">
          {movie.Poster && movie.Poster !== 'N/A' && (
            <img src={movie.Poster} alt="poster" className="w-36 h-52 object-cover rounded" />
          )}

          <div className="flex-1">
            <p className="text-sm text-gray-700">{movie.Plot || 'No description available.'}</p>
            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <div><strong>Year:</strong> {movie.Year}</div>
              <div><strong>Genre:</strong> {movie.Genre}</div>
              <div><strong>IMDB Rating:</strong> {movie.imdbRating}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
        </div>
      </div>
    </div>
  )
}
