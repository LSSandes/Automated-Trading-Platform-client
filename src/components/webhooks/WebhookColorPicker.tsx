import { Check } from 'lucide-react';

interface WebhookColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const colors = [
  { name: 'Blue', value: '#007AFF' },
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Green', value: '#10B981' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Orange', value: '#F97316' }
];

export default function WebhookColorPicker({ selectedColor, onColorSelect }: WebhookColorPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onColorSelect(color.value)}
          className="relative w-10 h-10 rounded-lg transition-transform hover:scale-110 
                   focus:outline-none focus:ring-2 focus:ring-white/20"
          style={{ backgroundColor: color.value }}
          title={color.name}
        >
          {selectedColor === color.value && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="h-5 w-5 text-white drop-shadow-lg" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}