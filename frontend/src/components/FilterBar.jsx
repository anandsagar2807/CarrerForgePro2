import React from 'react';

const FilterBar = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex items-center gap-1 p-1 bg-white rounded-xl shadow-sm border border-stone-100 overflow-x-auto no-scrollbar max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-1 ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;