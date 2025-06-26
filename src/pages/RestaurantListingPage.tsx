import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CuisineCategoryFilter from '@/components/CuisineCategoryFilter';
import RestaurantCard from '@/components/RestaurantCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

const allRestaurants = [
  { id: 1, slug: 'sushi-express', name: 'Sushi Express', imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Sushi', cuisine: 'Sushi', rating: 4.5, deliveryTime: 25, offers: ['Free Delivery'] },
  { id: 2, slug: 'pizza-palace', name: 'Pizza Palace', imageUrl: 'https://placehold.co/600x400/FBBF24/854D0E?text=Pizza', cuisine: 'Pizza', rating: 4.8, deliveryTime: 30, offers: [] },
  { id: 3, slug: 'curry-corner', name: 'Curry Corner', imageUrl: 'https://placehold.co/600x400/F97316/9A3412?text=Indian', cuisine: 'Indian', rating: 4.7, deliveryTime: 40, offers: ['50% Off'] },
  { id: 4, slug: 'burger-barn', name: 'Burger Barn', imageUrl: 'https://placehold.co/600x400/22C55E/15803D?text=Burgers', cuisine: 'Burgers', rating: 4.3, deliveryTime: 20, offers: ['Free Delivery'] },
  { id: 5, slug: 'salad-station', name: 'Salad Station', imageUrl: 'https://placehold.co/600x400/84CC16/4D7C0F?text=Salads', cuisine: 'Salads', rating: 4.9, deliveryTime: 15, offers: [] },
  { id: 6, slug: 'tokyo-sushi-bar', name: 'Tokyo Sushi Bar', imageUrl: 'https://placehold.co/600x400/A3BFFA/3B82F6?text=Sushi', cuisine: 'Sushi', rating: 4.9, deliveryTime: 35, offers: ['50% Off'] },
  { id: 7, slug: 'the-sandwich-shop', name: 'The Sandwich Shop', imageUrl: 'https://placehold.co/600x400/F0E68C/BDB76B?text=Sandwich', cuisine: 'Sandwiches', rating: 4.2, deliveryTime: 22, offers: [] },
];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  const [activeCategory, setActiveCategory] = useState('Sushi'); // Default based on user journey
  const [sortBy, setSortBy] = useState('rating');
  const [freeDelivery, setFreeDelivery] = useState(false);

  const filteredRestaurants = useMemo(() => {
    let restaurants = allRestaurants.filter(r => r.cuisine.toLowerCase() === activeCategory.toLowerCase());

    if (freeDelivery) {
      restaurants = restaurants.filter(r => r.offers.includes('Free Delivery'));
    }

    restaurants.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'deliveryTime') {
        return a.deliveryTime - b.deliveryTime;
      }
      return 0;
    });

    return restaurants;
  }, [activeCategory, sortBy, freeDelivery]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container flex-1 w-full mx-auto">
        <main className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
            {/* Filters Sidebar */}
            <aside className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Sort & Filter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="sort-by">Sort by</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-by" className="w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium mb-2">Offers</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-delivery" checked={freeDelivery} onCheckedChange={(checked) => setFreeDelivery(Boolean(checked))} />
                      <Label htmlFor="free-delivery">Free Delivery</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Restaurant List */}
            <div className="space-y-6">
              <CuisineCategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={(slug) => setActiveCategory(slug)}
              />
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {activeCategory} Restaurants
                </h2>
                <p className="text-muted-foreground">
                  Showing {filteredRestaurants.length} results
                </p>
              </div>
              
              {filteredRestaurants.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      id={restaurant.id}
                      slug={restaurant.slug}
                      name={restaurant.name}
                      imageUrl={restaurant.imageUrl}
                      cuisine={restaurant.cuisine}
                      rating={restaurant.rating}
                      deliveryTime={restaurant.deliveryTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <h3 className="text-xl font-semibold">No Restaurants Found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;