import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../src/store/slices/authSlice'; // Adjust path if needed

const categories = [
  { id: 'action', label: 'Action', color: 'bg-orange-500' },
  { id: 'drama', label: 'Drama', color: 'bg-purple-500' },
  { id: 'romance', label: 'Romance', color: 'bg-green-500' },
  { id: 'thriller', label: 'Thriller', color: 'bg-blue-500' },
  { id: 'western', label: 'Western', color: 'bg-amber-700' },
  { id: 'horror', label: 'Horror', color: 'bg-violet-600' },
  { id: 'fantasy', label: 'Fantasy', color: 'bg-pink-500' },
  { id: 'music', label: 'Music', color: 'bg-red-500' },
  { id: 'fiction', label: 'Fiction', color: 'bg-emerald-500' },
];

export default function CategorySelector({ onBack }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');

  const toggleCategory = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((cat) => cat !== id));
    } else {
      setSelected([...selected, id]);
    }
    setError('');
  };

  const handleNext = () => {
    if (selected.length < 3) {
      setError('Minimum 3 category required');
      return;
    }
    dispatch(setCategories(selected));
    // TODO: Navigate to dashboard (Page 3)
    alert('Proceeding to Dashboard... (Implement navigation here)');
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold neon-green">Super app</h1>
        <h2 className="text-4xl font-semibold mt-6 leading-tight">
          Choose your<br />entertainment category
        </h2>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id);
          return (
            <div
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all relative group
                ${isSelected ? 'border-[#39ff14] scale-[1.02]' : 'border-transparent hover:border-gray-700'}`}
            >
              <div className={`${cat.color} w-full h-full flex items-center justify-center p-3`}>
                <div className="text-center">
                  <div className="font-semibold text-sm mb-1 text-white drop-shadow-md">
                    {cat.label}
                  </div>
                  {/* Placeholder image - you can replace with actual images later */}
                  <div className="w-16 h-16 bg-black/30 rounded-lg mx-auto" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Categories */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((id) => {
            const cat = categories.find(c => c.id === id);
            return (
              <div
                key={id}
                className="bg-[#39ff14] text-black text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-2"
              >
                {cat?.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(id);
                  }}
                  className="font-bold hover:text-red-600"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <span>▲</span>
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-600 hover:bg-gray-900 py-3.5 rounded-full font-medium transition-all"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          className="flex-1 bg-[#39ff14] hover:bg-[#2be50f] text-black font-semibold py-3.5 rounded-full transition-all"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}