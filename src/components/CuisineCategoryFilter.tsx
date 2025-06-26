import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Pizza, Fish, Soup, Salad, Sandwich, Beef } from 'lucide-react';

// A mock list of cuisines. In a real app, this would likely come from a CMS or API.
const cuisines = [
  { name: 'Pizza', slug: 'pizza', icon: Pizza },
  { name: 'Sushi', slug: 'sushi', icon: Fish },
  { name: 'Indian', slug: 'indian', icon: Soup },
  { name: 'Salads', slug: 'salads', icon: Salad },
  { name: 'Burgers', slug: 'burgers', icon: Beef },
  { name: 'Sandwiches', slug: 'sandwiches', icon: Sandwich },
];

interface CuisineCategoryFilterProps {
  /** The currently selected cuisine slug */
  activeCategory?: string;
  /** Callback function when a category is selected */
  onSelectCategory: (categorySlug: string) => void;
  /** Optional className to be applied to the container */
  className?: string;
}

const CuisineCategoryFilter: React.FC<CuisineCategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  className,
}) => {
  console.log('CuisineCategoryFilter loaded');

  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto pb-2', className)}>
      {cuisines.map((cuisine) => {
        const Icon = cuisine.icon;
        const isActive = activeCategory === cuisine.slug;

        return (
          <Button
            key={cuisine.slug}
            variant={isActive ? 'default' : 'outline'}
            className="flex-shrink-0 rounded-full"
            onClick={() => onSelectCategory(cuisine.slug)}
            aria-pressed={isActive}
          >
            <Icon className="mr-2 h-4 w-4" />
            {cuisine.name}
          </Button>
        );
      })}
    </div>
  );
};

export default CuisineCategoryFilter;