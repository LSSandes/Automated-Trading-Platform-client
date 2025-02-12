
interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All Traders' },
  { id: 'forex', label: 'Forex' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'commodities', label: 'Commodities' }
];

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === category.id 
              ? 'bg-accent text-white' 
              : 'text-gray-400 hover:text-white hover:bg-dark-200/50'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}